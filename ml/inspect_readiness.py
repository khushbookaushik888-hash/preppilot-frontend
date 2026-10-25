
import pandas as pd

file_path = r"C:\Users\KHUSHBOO KAUSHIK\Downloads\preppilot-frontend-main\ml\prepilot_ml_training_dataset_60k.csv"

df = pd.read_csv(file_path)

print("Dataset loaded successfully!")
print("Dataset shape:", df.shape)

print("\nColumn names:")
print(df.columns.tolist())

print("\nFirst 5 rows:")
print(df.head())
print("\nAll columns with data types:")
print(df.dtypes)

print("\nTarget column candidates:")
for col in df.columns:
    if any(word in col.lower() for word in ["readiness", "placement", "skill_gap", "role_match"]):
        print(col, "->", df[col].unique()[:10])
        print("\nInterview Readiness Distribution:")

print(df["interview_readiness"].value_counts())

print("\nReadiness Percentage:")

print(
    df["interview_readiness"]
    .value_counts(normalize=True)
    .mul(100)
    .round(2)
)