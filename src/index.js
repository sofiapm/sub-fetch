
const subtitlesManager = require('../src/open-subtitles/open-subtitles-manager');


const titleInput = document.createElement('input');
titleInput.placeholder = 'File Name';
 
document.body.appendChild(titleInput);


const searchButton = document.createElement('button');
searchButton.textContent = 'Search';
searchButton.addEventListener('click', () => {
    console.log(titleInput.value);
    subtitlesManager.ping();
}, false);

document.body.appendChild(searchButton);
