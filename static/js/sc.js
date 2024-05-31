document.addEventListener("DOMContentLoaded", () => {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
  script.onload = function () {
    function doTranslation() {
      const translateInput = document.getElementById("translateInput").value;
      const pilihanInput = document.getElementById("pilihanInput").value;
      const url = "/translates";

      const xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            try {
              const contentType = xhr.getResponseHeader("Content-Type");
              if (contentType && contentType.includes("application/json")) {
                const response = JSON.parse(xhr.responseText);
                if (response.terjemahan) {
                  document.getElementById("resultContainer").innerHTML = response.terjemahan;
                } else {
                  Swal.fire('Error', response.error, 'error');
                }
              } else {
                Swal.fire('Error', 'Invalid response from server. Expected JSON.', 'error');
              }
            } catch (error) {
              Swal.fire('Error', 'Failed to parse JSON response: ' + error.message, 'error');
            }
          } else {
            Swal.fire('Error', `HTTP status ${xhr.status}`, 'error');
          }
        }
      };

      xhr.send(JSON.stringify({ translate: translateInput, pilihan: pilihanInput }));
    }

    const translateButton = document.getElementById("btn-translate");
    if (translateButton) {
      translateButton.addEventListener("click", doTranslation);
    }
  };

  document.body.appendChild(script);
});
