#!/usr/bin/env bash
# One-time setup for transcribing sales calls in a cloud session.
# Installs the Python packages and downloads the models into $ASR_HOME.
# Needs network access to pypi.org, github.com and huggingface.co.
set -euo pipefail

ASR_HOME="${ASR_HOME:-$HOME/.cache/sales-asr}"
ASR_MODEL="${ASR_MODEL:-ivrit-ai/whisper-large-v3-turbo-ct2}"
mkdir -p "$ASR_HOME"
cd "$ASR_HOME"

command -v ffmpeg >/dev/null || { echo "ffmpeg is missing (apt-get install -y ffmpeg)"; exit 1; }
pip install -q faster-whisper sherpa-onnx soundfile numpy

GH=https://github.com/k2-fsa/sherpa-onnx/releases/download
if [ ! -d sherpa-onnx-pyannote-segmentation-3-0 ]; then
  curl -sSL "$GH/speaker-segmentation-models/sherpa-onnx-pyannote-segmentation-3-0.tar.bz2" | tar xj
fi
EMB=3dspeaker_speech_eres2net_base_sv_zh-cn_3dspeaker_16k.onnx
[ -f "$EMB" ] || curl -sSLO "$GH/speaker-recongition-models/$EMB"

# The Hebrew ASR model comes from Hugging Face. Fail loudly if it is blocked:
# a generic Whisper model is not good enough for verbatim Hebrew quotes.
if ! python3 - "$ASR_MODEL" <<'EOF'
import sys
from huggingface_hub import snapshot_download
print(snapshot_download(sys.argv[1]))
EOF
then
  echo "ERROR: could not download $ASR_MODEL from huggingface.co."
  echo "Add huggingface.co to the environment's Allowed domains (Network access) and start a new session."
  exit 2
fi
echo "Setup OK ($ASR_HOME)"
