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

let songs = [
    {
        Name: "Name",
        Path: "path",
        Artist: "artist",
        Cover: "cover path",
        Liked: false
    },

    {
        Name: "Name",
        Path: "path",
        Artist: "artist",
        Cover: "cover path",
        Liked: false
    },

    {
        Name: "Name",
        Path: "path",
        Artist: "artist",
        Cover: "cover path",
        Liked: false
    },

    {
        Name: "Name",
        Path: "path",
        Artist: "artist",
        Cover: "cover path",
        Liked: false
    },

    {
        Name: "Name",
        Path: "path",
        Artist: "artist",
        Cover: "cover path",
        Liked: false
    },

    {
        Name: "Name",
        Path: "path",
        Artist: "artist",
        Cover: "cover path",
        Liked: false
    },

    {
        Name: "Name",
        Path: "path",
        Artist: "artist",
        Cover: "cover path",
        Liked: false
    },

    {
        Name: "Name",
        Path: "path",
        Artist: "artist",
        Cover: "cover path",
        Liked: false
    },

    {
        Name: "Name",
        Path: "path",
        Artist: "artist",
        Cover: "cover path",
        Liked: false
    },
];

function addToPlaylist(playlist, song) {
    playlist.push(song);
    return playlist;
}

function removeFromPlaylist(playlist, song) {
    let index = playlist.indexof(song);
    playlist.splice(index, index);
    return playlist;
}

// Player 

let like = document.getElementsByClassName('notliked');
like = like[0];

like.addEventListener('click', ()=> {
    if(like.classList.value === 'notliked')
        like.innerHTML = '<i class="fa-solid fa-heart"></i>';
    else
        like.innerHTML = '<i class="fa-regular fa-heart"></i>';
    like.classList.toggle('liked');
});


// Play/Pause   

let play = document.getElementsByClassName('play');
play = play[0];

let pause = document.getElementsByClassName('fa-circle-play');
pause = pause[0];

play.addEventListener('click', ()=>{   
    if(pause.classList.contains('fa-circle-play')) {
        pause.classList.remove('fa-circle-play');
        pause.classList.add('fa-circle-pause');
    }
    else {
        pause.classList.add('fa-circle-play');
        pause.classList.remove('fa-circle-pause');
    }
});


//--------------------------------------Average Image color---------------------------------------------

function setColor(img) {
    console.log(img);
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
    
            rgb.r += imgData.data[i];
    
            rgb.g += imgData.data[i + 1];
    
            rgb.b += imgData.data[i + 2];
    
            count++;
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
    
    setTimeout(() => {
        rgb = averageColor(img);

        document.getElementById('averageImageColor-hero').style.backgroundImage = 
            `linear-gradient(to bottom, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1), #121212)`;
    }, 500)
}

function colorDefault() {
    document.getElementById('averageImageColor-hero').style.backgroundImage = 
        `linear-gradient(to bottom, rgba(133, 101, 129, 1), #121212)`;
}

//--------------------------------------Average Image color---------------------------------------------


var today = new Date();
var time = today.getHours();
let greeting = document.getElementById('greetings');

if(time > 0 && time < 12)
    greeting.innerHTML = "Good morning";
else if(time >= 12 && time < 16)
    greeting.innerHTML = "Good afternoon";
else
    greeting.innerHTML = "Good evening";
