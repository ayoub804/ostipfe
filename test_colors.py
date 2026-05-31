import pandas as pd

def is_critical_error(error_text):
    text = str(error_text).strip() if error_text else ""
    if not text:
        return False
    upper = text.upper()
    if "DEFAUT" in upper or "DEFAULT" in upper:
        return False
    return True


df = pd.read_excel(r"C:\Users\ayoub\OneDrive\Desktop\historique shunck (1).xlsx")
errors = df["Error-Text"].dropna().unique()
print("=== Error classification ===")
for e in errors:
    color = "RED" if is_critical_error(e) else "GREEN/GRAY"
    print(f'  "{e}" => critical={is_critical_error(e)} => {color}')

print()
print("First 3 rows Date/Time:")
for i in range(3):
    print(f"  Row {i}: {df.iloc[i]['Date']} {df.iloc[i]['Time']}")
print("Last 3 rows Date/Time:")
for i in range(-3, 0):
    print(f"  Row {len(df)+i}: {df.iloc[i]['Date']} {df.iloc[i]['Time']}")
    
# Check the LAST row after sorting by timestamp (this determines the status)
print()
print("=== After sorting by timestamp (as backend does) ===")
from backend_api import normalize_excel_columns, parse_excel_timestamps
df2 = normalize_excel_columns(df)
df2["Timestamp"] = parse_excel_timestamps(df2)
df2 = df2.dropna(subset=["Timestamp"]).sort_values("Timestamp").reset_index(drop=True)
print(f"Sorted range: {df2['Timestamp'].min()} to {df2['Timestamp'].max()}")
print(f"Last row after sort:")
last = df2.iloc[-1]
print(f"  Date={last['Date']} Time={last['Time']} Error-Text={last.get('Error-Text', 'N/A')}")
print(f"  Is critical? {is_critical_error(last.get('Error-Text', ''))}")

# Show what last 10 rows look like
print()
print("=== Last 10 rows (what determines status at end of simulation) ===")
for idx in range(-10, 0):
    row = df2.iloc[idx]
    et = row.get("Error-Text", "")
    crit = is_critical_error(et) if pd.notna(et) else False
    print(f"  {row['Timestamp']} | {et} | critical={crit}")

# Show what FIRST rows look like (initial sim time)
print()
print("=== First 10 rows (status at start of simulation) ===")
for idx in range(10):
    row = df2.iloc[idx]
    et = row.get("Error-Text", "")
    crit = is_critical_error(et) if pd.notna(et) else False
    print(f"  {row['Timestamp']} | {et} | critical={crit}")
