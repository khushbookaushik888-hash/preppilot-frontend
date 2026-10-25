
import pandas as pd

file_path = r"C:\Users\KHUSHBOO KAUSHIK\Downloads\preppilot-frontend-main\ml\prepilot_ml_training_dataset_60k.csv"

df = pd.read_csv(file_path)

# Target: jo result model predict karega
target = "interview_readiness"

# Columns jo abhi input se exclude karenge
exclude_columns = [
    "student_id",
    "interview_readiness",
    "placement_probability",
    "primary_skill_gap",
    "target_role_match"
]

# Input features
X = df.drop(columns=exclude_columns)

# Output labels
y = df[target]

print("Features shape:", X.shape)
print("Target shape:", y.shape)

print("\nTarget categories:")
print(y.unique())

print("\nInput features:")
print(X.columns.tolist())
