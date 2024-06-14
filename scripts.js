const tracks = [
    {
        title: 'Song One',
        artist: 'Artist One',
        src: 'assets/song1.mp3',
        cover: 'assets/cover1.jpg'
    },
    {
        title: 'Song Two',
        artist: 'Artist Two',
        src: 'assets/song2.mp3',
        cover: 'assets/cover2.jpg'
    }
];

let currentTrackIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

const audio = new Audio();
const playPauseButton = document.getElementById('play-pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const progressBar = document.getElementById('progress-bar');
const volumeControl = document.getElementById('volume-control');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const playlistElement = document.getElementById('playlist');

function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.src;
    document.getElementById('track-title').textContent = track.title;
    document.getElementById('track-artist').textContent = track.artist;
    document.getElementById('album-cover').src = track.cover;
    progressBar.value = 0;
}

function playPause() {
    if (isPlaying) {
        audio.pause();
        playPauseButton.textContent = 'Play';
    } else {
        audio.play();
        playPauseButton.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
}

function nextTrack() {
    if (isShuffle) {
        currentTrackIndex = Math.floor(Math.random() * tracks.length);
    } else {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    }
    loadTrack(currentTrackIndex);
    if (isPlaying) audio.play();
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) audio.play();
}

audio.addEventListener('timeupdate', () => {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
});

audio.addEventListener('ended', () => {
    if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
    } else {
        nextTrack();
    }
});

progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
});

playPauseButton.addEventListener('click', playPause);
prevButton.addEventListener('click', prevTrack);
nextButton.addEventListener('click', nextTrack);

shuffleButton.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffleButton.classList.toggle('active', isShuffle);
});

repeatButton.addEventListener('click', () => {
    isRepeat = !isRepeat;
    repeatButton.classList.toggle('active', isRepeat);
});

tracks.forEach((track, index) => {
    const li = document.createElement('li');
    li.textContent = `${track.title} - ${track.artist}`;
    li.addEventListener('click', () => {
        currentTrackIndex = index;
        loadTrack(index);
        if (isPlaying) audio.play();
    });
    playlistElement.appendChild(li);
});

loadTrack(currentTrackIndex);
