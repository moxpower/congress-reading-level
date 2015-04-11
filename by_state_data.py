from models import Politician
from app import calc_avgs
import us

states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC']

# to get averages by party (independent of state)
pols = Politician.query.all()
republican_total = 0
republican_count = 0
democrat_total = 0
democrat_count = 0
independent_total = 0
independent_count = 0

for pol in pols:
	if pol.index_flesch > 5 and pol.party == "Republican":
		republican_total += pol.index_composite
		republican_count += 1
	elif pol.index_flesch > 5 and pol.party == "Democrat":
		democrat_total += pol.index_composite
		democrat_count += 1
	elif pol.index_flesch > 5 and pol.party == "Independent":
		independent_total += pol.index_composite
		independent_count += 1

print republican_total / republican_count, democrat_total / democrat_count, independent_total / independent_count


# for state in states:

	# pols = Politician.query.filter_by(state=state).all()

	# Average for all congressmen in state
	# avg, median = calc_avgs(pols)
	# print round(avg, 1)

	# # Average for Republicans by state
	# pols = Politician.query.filter_by(state=state, party='Republican').all()
	# if len(pols) < 1:
	# 	avg = 'n/a'
	# elif len(pols) == 1:
	# 	avg = round(pols[0].index_composite, 1)
	# else:
	# 	avg, median = calc_avgs(pols)
	# 	avg = round(avg, 1)
	# print avg

	# # Average for Democrat by state
	# pols = Politician.query.filter_by(state=state, party='Democrat').all()
	# if len(pols) < 1:
	# 	avg = 'n/a'
	# elif len(pols) == 1:
	# 	avg = round(pols[0].index_composite, 1)
	# else:
	# 	avg, median = calc_avgs(pols)
	# 	avg = round(avg, 1)
	# print avg

	# # Average for Independents by state
	# pols = Politician.query.filter_by(state=state, party='Independent').all()
	# if len(pols) < 1:
	# 	avg = 'n/a'
	# elif len(pols) == 1:
	# 	avg = round(pols[0].index_composite, 1)
	# else:
	# 	avg, median = calc_avgs(pols)
	# 	avg = round(avg, 1)
	# print avg

	# # Average for House members by state
	# pols = Politician.query.filter_by(state=state, chamber='rep').all()
	# if len(pols) < 1:
	# 	avg = 'n/a'
	# elif len(pols) == 1:
	# 	avg = round(pols[0].index_composite, 1)
	# else:
	# 	avg, median = calc_avgs(pols)
	# 	avg = round(avg, 1)
	# print avg

	# # Average for Senate members by state
	# pols = Politician.query.filter_by(state=state, chamber='sen').all()
	# if len(pols) < 1:
	# 	avg = 'n/a'
	# elif len(pols) == 1:
	# 	avg = round(pols[0].index_composite, 1)
	# else:
	# 	avg, median = calc_avgs(pols)
	# 	avg = round(avg, 1)
	# print avg