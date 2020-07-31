import requests


def pagination(url):
    r = requests.get(url)

    # Convert data to jSON format
    data = r.json()

    # Extract the info and records
    info = data['info']
    records = data['records']

    # For each record of objects, print the title and classification
    for record in records:
        print(record['title'] + ' --- ' + record['classification'])

    try:
        # If there is a next page, repeat pagination function
        if (info['next']):
            pagination(info['next'])
    # If next page doesn't work, end function
    except:
        pass

# Query to find all objects that have cat in the title
url = "https://api.harvardartmuseums.org/object?title=cat&apikey=0000-0000-0000-0000"

# Perform Pagination function defined above on the query
pagination(url)
