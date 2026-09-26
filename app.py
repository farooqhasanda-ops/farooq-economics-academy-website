from flask import Flask, render_template

app = Flask(__name__)

ACADEMY = {
    "name": "Farooq Economics Academy",
    "phone": "9989221983",
    "whatsapp": "919989221983",
    "email": "frkfarooqhasan@gmail.com",
    "location": "Tolichowki, Hyderabad",
    "timings": "5:00 PM to 11:00 PM",
}

@app.route("/")
def home():
    return render_template("index.html", academy=ACADEMY)

if __name__ == "__main__":
    app.run(debug=True)
