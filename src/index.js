
const subtitlesManager = require('../src/open-subtitles/open-subtitles-manager');
const fileManager = require('../src/file/file-manager');

const titleInput = document.createElement('input');
titleInput.placeholder = 'File Name';
 
document.body.appendChild(titleInput);


const searchButton = document.createElement('button');
searchButton.textContent = 'Search';
searchButton.addEventListener('click', () => {
    subtitlesManager.search(titleInput.value);
}, false);

document.body.appendChild(searchButton);

const holder = document.getElementById('holder');

holder.ondragover = ev => {
  ev.preventDefault()
}

holder.ondrop = ev => {
    console.log(ev.dataTransfer.files.length);

    for(let i = 0; i < ev.dataTransfer.files.length; i++){
        console.log(ev.dataTransfer.files[i].path)
        subtitlesManager.search(ev.dataTransfer.files[i]);
    }
    ev.preventDefault()  
}
