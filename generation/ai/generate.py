import csv
import os
import uuid

import models


async def generate_and_save_ai_sequences(
    num: int,
    model: str,
    max_concurrent: int = 10,
) -> None:
    if model == "openai":
        sequences = await models.generate_openai_sequence(
            num, max_concurrent
        )
    elif model == "anthropic":
        sequences = await models.generate_anthropic_sequence(
            num, max_concurrent
        )
    elif model == "gemini":
        sequences = await models.generate_gemini_sequence(
            num, max_concurrent
        )
    else:
        raise ValueError(f"unknown model: {model}")

    path = f"data/raw/{model}_sequences.csv"
    file_exists = os.path.exists(path)

    with open(path, "a", newline="") as f:
        writer = csv.writer(f)
        if not file_exists or os.path.getsize(path) == 0:
            writer.writerow(["sequence_id", "sequence"])
        for sequence in sequences:
            writer.writerow([str(uuid.uuid4()), sequence])

    print("done!")

