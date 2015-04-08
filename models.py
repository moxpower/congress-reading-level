from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pol.db'
db = SQLAlchemy(app)


class Politician(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(80))
    lastname = db.Column(db.String(80))
    fullname = db.Column(db.String(100))
    gender = db.Column(db.String(50))
    bioguide_id = db.Column(db.String(50), unique=True)
    party = db.Column(db.String(50))
    state = db.Column(db.String(50))
    chamber = db.Column(db.String(50))
    rep_district = db.Column(db.Integer)

    facebook_id = db.Column(db.String(100))
    twitter_id = db.Column(db.String(50))
    youtube_id = db.Column(db.String(100))

    index_ari = db.Column(db.Integer)
    index_coleman = db.Column(db.Integer)
    index_flesch = db.Column(db.Integer)
    index_gunning = db.Column(db.Integer)
    index_smog = db.Column(db.Integer)
    index_composite = db.Column(db.Integer)

    def __init__(self, firstname=None,
    					lastname=None,
    					fullname=None,
    					gender=None,
    					bioguide_id=None,
    					party=None,
    					state=None,
    					chamber=None,
    					rep_district=None,
    					facebook_id=None,
    					twitter_id=None,
    					youtube_id=None,
    					index_ari=None,
    					index_coleman=None,
    					index_gunning=None,
    					index_flesch=None,
    					index_smog=None,
    					index_composite=None):

        self.firstname = firstname
        self.lastname = lastname
        self.fullname = fullname
        self.gender = gender
        self.bioguide_id = bioguide_id
        self.party = party
        self.state = state
        self.chamber = chamber
        self.rep_district = rep_district
        self.facebook_id = facebook_id
        self.twitter_id = twitter_id
        self.youtube_id = youtube_id
        self.index_ari = index_ari
        self.index_coleman = index_coleman
        self.index_gunning = index_gunning
        self.index_flesch = index_flesch
        self.index_smog = index_smog
        self.index_composite = index_composite

    def __repr__(self):
        return '<Pol %r>' % self.fullname
