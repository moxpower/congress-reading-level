import requests
import urllib2
import json
from pprint import pprint
from models import Politician, db
from keys import sunlight_key

# get all politicians in DB
pols = Politician.query.filter_by(index_ari=8.33).all()
count_good = 0
count_bad = 0

# analyze each politician by bioguide ID
for pol in pols:
	bioguide_id = pol.bioguide_id
	
	# get speeches from Capitol Words API
	query_params = { 'apikey': sunlight_key,
					 'per_page': 100,
					 'bioguide_id': 'P000603'
			 		}

	endpoint = 'http://capitolwords.org/api/text.json'

	response = requests.get(endpoint, params=query_params)
	data = response.json()

	# concat speech strings into single string to be analyzed
	all_speeches = ""
	for result in data['results']:
		for speech in result['speaking']:
			if len(all_speeches + " " + speech) <= 86100:
				all_speeches += speech + " "
			else:
				break

	print len(all_speeches)
	pprint(all_speeches)
	all_speeches = all_speeches.replace('\\', '')

	# prepare and send speech to priceonomics API
# 	values = """{"async": false,"data": {"content": "'+ %s +'"}}""" % all_speeches

# 	headers = {
# 	  'X-Access-Key': '34ed16e6b5f645c5a3cba39c75ee80b2'
# 	}

# 	try:
# 		request = urllib2.Request('https://api.engine.priceonomics.com/v1/apps/readinglevel', data=values, headers=headers)
# 		response_body = urllib2.urlopen(request)
# 		response_json = json.load(response_body)

# 		pol.index_ari = response_json['data'].get('ari')
# 		pol.index_coleman = response_json['data'].get('coleman-liau')
# 		pol.index_smog = response_json['data'].get('smog')
# 		pol.index_gunning = response_json['data'].get('gunning-fog')
# 		pol.index_flesch = response_json['data'].get('flesch-kincaid')
# 		pol.index_composite = response_json['data'].get('composite')
# 		db.session.commit()
# 		count_good += 1
# 		print "Successful"
# 	except urllib2.HTTPError as e:
# 		count_bad += 1
# 		print "Failed"

# print count_good, count_bad
# print "Successful {0}, Failed {1}".format(count_bad, count_bad)


