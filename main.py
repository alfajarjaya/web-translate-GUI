from flask import Flask, render_template, request
from pytube import YouTube

app = Flask(__name__)

def on_progress(stream, chunk, remaining):
    percent = (1 - remaining / stream.filesize) * 100
    print(f"\rDownload: {stream.title} - {percent:.2f}% complete", end="")

def display_available_resolutions(yt):
    resolutions = []
    for stream in yt.streams.filter(file_extension='mp4'):
        resolutions.append(stream.resolution)
    return resolutions

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        url = request.form["url"]
        resolution = request.form["resolution"]
        outputPath = request.form["outputPath"]

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

    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
