import csv

import pandas as pd
from descriptive import alternation_rate, longest_run


def load_df(csv_name: str) -> pd.DataFrame:
    df = pd.read_csv(f"data/processed/{csv_name}")
    return df

def remove_quotations(csv_name: str) -> None:
    input_file = f"data/raw/{csv_name}.csv"
    output_file = f"data/processed/{csv_name}_removed_quotes.csv"

    with open(input_file, newline="", encoding="utf-8") as infile, \
        open(output_file, "w", newline="", encoding="utf-8") as outfile:
        reader = csv.reader(infile)
        writer = csv.writer(outfile, quoting=csv.QUOTE_NONE)
        for row in reader:
            writer.writerow(row)

    print("done!")

def remove_invalid_sequences(
    data: str | pd.DataFrame,
    human: bool = False
) -> pd.DataFrame:
    if isinstance(data, str):
        df = pd.read_csv(f"data/raw/{data}_sequences.csv")
    else:
        df = data.copy()
    valid = []
    for sequence in df["sequence"]:
        is_valid = (
            len(sequence) == 50
            and all(char in "HT" for char in sequence)
        )
        if human and is_valid:
            is_valid = (
                alternation_rate(sequence) < 0.9
                and longest_run(sequence) < 15
            )
        valid.append(is_valid)

    df = df[valid]
    removed = len(valid) - len(df)
    print(f"removed: {removed}")
    print(f"remaining: {len(df)}")
    if isinstance(data, str):
        df.to_csv(f"data/processed/{data}_valid_sequences.csv", index=False)
    return df

def preprocess_human_sequences() -> None:
    input_file = "data/raw/coin_flips.csv"
    output_file = "data/processed/human_sequences.csv"
    df = pd.read_csv(input_file, dtype=str)
    df["position"] = df["position"].astype(int)
    df = df.sort_values(["survey_id", "position"])
    grouped_sequences = (
        df.groupby("survey_id")["value"]
        .apply(lambda values: "".join(values))
        .reset_index()
        .rename(columns={"survey_id": "sequence_id", "value": "sequence"})
    )
    grouped_sequences = grouped_sequences[["sequence_id", "sequence"]]

    valid_sequences = remove_invalid_sequences(grouped_sequences, True)
    valid_sequences.to_csv(output_file, index=False)

    print("done!")

def remove_invalid_survey_responses() -> None:
    human_sequences = pd.read_csv("data/processed/human_sequences.csv")
    responses = pd.read_csv("data/processed/responses.csv")
    surveys = pd.read_csv("data/processed/surveys.csv")

    valid_ids = set(human_sequences["sequence_id"])
    responses = responses[responses["survey_id"].isin(valid_ids)]
    surveys = surveys[surveys["id"].isin(valid_ids)]

    responses.to_csv("data/processed/responses.csv", index=False)
    surveys.to_csv("data/processed/surveys.csv", index=False)

    print("done!")
