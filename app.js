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
        if (music.paused) {
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
        } else {
            makeAllPlays()
            index = parseInt(e.target.id)
            e.target.classList.remove('fa-pause')
            e.target.classList.add('fa-play')
            music.src = `music/${index}.mp3`
            timeupdate()
            music.pause()
            h3.innerText = songs[index].songName
            play.classList.remove('fa-pause')
            play.classList.add('fa-play')
        }
    })
})


const Play = () => {
    plays[index].classList.remove('fa-play')
    plays[index].classList.add('fa-pause')
}
const h3 = document.querySelector('h3')
const forward = () => {
    if (index >= 4) {
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
        index = 4
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






