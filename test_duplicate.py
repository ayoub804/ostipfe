import requests

# Test duplicate logic
print("Testing duplicate poste creation...")

# 1. Create a machine
try:
    with open("test.xlsx", "wb") as f:
        f.write(b"dummy") # Just to have a file, but wait, the backend might parse it
except:
    pass
