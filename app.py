# Import data from database
from db import ina,eng,jpg
import json

# flask extension
from flask import Flask, render_template, request, jsonify

# yt extension
from pytube import YouTube
from urllib.parse import unquote 

app = Flask(__name__, static_url_path='/translate/static')

with open('./json/languages.json', 'r') as json_file:
    languages_data = json.load(json_file)

def on_progress(stream, chunk, remaining):
    percent = (1 - remaining / stream.filesize) * 100
    print(f"\rDownload: {stream.title} - {percent:.2f}% complete", end="")

def display_available_resolutions(yt):
    resolutions = []
    for stream in yt.streams.filter(file_extension='mp4'):
        resolutions.append(stream.resolution)
    return resolutions

@app.route('/', methods=['GET','POST'])
def index():
    if request.method == 'POST':
        url = request.form['url']
        resolution = request.form['resolution']
        outputPath = request.form['outputPath']

        try:
            yt = YouTube(url, on_progress_callback=on_progress)
            resolutions = display_available_resolutions(yt)

            if resolution not in resolutions:
                return render_template("index.html", error="Invalid resolution. Choose from available resolutions.")

            video = yt.streams.filter(res=resolution, file_extension='mp4').first()
            video.download(outputPath)

            return render_template("index.html", success="Download completed successfully!")

        except Exception as e:
            return render_template("index.html", error=f"Error: {e}")

    return render_template("index.html", languages=languages_data['languages'])

@app.route('/translate/templates', methods=['POST','GET'])
def do_translate():
    translate = request.args.get('translate').lower()
    pilihan = request.args.get('pilihan')
    
    indonesia = ina.translateIndo(translate)
    english = eng.translateInggris(translate)
    jepang = jpg.translateJepang(translate)
    
    if pilihan == "en":
        terjemahan = english
    elif pilihan == "ja":
        terjemahan = jepang
    elif pilihan == "id":
        terjemahan = indonesia
    else:
        return jsonify({"error": "Pilihan tidak valid. Silakan pilih bahasa yang valid!"})

    return jsonify({"terjemahan": terjemahan})

if __name__ == '__main__':
    app.run(debug=True)