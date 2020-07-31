import requests

# Find all recorded moves
r = requests.get('https://api.harvardartmuseums.org/activity?type=studycenterviews&q=date:>2020&apikey=0000-0000-0000-0000')

# Convert data to JSON format
data = r.json()

# Extract the info and records
info = data['info']
records = data['records']

# Create a dictionary for all moves with their respective object
views = {}

for record in records:

    # Convert object ID to a string so it's accessible as a dictionary key
    objectid = str(record['objectid'])

    # If the object already has a recorded move, increment by one
    if (views.get(objectid)):
        views[objectid] += 1
    # Otherwise, record the object's first move
    else:
        views[objectid] = 1

# Take the dictionary of recorded views and get the one with the most views
object_id = max(views, key=views.get)

# Retrieve the top object's number of views, convert to string
object_views = str(views[object_id])

# Fetch the information of that object
object_url = 'https://api.harvardartmuseums.org/object/' + object_id + '?apikey=0000-0000-0000-000'
object_info = requests.get(object_url)

# Convert to JSON format
object_data = object_info.json()

# Get title and artist of object
object_title = object_data["title"]
object_artist = object_data["people"][0]["name"]

print('The object that has been viewed the most in 2020 is ' + object_title + ' by ' + object_artist + ' (' + object_id + ')' + ' at ' + object_views + ' views')
