const myAlert = document.querySelector(".alert");
const myContent = document.querySelector(".section");
const pilihan = document.querySelector(".pilihan");

const btnNext = document.getElementById("btnNext");
const btnBackID = document.getElementById("back");
const btnBackCl = document.querySelector(".back");

const ytDownload = document.querySelector(".info");
const qrCode = document.querySelector(".qrCode");

function next() {
  btnNext.addEventListener("click", () => {
    myAlert.style.display = "none";
    pilihan.style.display = "block";
    myContent.style.display = "none";
    ytDownload.style.display = "none";
    qrCode.style.display = "none";
  });
}

btnBackID.addEventListener("click", () => {
  myAlert.style.display = "none";
  pilihan.style.display = "block";
  myContent.style.display = "none";
  ytDownload.style.display = "none";
});

btnBackCl.addEventListener("click", () => {
  myAlert.style.display = "none";
  pilihan.style.display = "block";
  myContent.style.display = "none";
  ytDownload.style.display = "none";
});

function web() {
  myAlert.style.display = "none";
  pilihan.style.display = "none";
  myContent.style.display = "block";
  ytDownload.style.display = "none";
  myContent.classList.add("animated");
  qrCode.style.display = "none";
}

function yt() {
  myAlert.style.display = "none";
  pilihan.style.display = "none";
  myContent.style.display = "none";
  ytDownload.style.display = "block";
  ytDownload.classList.add("animated");
  qrCode.style.display = "none";
}

function qr() {
  myAlert.style.display = "none";
  pilihan.style.display = "none";
  myContent.style.display = "none";
  ytDownload.style.display = "none";
  qrCode.classList.add("animated");
  qrCode.style.display = "block";
}

function doTranslation() {
  var translateInput = document.getElementById("translateInput").value;
  var pilihanInput = document.getElementById("pilihanInput").value;
  var url =
    "/translate/templates?translate=" +
    encodeURIComponent(translateInput) +
    "&pilihan=" +
    encodeURIComponent(pilihanInput);

  var xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        if ("terjemahan" in response) {
          document.getElementById("resultContainer").innerHTML =
            response.terjemahan;
        } else {
          alert("Error: " + response.error);
        }
      } else {
        alert("Error: " + xhr.status);
      }
    }
  };

  xhr.send();
}

function handleInvalidJSONResponse(responseText) {
  console.error("Invalid JSON response:", responseText);
}

function generateQRCode() {
  var inputText = document.getElementById("input").value;
  var outputDiv = document.getElementById("output");
  var downloadLink = document.getElementById("downloadLink");

  outputDiv.innerHTML = "";

  var qrcode = new QRCode(outputDiv, {
    text: inputText,
    width: 128,
    height: 128,
  });

  downloadLink.style.display = "block";
  downloadLink.href = outputDiv.firstChild.toDataURL("image/png");
  downloadLink.download = "qrcode.png";
}
