function downloadFile() {
    var githubLink = document.getElementById('githubLink').value;
    var notification = document.getElementById('notification');

    if (!githubLink.includes('github.com')) {
        notification.innerHTML = 'Mohon masukkan link GitHub yang valid.';
        return;
    }

    var fileName = githubLink.split('/').pop();
    
    var rawGitHubUrl = 'https://raw.githubusercontent.com/' + githubLink.split('/')[3] + '/' + githubLink.split('/')[4] + '/main/';

    var fileUrl = rawGitHubUrl + fileName;

    var downloadLink = document.createElement('a');
    downloadLink.href = fileUrl;
    downloadLink.download = fileName;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    notification.innerHTML = 'File sedang diunduh.';

    document.getElementById('githubLink').value = '';
}