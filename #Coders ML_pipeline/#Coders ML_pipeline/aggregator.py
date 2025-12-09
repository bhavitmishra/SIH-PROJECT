import pandas as pd
import numpy as np

df = pd.read_excel("sacred_dataset_v6.xlsx")

def compute_semester_features(student_df):

    sem_groups = student_df.groupby("sem_no")

    marks_mean = []
    marks_std  = []
    marks_min  = []
    marks_max  = []
    att_arr    = []
    attempts_arr = []
    fee_late_arr = []   

    for sem in range(1, 9):

        if sem in sem_groups.groups:
            g = sem_groups.get_group(sem)

            # per-subject marks
            per_subject = g[["t1","t2","t3","endsem"]].mean(axis=1)

            avg_marks = float(per_subject.mean())
            std_marks = float(per_subject.std(ddof=0))
            min_marks = float(per_subject.min())
            max_marks = float(per_subject.max())

            avg_att = float(g["attendance_pct"].mean())
            total_attempts = int(g["attempts"].sum())

            fee_col = "fee_days_late" 
            if fee_col in g.columns:
                fee_late = float(g[fee_col].mean())
            else:
                fee_late = 0.0

        else:
            avg_marks = std_marks = min_marks = max_marks = 0.0
            avg_att = 0.0
            total_attempts = 0
            fee_late = 0.0

        marks_mean.append(avg_marks)
        marks_std.append(std_marks)
        marks_min.append(min_marks)
        marks_max.append(max_marks)
        att_arr.append(avg_att)
        attempts_arr.append(total_attempts)
        fee_late_arr.append(fee_late)   

    return pd.Series({
        "marks_mean": [float(x) for x in marks_mean],
        "marks_std":  [float(x) for x in marks_std],
        "marks_min":  [float(x) for x in marks_min],
        "marks_max":  [float(x) for x in marks_max],
        "attendance_array": [float(x) for x in att_arr],
        "attempts_array":   [int(x) for x in attempts_arr],
        "fee_late_due_date_array": [float(x) for x in fee_late_arr]   # NEW
    })

# add fucking dropout section ,damn it
drop_df = (
    df.groupby("student_id")["dropout"]
      .apply(list)
      .reset_index(name="dropout")
)
drop_df["dropout"] = drop_df["dropout"].apply(lambda lst: lst[0])
print(drop_df.head())

agg_df = df.groupby("student_id").apply(compute_semester_features).reset_index()
print(agg_df.head())

# join agg_df + frop_df
final = pd.merge(agg_df, drop_df, on="student_id", how="inner")

final.to_excel("v6_aggregated.xlsx", index=False)
