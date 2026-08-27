import pandas as pd


def load_df(csv_name: str) -> pd.DataFrame:
    df = pd.read_csv(f"data/processed/{csv_name}")
    return df
