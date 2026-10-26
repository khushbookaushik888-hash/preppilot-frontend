
import pandas as pd

file_path = "ml/prepilot_ml_training_dataset_60k - Copy.csv"
df = pd.read_csv(file_path)

target = "interview_readiness"

print("Readiness categories:")
print(df[target].value_counts())

print("\nAverage numeric values by readiness:")
print(
    df.groupby(target)[
        ["cgpa", "dsa_score", "python_score",
         "aptitude_score", "mock_interview_score",
         "communication_score"]
    ].mean().round(2)
)

print("\nPlacement probability by readiness:")
print(df.groupby(target)["placement_probability"].mean().round(3))

print("\nSkill gap by readiness:")
print(pd.crosstab(df[target], df["primary_skill_gap"]))

print("\nReadiness by academic performance:")
print(pd.crosstab(
    df["academic_performance"],
    df["interview_readiness"],
    normalize="index"
).round(3))

print("\nReadiness by target role:")
print(pd.crosstab(
    df["target_role_match"],
    df["interview_readiness"],
    normalize="index"
).round(3))

print("\nDuplicate rows:", df.duplicated().sum())

print("\nMissing values:", df.isnull().sum().sum())
