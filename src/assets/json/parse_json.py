import json

# Read JSON data from file
with open('pathologies.json', 'r') as file:
    json_data = json.load(file)

# Loop through each object in the array
for obj in json_data:
    # Check if "init_symptoms" is None
    if obj['symptoms'] is None:
        # If None, replace with empty string
        obj['symptoms'] = ""
    
    if obj['init_symptoms'] is None:
        # If None, replace with empty string
        obj['init_symptoms'] = ""

# Print the modified JSON data
print(json.dumps(json_data, indent=4))

with open('pathologie_parsed.json', 'w') as file:
    json.dump(json_data, file, indent=4)