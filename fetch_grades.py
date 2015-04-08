import requests
import urllib2
from pprint import pprint
from models import Politician
from keys import sunlight_key

pols = Politician.query.all()
count = 0

for pol in pols:
	bioguide_id = pol.bioguide_id
	print bioguide_id
	count += 1
	
	query_params = { 'apikey': sunlight_key,
					 'per_page': 100,
					 'bioguide_id': bioguide_id
			 		}

	endpoint = 'http://capitolwords.org/api/text.json'

	response = requests.get(endpoint, params=query_params)
	data = response.json()
	# pprint.pprint(data['results'])
	# pprint.pprint(len(data['results']))
	# pprint.pprint(data['results'][4]['speaking'])
	lines = data['results'][4]['speaking']

	speech = ""
	for line in lines:
		speech += line + " "

	print speech
	print len(speech)

	values = '{"async": false,"data": {"content": "'+ speech +'",}}'

	headers = {
	  'X-Access-Key': '34ed16e6b5f645c5a3cba39c75ee80b2'
	}
	request = urllib2.Request('https://api.engine.priceonomics.com/v1/apps/readinglevel', data=values, headers=headers)

	response_body = urllib2.urlopen(request).read()
	pprint(response_body)

	if count >= 1:
		break

