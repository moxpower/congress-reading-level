from flask import Flask, render_template, send_from_directory
from models import Politician
import numpy

app = Flask(__name__, static_url_path='')

@app.route('/')
def home():
	pols = Politician.query.all()
	avg, median = calc_avgs(pols)
	return render_template('index.html', pols=pols, avg=avg, median=median)

@app.route('/static/js/<path:path>')
def send_js(path):
    return send_from_directory('js', path)

@app.route('/static/css/<path:path>')
def send_css(path):
    return send_from_directory('css', path)

@app.route('/data/<path:path>')
def send_data(path):
    return send_from_directory('data', path)

def calc_avgs(pols):
 	total = 0
 	count = 0
 	median_list = []
 	for pol in pols:
 		if pol.index_flesch > 5:
 			total += pol.index_composite
 			count += 1
 			median_list.append(pol.index_composite)
 	return total / count, numpy.median(median_list)

if __name__ == "__main__":
	app.run(debug=True, port=8100)