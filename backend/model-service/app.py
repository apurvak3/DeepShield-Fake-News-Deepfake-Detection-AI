from flask import Flask, request, jsonify
from transformers import BertTokenizer, TFBertForSequenceClassification
import tensorflow as tf

app = Flask(__name__)

# Load model & tokenizer
model_path = "fake_news_model"
model = TFBertForSequenceClassification.from_pretrained(model_path)
tokenizer = BertTokenizer.from_pretrained(model_path)

# Predict route
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    text = data.get("text")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    inputs = tokenizer(text, return_tensors="tf", truncation=True, padding=True, max_length=512)
    outputs = model(**inputs)
    prediction = tf.argmax(outputs.logits, axis=1).numpy()[0]

    label = "Fake" if prediction == 1 else "Real"
    return jsonify({"prediction": label})

# Run the app
if __name__ == '__main__':
    app.run(port=5000, debug=True)
