const songs = [
    {
        title: "Yedi",
        artist: "Unknown Artist",
        url: "https://res.cloudinary.com/dxyoqmftr/video/upload/v1778331527/Yedi-MassTamilan.dev_ir6ijm.mp3",
        cover: "https://picsum.photos/id/10/300/300"
    },
    {
        title: "Wedding Nasheed",
        artist: "Muhammad Al Muqit",
        url: "https://res.cloudinary.com/dxyoqmftr/video/upload/v1778331524/Wedding_Nasheed_Muhammad_Al_Muqit_English_Lyrics_qdu4tw.mp3",
        cover: "https://picsum.photos/id/11/300/300"
    },
    {
        title: "Night Changes",
        artist: "One Direction",
        url: "https://res.cloudinary.com/dxyoqmftr/video/upload/v1778331521/spotifydown.com_-_Night_Changes_wjuvzp.mp3",
        cover: "https://picsum.photos/id/12/300/300"
    },
    {
        title: "Urugi Urugi",
        artist: "Unknown Artist",
        url: "https://res.cloudinary.com/dxyoqmftr/video/upload/v1778331518/Urugi_Urugi_ewgu5u.mp3",
        cover: "https://picsum.photos/id/13/300/300"
    },
    {
        title: "Tak Bak (Copy)",
        artist: "Unknown Artist",
        url: "https://res.cloudinary.com/dxyoqmftr/video/upload/v1778331513/Tak-Bak-Nee-Takkunu-Paatha_-_Copy_uyw6kn.mp3",
        cover: "https://picsum.photos/id/14/300/300"
    },
    {
        title: "Theansudare",
        artist: "Unknown Artist",
        url: "https://res.cloudinary.com/dxyoqmftr/video/upload/v1778331512/Theansudare_nc900e.mp3",
        cover: "https://picsum.photos/id/15/300/300"
    },
    {
        title: "Tak Bak",
        artist: "Unknown Artist",
        url: "https://res.cloudinary.com/dxyoqmftr/video/upload/v1778331508/Tak-Bak-Nee-Takkunu-Paatha_hhntdd.mp3",
        cover: "https://picsum.photos/id/16/300/300"
    },
    {
        title: "Mudhal Nee Mudivum Nee",
        artist: "Unknown Artist",
        url: "https://res.cloudinary.com/dxyoqmftr/video/upload/v1778331490/SPOTIFY-DOWNLOADER.COM_Mudhal_Nee_Mudivum_Nee_Title_Track_naeqbp.mp3",
        cover: "https://picsum.photos/id/17/300/300"
    },
    {
        title: "Nee Kavithaigala",
        artist: "Unknown Artist",
        url: "https://res.cloudinary.com/dxyoqmftr/video/upload/v1778331490/SPOTIFY-DOWNLOADER.COM_Nee_Kavithaigala_sd8kin.mp3",
        cover: "https://picsum.photos/id/18/300/300"
    },
    {
        title: "Arabic Kuthu",
        artist: "Anirudh Ravichander",
        url: "https://res.cloudinary.com/dxyoqmftr/video/upload/v1778331487/SPOTIFY-DOWNLOADER.COM_Arabic_Kuthu_-_Halamithi_Habibo_From__Beast__fuwr06.mp3",
        cover: "https://picsum.photos/id/19/300/300"
    },
    {
        title: "High on Love",
        artist: "Sid Sriram",
        url: "https://res.cloudinary.com/dxyoqmftr/video/upload/v1778331487/SPOTIFY-DOWNLOADER.COM_High_on_Love_rqsquk.mp3",
        cover: "https://picsum.photos/id/20/300/300"
    }
];

const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

const currentTitle = document.getElementById('current-title');
const currentArtist = document.getElementById('current-artist');
const currentAlbumArt = document.getElementById('current-album-art');
const songsContainer = document.getElementById('songs-container');

let currentSongIndex = 0;
let isPlaying = false;

// Initialize the app
function init() {
    renderSongs();
    loadSong(songs[currentSongIndex]);
}

// Render songs in the main view
function renderSongs() {
    songsContainer.innerHTML = '';
    songs.forEach((song, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${song.cover}" alt="Cover" class="card-img">
            <h3>${song.title}</h3>
            <p>${song.artist}</p>
            <div class="play-button-overlay">
                <i class="fas fa-play"></i>
            </div>
        `;
        
        card.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(songs[currentSongIndex]);
            playSong();
        });
        
        songsContainer.appendChild(card);
    });
}

// Load song details into player
function loadSong(song) {
    audioPlayer.src = song.url;
    currentTitle.textContent = song.title;
    currentArtist.textContent = song.artist;
    currentAlbumArt.src = song.cover;
}

// Play song
function playSong() {
    isPlaying = true;
    playPauseBtn.classList.add('playing');
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    audioPlayer.play();
}

// Pause song
function pauseSong() {
    isPlaying = false;
    playPauseBtn.classList.remove('playing');
    playPauseBtn.innerHTML = '<i class="fas fa-play" style="margin-left: 2px;"></i>';
    audioPlayer.pause();
}

// Toggle play/pause
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Previous song
prevBtn.addEventListener('click', () => {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong(songs[currentSongIndex]);
    if (isPlaying) playSong();
});

// Next song
function nextSong() {
    currentSongIndex++;
    if (currentSongIndex > songs.length - 1) {
        currentSongIndex = 0;
    }
    loadSong(songs[currentSongIndex]);
    if (isPlaying) playSong();
}

nextBtn.addEventListener('click', nextSong);

// Auto play next song when current finishes
audioPlayer.addEventListener('ended', nextSong);

// Update progress bar & time
audioPlayer.addEventListener('timeupdate', (e) => {
    const { duration, currentTime } = e.srcElement;
    
    // Update progress bar width
    if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        progressContainer.style.setProperty('--progress', `${progressPercent}%`);
        
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        
        // Delay switching duration element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
    }

    // Calculate display for current time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
});

// Set progress on click
progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    
    if (duration) {
        audioPlayer.currentTime = (clickX / width) * duration;
    }
});

// Start the app
init();
