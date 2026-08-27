import numpy as np


def parse_sequence(sequence: str) -> np.ndarray:
    mapped = []
    for character in sequence:
        if character == "H":
            mapped.append(0)
        elif character == "T":
            mapped.append(1)
        else:
            raise ValueError()
    return np.array(mapped, dtype=int)

def run_lengths(sequence: str) -> np.ndarray:
    if len(sequence) != 50:
        return np.array([])
    parsed_sequence = parse_sequence(sequence)
    change_points = np.where(np.diff(parsed_sequence) != 0)[0] + 1
    run_starts = np.concatenate(([0], change_points))
    run_ends = np.concatenate((change_points, [50]))
    return run_ends - run_starts

def longest_run(sequence: str) -> int:
    return run_lengths(sequence).max()

def mean_run_length(sequence: str) -> float:
    return run_lengths(sequence).mean()

def alternation_rate(sequence: str) -> float:
    switches = np.sum(np.diff(parse_sequence(sequence)) != 0)
    return switches / 49

def heads_ratio(sequence: str) -> float:
    number_heads = parse_sequence(sequence).sum()
    return number_heads / 50
