#!/usr/bin/env python3
"""Save a file downloaded with the Google Drive connector to disk.

The connector's download_file_content returns JSON with base64 `content`.
When the result is large, the harness saves it to a tool-results file; pass
that path here.

Usage: drive_to_file.py <tool-result.json> <output-path> [--expect-size BYTES]
"""
import base64
import json
import sys

src, dst = sys.argv[1], sys.argv[2]
raw = open(src, encoding="utf-8").read()
data = json.loads(raw[raw.find("{"):])
blob = base64.b64decode(data["content"])
if "--expect-size" in sys.argv:
    want = int(sys.argv[sys.argv.index("--expect-size") + 1])
    if len(blob) != want:
        sys.exit(f"Size mismatch: got {len(blob)}, Drive says {want}")
open(dst, "wb").write(blob)
print(f"Saved {len(blob)} bytes to {dst}")
