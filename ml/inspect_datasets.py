
import pandas as pd
from pathlib import Path

data_folder = Path(
    r"C:\Users\KHUSHBOO KAUSHIK\Downloads\PrepPilot-data"
)

for file in data_folder.iterdir():
    if file.suffix.lower() not in [".csv", ".xlsx"]:
        continue

    try:
        if file.suffix.lower() == ".csv":
            df = pd.read_csv(file)
        else:
            df = pd.read_excel(file)

        print("\n" + "=" * 60)
        print("FILE:", file.name)
        print("ROWS AND COLUMNS:", df.shape)
        print("\nCOLUMN NAMES:")
        print(df.columns.tolist())
        print("\nFIRST 3 ROWS:")
        print(df.head(3).to_string(index=False))

    except Exception as error:
        print("Could not read:", file.name)
        print(error)
