from flask import Flask, render_template, request, jsonify, redirect, url_for
from db import ina, eng, jpg
import json

app = Flask(__name__, static_url_path='/translate/static')

# Load languages data from JSON
with open('./json/languages.json', 'r') as json_file:
    languages_data = json.load(json_file)

@app.route('/')
def index():
    return render_template('welcome.html')

@app.route('/translate')
def translate():
    return render_template('index.html', languages=languages_data)

@app.route('/translates', methods=['POST'])
def do_translate():
    data = request.json
    translate_text = data.get('translate', '').lower()
    pilihan = data.get('pilihan')
    
    if not translate_text or not pilihan:
        return jsonify({"error": "Translate text or pilihan is missing!"}), 400
    
    indonesia = ina.translateIndo(translate_text)
    english = eng.translateInggris(translate_text)
    jepang = jpg.translateJepang(translate_text)
    
    if pilihan == "en":
        terjemahan = english
    elif pilihan == "ja":
        terjemahan = jepang
    elif pilihan == "id":
        terjemahan = indonesia
    else:
        return jsonify({"error": "Pilihan tidak valid. Silakan pilih bahasa yang valid!"}), 400

    return jsonify({"terjemahan": terjemahan}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
