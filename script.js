let btn = document.getElementById("libSearchButton");
let searchBar = document.getElementById("libSearch");

btn.addEventListener('click', ()=> {
    if(searchBar.style.width) {
        searchBar.style.width = null;
        searchBar.style.padding = null;
    }
    else {
        searchBar.style.width= "fit-content";
        searchBar.style.padding= "10px";
    }
});

var song = new Audio('Songs/likedSongs/Heather.mp3');
trackProgress();

function changePlayerDetails(element) {

    document.getElementsByClassName('currSong')[0].classList.remove('currSong');
    element.classList.add('currSong');

    song.pause();

    let title = element.querySelector('.song-name').innerHTML;
    let artist = element.querySelector('.artist').innerHTML;

    song = new Audio(`Songs/likedSongs/${title}.mp3`);
    document.getElementsByClassName('currSong-poster')[0].innerHTML =               // change poster
        `<img src="Posters/${title}.jpg" width="60px" height="60px" alt="poster">`;
    document.getElementsByClassName('currSong-title')[0].innerHTML = title;
    document.getElementsByClassName('currSong-title')[0].nextElementSibling.innerHTML = artist;
    song.play();
    document.getElementsByClassName('player-play')[0].children[0].classList.remove('fa-circle-play');
    document.getElementsByClassName('player-play')[0].children[0].classList.add('fa-circle-pause');

    trackProgress();
}

let currSong = document.querySelector(".currSong .title span .song-name");

// Play/Pause   

let play = document.getElementsByClassName('player-play');
play = play[0];

let pause = document.getElementsByClassName('fa-circle-play');
pause = pause[1];

play.addEventListener('click', ()=>{   
    if(pause.classList.contains('fa-circle-play')) {
        pause.classList.remove('fa-circle-play');
        pause.classList.add('fa-circle-pause');
        song.play();
    }
    else {
        pause.classList.add('fa-circle-play');
        pause.classList.remove('fa-circle-pause');
        song.pause();
    }
});

// Next-Preivous

function next() {
    let current = document.getElementsByClassName('currSong')[0];
    if(current.nextElementSibling !== null)
        changePlayerDetails(current.nextElementSibling);
}

function previous() {
    let current = document.getElementsByClassName('currSong')[0];
    if(current.previousElementSibling !== null)
        changePlayerDetails(current.previousElementSibling);
}

// Update Progress bar

var time,
progressBar;

function formattedNumber(time) {
    const num = (time).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
})
return num;
}

function trackProgress() {
    progressBar = document.getElementById('progressBar')
    progressBar.value=0;
    song.addEventListener('timeupdate', ()=> {
        time = song.currentTime/song.duration *100;
        let minutes = parseInt(parseInt(song.currentTime)/60);
        let seconds = parseInt(parseInt(song.currentTime)%60);
        seconds = formattedNumber(seconds);
        progressBar.nextElementSibling.innerHTML = `${parseInt(song.duration/60)}:${formattedNumber(parseInt(song.duration%60))}`;
        progressBar.previousElementSibling.innerHTML = `${minutes}:${seconds}`;
        progressBar.value = time;
        if(song.currentTime == song.duration)
            next();
    })
    progressBar.addEventListener('change', ()=> {
        song.currentTime = progressBar.value * song.duration/100;
    })
}

// Volume change

var volume = document.getElementById('volume');
volume.addEventListener('change', ()=> {
    song.volume = volume.value/100;
    console.log(song.volume);
});

// Like-Unlike

let like = document.getElementsByClassName('notliked');
like = like[0];

like.addEventListener('click', ()=> {
    if(like.classList.value === 'notliked')
        like.innerHTML = '<i class="fa-solid fa-heart"></i>';
    else
        like.innerHTML = '<i class="fa-regular fa-heart"></i>';
    like.classList.toggle('liked');
});

//--------------------------------------Average Image color---------------------------------------------

function averageColor(imageElement) {

    var canvas = document.createElement('canvas'),

        context = canvas.getContext && canvas.getContext('2d'),
        imgData, width, height, length, rgb = { r: 0, g: 0, b: 0 }, count = 0;

    height = canvas.height = imageElement.naturalHeight || imageElement.offsetHeight || imageElement.height;
    width = canvas.width = imageElement.naturalWidth || imageElement.offsetWidth || imageElement.width;

    context.drawImage(imageElement, 0, 0);

    imgData = context.getImageData(0, 0, width, height);

    length = imgData.data.length;

    for (var i = 0; i < length; i += 4) {

        if(imgData.data[i]+imgData.data[i+1]+imgData.data[i+2]<330) {
            rgb.r += imgData.data[i];

            rgb.g += imgData.data[i + 1];

            rgb.b += imgData.data[i + 2];

            count++;
        }
    }

    // Find the average of red
    rgb.r
        = Math.floor(rgb.r / count);

    // Find the average of green
    rgb.g
        = Math.floor(rgb.g / count);

    // Find the average of blue
    rgb.b
        = Math.floor(rgb.b / count);

    return rgb;
}

var rgb;

playlistCover = document.getElementById('playlist-cover');
rgb = averageColor(playlistCover);

document.getElementById('playlist-hero').style.backgroundImage =
`linear-gradient(to bottom, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8), rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6))`;

document.getElementById('playlist-container').style.backgroundImage =
`linear-gradient(to bottom, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4), #121212 30vh)`;

function setColor(img) {
    rgb = averageColor(img);
    gsap.to('#averageImageColor-hero', {
        backgroundImage: `linear-gradient(to bottom, rgb(${rgb.r}, ${rgb.g}, ${rgb.b}), #121212)`,
        duration: 1
    });
}

function colorDefault() {
    gsap.to('#averageImageColor-hero', {
        backgroundImage: `linear-gradient(to bottom, rgba(79, 55, 68, 1), #121212)`,
        duration: 1
    })
}

//--------------------------------------Greeting System---------------------------------------------


var today = new Date();
var time = today.getHours();
let greeting = document.getElementById('greetings');

if(time > 0 && time < 12)
    greeting.innerHTML = "Good morning";
else if(time >= 12 && time < 16)
    greeting.innerHTML = "Good afternoon";
else
    greeting.innerHTML = "Good evening";

//-------------------------------------------- NUMBERING SYSTEM ------------------------------------------------------------------------

var listNodes = document.getElementsByTagName('li');
var len = Object.keys(listNodes).length;
var audioLen, duration;

for(let i=0; i<len; i++) {
    let songDiv = listNodes[i].children;
    songDiv[0].children[0].innerHTML = i+1;
    audioLen = new Audio(`Songs/likedSongs/${songDiv[0].querySelector('.song-name').innerHTML}.mp3`);
    songDiv[0].querySelector('.duration').innerHTML = audioLen.duration;
}

// ----------------------------------------- OPENING PLAYLISTS ----------------------------------------------------------------------

function openPlaylist(element, playlistName) {
    console.log(element);
    document.querySelector('.main').style.display = 'none';
    document.querySelector(playlistName).style.display = 'inline';
}
