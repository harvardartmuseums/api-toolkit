import requests

# Find all instances of titles that include "Cat"
r = requests.get('https://api.harvardartmuseums.org/object?title=cat&apikey=67669ae0-b77e-11e8-bf0e-e9322ccde4db&size=100')

# Convert data to JSON format
data = r.json()

# Extract the info and records
info = data['info']
records = data['records']

# Print the total number of records
print(info['totalrecords'])

# For each record of objects, print the title and classification
for record in records:
    print(record['title'] + ' --- ' + record['classification'])
