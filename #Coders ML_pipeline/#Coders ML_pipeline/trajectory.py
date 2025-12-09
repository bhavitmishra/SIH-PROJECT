import pandas as pd
import numpy as np
import ast

# just make new columns
df = pd.read_excel("synthesied_v6_5000.xlsx")

def to_list(x):
    """Convert string '[1,2,3...]' to list."""
    if isinstance(x, list):
        return x
    if isinstance(x, str):
        return ast.literal_eval(x)
    return [float(x)]

def compute_mark_traj(arr):
    arr = np.array(arr, dtype=float)
    X = np.arange(1, len(arr)+1)

    # slope
    try:
        slope = float(np.polyfit(X, arr, 1)[0])
    except:
        slope = 0.0

    # pct change
    if len(arr) >= 2 and arr[-2] != 0:
        pct = float(((arr[-1]-arr[-2]) / arr[-2]) * 100)
    else:
        pct = 0.0

    # momentum
    momentum = float(np.sum(np.diff(arr)))

    # deviation
    deviation = float(np.std(arr))

    return slope, pct, momentum, deviation

def compute_att_traj(arr):
    arr = np.array(arr, dtype=float)
    X = np.arange(1, len(arr)+1)

    try:
        slope = float(np.polyfit(X, arr, 1)[0])
    except:
        slope = 0.0

    deviation = float(np.std(arr))

    return slope, deviation

# Convert arrays
df["marks_mean"] = df["marks_mean"].apply(to_list)
df["attendance_array"] = df["attendance_array"].apply(to_list)

marks_slope = []
marks_pct   = []
marks_mom   = []
marks_dev   = []

att_slope   = []
att_dev     = []

for m, a in zip(df["marks_mean"], df["attendance_array"]):
    s, pct, mom, dev = compute_mark_traj(m)
    marks_slope.append(s)
    marks_pct.append(pct)
    marks_mom.append(mom)
    marks_dev.append(dev)

    sa, da = compute_att_traj(a)
    att_slope.append(sa)
    att_dev.append(da)

df["slope_marks"]         = marks_slope
df["pct_change_marks"]    = marks_pct
df["momentum_marks"]      = marks_mom
df["deviation_marks"]     = marks_dev
df["slope_attendance"]    = att_slope
df["deviation_attendance"] = att_dev

df.to_excel("synthesied_v6_5000_trajectories.xlsx", index=False)

