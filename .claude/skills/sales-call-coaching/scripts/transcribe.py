#!/usr/bin/env python3
"""Transcribe one Hebrew sales call with speaker labels.

Usage:
  transcribe.py <audio-or-video> <out-dir> [--speakers 2] [--model ivrit-ai/whisper-large-v3-turbo-ct2]

Writes <out-dir>/<name>.speakers.txt ("[mm:ss] SPEAKER_00: text" per turn)
and <out-dir>/<name>.srt. Run scripts/setup.sh first.
"""
import argparse
import os
import subprocess
import sys
import tempfile

import numpy as np
import soundfile as sf

ASR_HOME = os.environ.get("ASR_HOME", os.path.expanduser("~/.cache/sales-asr"))
SR = 16000


def to_wav(src, dst):
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", src, "-ac", "1", "-ar", str(SR), dst], check=True)


def diarize(wav, n_speakers):
    import sherpa_onnx

    cfg = sherpa_onnx.OfflineSpeakerDiarizationConfig(
        segmentation=sherpa_onnx.OfflineSpeakerSegmentationModelConfig(
            pyannote=sherpa_onnx.OfflineSpeakerSegmentationPyannoteModelConfig(
                model=f"{ASR_HOME}/sherpa-onnx-pyannote-segmentation-3-0/model.onnx"
            )
        ),
        embedding=sherpa_onnx.SpeakerEmbeddingExtractorConfig(
            model=f"{ASR_HOME}/3dspeaker_speech_eres2net_base_sv_zh-cn_3dspeaker_16k.onnx"
        ),
        clustering=sherpa_onnx.FastClusteringConfig(num_clusters=n_speakers),
        min_duration_on=0.3,
        min_duration_off=0.5,
    )
    if not cfg.validate():
        sys.exit("Diarization models missing – run scripts/setup.sh")
    audio, sr = sf.read(wav, dtype="float32")
    assert sr == SR
    result = sherpa_onnx.OfflineSpeakerDiarization(cfg).process(audio).sort_by_start_time()
    return [(s.start, s.end, s.speaker) for s in result]


def transcribe(wav, model_name):
    from faster_whisper import WhisperModel

    model = WhisperModel(model_name, device="cpu", compute_type="int8", cpu_threads=os.cpu_count() or 4)
    segments, info = model.transcribe(
        wav, language="he", vad_filter=True, word_timestamps=True, beam_size=5, condition_on_previous_text=False
    )
    words = []
    for seg in segments:
        for w in seg.words or []:
            words.append((w.start, w.end, w.word))
    return words, info.duration


def speaker_at(t, turns):
    best, best_d = None, 1e9
    for s, e, spk in turns:
        if s <= t <= e:
            return spk
        d = min(abs(t - s), abs(t - e))
        if d < best_d:
            best, best_d = spk, d
    return best if best is not None else 0


def group(words, turns, max_gap=1.5):
    out = []  # (start, end, speaker, text)
    for s, e, w in words:
        spk = speaker_at((s + e) / 2, turns)
        if out and out[-1][2] == spk and s - out[-1][1] <= max_gap:
            st, _, sp, tx = out[-1]
            out[-1] = (st, e, sp, tx + w)
        else:
            out.append((s, e, spk, w))
    return [(s, e, spk, t.strip()) for s, e, spk, t in out if t.strip()]


def ts(t, srt=False):
    h, rem = divmod(t, 3600)
    m, s = divmod(rem, 60)
    if srt:
        return f"{int(h):02d}:{int(m):02d}:{int(s):02d},{int((s % 1) * 1000):03d}"
    return f"{int(h * 60 + m):02d}:{int(s):02d}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("src")
    ap.add_argument("out_dir")
    ap.add_argument("--speakers", type=int, default=2)
    ap.add_argument("--model", default=os.environ.get("ASR_MODEL", "ivrit-ai/whisper-large-v3-turbo-ct2"))
    a = ap.parse_args()

    name = os.path.splitext(os.path.basename(a.src))[0]
    os.makedirs(a.out_dir, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        wav = os.path.join(tmp, "audio.wav")
        to_wav(a.src, wav)
        turns = diarize(wav, a.speakers)
        words, duration = transcribe(wav, a.model)
    rows = group(words, turns)

    with open(os.path.join(a.out_dir, f"{name}.speakers.txt"), "w", encoding="utf-8") as f:
        f.write(f"# {name} | duration {ts(duration)} | model {a.model} | speaker turns {len(turns)}\n")
        for s, e, spk, text in rows:
            f.write(f"[{ts(s)}] SPEAKER_{spk:02d}: {text}\n")
    with open(os.path.join(a.out_dir, f"{name}.srt"), "w", encoding="utf-8") as f:
        for i, (s, e, spk, text) in enumerate(rows, 1):
            f.write(f"{i}\n{ts(s, True)} --> {ts(e, True)}\n[SPEAKER_{spk:02d}] {text}\n\n")
    print(f"OK {name}: {ts(duration)}, {len(rows)} turns, {len(set(t[2] for t in turns))} speakers")


if __name__ == "__main__":
    main()
