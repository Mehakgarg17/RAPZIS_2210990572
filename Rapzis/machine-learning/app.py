from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load model
model = pickle.load(open("model.pkl", "rb"))

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    features = [
    data.get("overspeed", 0),
    data.get("overtaking", 0),
    data.get("lanejump", 0),
    data.get("wrongside", 0)
]

    prediction = model.predict([features])[0]

    # Convert to readable label
    if prediction == 0:
        risk = "Low"
    else:
        risk = "High"

    return jsonify({"risk": risk})

if __name__ == "__main__":
    app.run(port=5001, debug=True)
