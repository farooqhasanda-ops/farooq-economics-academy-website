from flask import Flask, render_template, request, redirect
from urllib.parse import quote

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

@app.route("/enquiry", methods=["POST"])
def enquiry():
    name = request.form.get("name", "").strip()
    parent = request.form.get("parent", "").strip()
    phone = request.form.get("phone", "").strip()
    student_class = request.form.get("student_class", "").strip()
    subject = request.form.get("subject", "").strip()
    mode = request.form.get("mode", "").strip()
    timing = request.form.get("timing", "").strip()

    message = f"""Assalamu Alaikum Farooq Economics Academy,

I want admission details.

Student Name: {name}
Parent Name: {parent}
Phone: {phone}
Class: {student_class}
Subject: {subject}
Mode: {mode}
Preferred Timing: {timing}

Please contact me."""
    return redirect(f"https://wa.me/{ACADEMY['whatsapp']}?text={quote(message)}")

if __name__ == "__main__":
    app.run(debug=True)
