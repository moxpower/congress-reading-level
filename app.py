from flask import Flask, render_template, send_from_directory

app = Flask(__name__, static_url_path='')

@app.route('/')
def home():
	return render_template('index.html', name="wawa-wee-wah")

@app.route('/static/js/<path:path>')
def send_js(path):
    return send_from_directory('js', path)

@app.route('/static/css/<path:path>')
def send_css(path):
    return send_from_directory('css', path)

if __name__ == "__main__":
	app.run(debug=True, port=8100)