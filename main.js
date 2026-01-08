let searchInput = document.querySelector('.input')
let searchBtn = document.querySelector('.search-btn')
let listWrapper = document.querySelector('.list-wrapper')
let formEnter = document.querySelector('.form-enter')
let nextPrevBtns = document.querySelector('.next-prev-btns')


let searchTerm = 'blue'

searchInput.addEventListener('input', () => searchTerm = searchInput.value)
searchBtn.addEventListener('click', () => fetchData(searchTerm))
formEnter.addEventListener('click', (event) => {
    event.preventDefault()
    fetchData(searchTerm)
})

const fetchData = (term) => {
    const URL = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${term}`

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3f960e2f61mshdba9a57677b2db8p1cc9fdjsn181a8e14efc0',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };

    fetch(URL, options)
        .then(response => response.json())
        .then(data => insertSongToList(data))
}

fetchData(searchTerm)

const getNextSongs = (nextSongsUrl) => {
    const URL = `https://cors-anywhere.herokuapp.com/${nextSongsUrl}`
    console.log(URL);

    fetch(URL)
        .then(response => response.json())
        .then(data => insertSongToList(data))
}

const insertSongToList = (data) => {

    listWrapper.innerHTML = data.data.map(song =>
        `
        <div class="list-item-wrapper">
            <div class="portrait-wrapper">
                <a href="${song.artist.picture_xl}" target="_blank"><img class="portrait" src="${song.artist.picture}"/></a>
            </div>
            <div class="list-item">
                <h1 title="${song.title}">${song.title}</h1>
                <div class="artist-and-controlls-wrapper">
                    <h2>${song.artist.name}</h2>
                    <audio class="audio" id="audio${song.id}">
                        <source src="${song.preview}">
                    </audio>
                    <div class="btns-wrapper">
                        <img class="btn-play" id="${song.id}" onclick="playPreview(event)" src="icons/play.svg" title="Tocar prévia"/>
                        <a href="${song.album.cover_xl}" target="_blank"><img class="btn-cover" src="icons/cover.svg" title="Capa do álbum"/></a>
                        <a href="${song.link}" target="_blank"><img class="btn-deezer" onclick="showCoverImage('${song.link}')" src="icons/deezer.svg" title="Link para o Deezer"/></a>
                    </div>
                </div>
                </div>
            </div>
        </div>
        `
    ).join("")

    // if (data.next || data.prev) {
    //     nextPrevBtns.innerHTML = `  
    //     ${data.prev ? `<div onclick="getNextSongs('${data.prev}')" class="prev-btn" alt="Botão próxima lista">&#9654;&#9654;</div>` : ''}
    //     ${data.next ? `<div onclick="getNextSongs('${data.next}')" class="next-btn" alt="Botão próxima lista">&#9654;&#9654;</div>` : ''}
    //     `
    // }
    // else {
    //     nextPrevBtns.innerHTML = ''
    // }
}

let audioLink

const playPreview = (event) => {

    let id = event.target.getAttribute("id")
    let mode = event.target.getAttribute("src")
    audioLink = document.querySelector(`#audio${id}`)

    if (mode === "icons/play.svg") {
        event.target.setAttribute("src", "icons/pause.svg")
        audioLink.play()
    }
    else {
        event.target.setAttribute("src", "icons/play.svg")
        audioLink.pause()
    }

    audioLink.onended = () => event.target.setAttribute("src", "icons/play.svg")
}
