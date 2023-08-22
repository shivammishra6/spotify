let index = 0
const songs = [
    { songName: 'Doja Cat', poster: "https://e-cdn-images.dzcdn.net/images/cover/4d2f748127feb33e3fb8a397b95bea94/256x256-000000-80-0-0.jpg", duration: "1:44", path: "music/0.mp3" },

    { songName: '21 Questions', poster: "https://i1.sndcdn.com/artworks-WzWTtwZhzQauWamC-qrHMjw-t500x500.jpg", duration: "3:53", path: "music/1.mp3" },

    {
        songName: 'Many Men', poster: "https://i1.sndcdn.com/artworks-7T48M7PqUNoD-0-t500x500.jpg",
        duration: "4:16", path: "music/2.mp3"
    },

    { songName: 'Poppin them thangs', poster: "https://i1.sndcdn.com/artworks-000659663188-5tnfmz-t500x500.jpg", duration: "4:01", path: "music/3.mp3" },

    { songName: 'Committment Issues', poster: "https://i1.sndcdn.com/artworks-VdzX2UWqOKrOi8oG-7LXZ1w-t500x500.jpg", duration: "2:38", path: "music/4.mp3" },

    { songName: 'Baller', poster: "https://i1.sndcdn.com/artworks-rQhcR1d5DQpr-0-t500x500.jpg", duration: "2:28", path: "music/5.mp3" },

    { songName: 'Loyal To The Game', poster: "https://a10.gaanacdn.com/gn_img/albums/z8k3yd1Krx/8k3ygk9dbr/size_l.jpg", duration: "3:23", path: "music/6.mp3" },

    { songName: 'Me And My Girlfriend', poster: "https://m.media-amazon.com/images/I/514lb0VXxkL._UC256,256_CACC,256,256_.jpg", duration: "5:08", path: "music/7.mp3" },

    { songName: 'Still Dre', poster: "https://i1.sndcdn.com/artworks-RdvrkBSoL9STi49c-4ZyIOA-t500x500.jpg", duration: "4:50", path: "music/8.mp3" },

    { songName: 'Tradin War Stories', poster: "https://images.genius.com/8ec48b2cb57552179b13f1f160244d71.593x593x1.jpg", duration: "5:29", path: "music/9.mp3" },

    { songName: 'We Rollin', poster: "https://i.scdn.co/image/ab67616d0000b2737f0e75bb34a47113838ab3b6", duration: "3:19", path: "music/10.mp3" },
]


songs.forEach((elem, i) => {
    const div = document.getElementById('append')
    const data =
        `<div class="white">
    <div class="round">
        <img src="${elem.poster}" >
    </div>
     <span>${elem.songName}</span>
    <p>${elem.duration}<i id='${i}' class="fa-solid fa-play play"></i></p>
</div>`
    div.innerHTML += data
})

const play = document.getElementById('play')
const music = new Audio("music/0.mp3")
play.addEventListener('click', () => {
    if (music.paused) {
        music.play()
        play.classList.remove('fa-play')
        play.classList.add('fa-pause')
        timeupdate()
        Play()
    } else {
        music.pause()
        play.classList.remove('fa-pause')
        play.classList.add('fa-play')
        makeAllPlays()
    }
})

const bar = document.getElementById('range')
const timeupdate = () => {
    music.addEventListener('timeupdate', () => {
        progress = parseInt((music.currentTime / music.duration) * 100)
        bar.value = progress
        if (music.ended)
            forward()
    })

    bar.addEventListener('change', () => {
        music.currentTime = bar.value * music.duration / 100
    })

}

const makeAllPlays = () => {
    Array.from(document.querySelectorAll('.play')).forEach((element) => {
        element.classList.add('fa-play')
        element.classList.remove('fa-pause')
    })
}
const plays = document.querySelectorAll('.play')
plays.forEach((element) => {
    element.addEventListener('click', (e) => {
            makeAllPlays()
            index = parseInt(e.target.id)
            e.target.classList.remove('fa-play')
            e.target.classList.add('fa-pause')
            music.src = `music/${index}.mp3`
            timeupdate()
            music.play()
            h3.innerText = songs[index].songName
            play.classList.remove('fa-play')
            play.classList.add('fa-pause')
    })
})


const Play = () => {
    plays[index].classList.remove('fa-play')
    plays[index].classList.add('fa-pause')
}
const h3 = document.querySelector('h3')
const forward = () => {
    if (index >= 10) {
        index = 0
    } else {
        index++
    }
    music.src = `music/${index}.mp3`
    bar.value = 0
    h3.innerText = songs[index].songName
    music.play()
    makeAllPlays()
    Play()
    play.classList.remove('fa-play')
    play.classList.add('fa-pause')
}
document.querySelector('.fa-forward').addEventListener('click', () => {
    return forward()
})

document.querySelector('.fa-backward').addEventListener('click', () => {
    if (index <= 0) {
        index = 10
    } else {
        index--
    }
    music.src = `music/${index}.mp3`
    makeAllPlays()
    Play()
    bar.value = 0
    h3.innerText = songs[index].songName
    music.play()
    play.classList.remove('fa-play')
    play.classList.add('fa-pause')
})






