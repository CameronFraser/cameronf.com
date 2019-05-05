import sys
from flask import Flask, render_template
from flask_frozen import Freezer

app = Flask(__name__)
app.config['FREEZER_DESTINATION'] = 'dist'
freezer = Freezer(app)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/about.html')
def about():
    return render_template("about.html")

if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == "build":
        freezer.freeze()
    else:
        app.run(port=8000)
