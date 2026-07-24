import csv
import uuid
from pathlib import Path

import numpy as np

NUM_SEQUENCES = 5000
SEQUENCE_LENGTH = 50
NAMESPACE = uuid.NAMESPACE_DNS
OUTPUT = (
    Path(__file__).resolve().parent 
    / ".." 
    / ".." 
    / "data" 
    / "raw" 
    / "prng_sequences.csv"
)

OUTPUT.parent.mkdir(parents=True, exist_ok=True)

with OUTPUT.open("w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(["sequence_id", "seed", "sequence"])

    for seed in range(1, NUM_SEQUENCES + 1):
        sequence_id = uuid.uuid5(NAMESPACE, str(seed))
        rng = np.random.default_rng(seed)
        flips = rng.integers(0, 2, size=SEQUENCE_LENGTH)
        sequence = "".join("H" if flip == 0 else "T" for flip in flips)
        writer.writerow([sequence_id, seed, sequence])

print("done!")