let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "Dil To Pagal Hai",
    artist: "Udit Narayan, Lata Mangeshkar",
    image: "https://pagalsong.in/uploads//thumbnails/300x300/dil_to_pagal_hai.jpg",
    path: "https://pagalsong.in/uploads/systemuploads/mp3/Dil%20To%20Pagal%20Hai/Dil%20To%20Pagal%20Hai.mp3"
  },
  {
    name: "Bade Acche Lagte Hai",
    artist: " ",
    image: "https://www.pagalworld.pw/GpE34Kg9Gq/110367/thumb-balika-badhu-300.jpg",
    path: "https://pwdown.com/110367/02.%20Bade%20Acche%20Lagte%20Hai.mp3"
  },
  {
    name: "Phoolon Ka Taron Ka ",
    artist: "Kishor Kumar",
    image: "https://www.pagalworld.pw/GpE34Kg9Gq/111213/thumb-hare-rama-hare-krishna-1971-300.jpg",
    path: "https://pwdown.com/111213/08.%20Phoolon%20Ka%20Taron%20Ka%20-%20Kishore%20Kumar.mp3",
  },
  {
    name: "Dil Hai Ki Manta Nahin",
    artist: "Anuradha Paudwal, Kumar Sanu",
    image: "https://pagalfree.com/images/128Dil%20Hai%20Ki%20Manta%20Nahin%20-%201%20-%20Dil%20Hai%20Ke%20Manta%20Nahin%20128%20Kbps.jpg",
    path: "https://pagalfree.com/musics/128-Dil%20Hai%20Ki%20Manta%20Nahin%20-%201%20-%20Dil%20Hai%20Ke%20Manta%20Nahin%20128%20Kbps.mp3",
  },
  {
    name: "Ladki Badi Anjani Hai",
    artist: " Alka Yagnik, Kumar Sanu",
    image: "https://www.pagalworld.us/_big/kuch-kuch-hota-hai-1998-250.jpg",
    path: "https://cdn.pagalworld.us/songs/new/128/08%20-%20Ladki%20Badi%20Anjaani%20Hai%20-%20PagalSongs.com.mp3",
  },
  {
    name:"Sona Kitna Sona Hai",
    artist: "Udit Narayan,Poornima",
    image: "https://www.pagalworld.pw/GpE34Kg9Gq/111245/thumb-hero-no1-300.jpg",
    path: "https://pwdown.com/111245/01.%20Sona%20Kitna%20Sona%20Hai.mp3",
  },
  {
    name:"Mehndi Laga Ke Rakhna",
    artist: "Lata Mangeshkar, Udit Narayan",
    image: "https://pagalsong.in/uploads//thumbnails/300x300/id3Picture_185937450.jpg",
    path: "https://pagalsong.in/uploads/systemuploads/mp3/Dilwale%20Dulhania%20Le%20Jayenge/Mehndi%20Laga%20Ke%20Rakhna.mp3",
  },
  {
    name:"Lo Chali Main",
    artist: "Lata Mangeshkar",
    image: "https://www.pagalworld.pw/GpE34Kg9Gq/111291/thumb-hum-aapke-hain-kaun-300.jpg",
    path: "https://pwdown.com/111291/13.%20Lo%20Chali%20Main.mp3",
  },
  {
    name:"Sirf Tum",
    artist: "Anuradha Paudwal",
    image: "https://pagalsong.in/uploads//thumbnails/300x300/sirf_tum.jpg",
    path: "https://pagalsong.in/uploads/systemuploads/mp3/Sirf%20Tum/Sirf%20Tum%20-%201%20-%20Sirf%20Tum%20128%20Kbps.mp3",
  },
  {
    name:" Kitna Haseen Chehra",
    artist: "Kumar Sanu",
    image: "https://www.pagalworld.pw/GpE34Kg9Gq/12460/thumb-alka-yagnik-n-kumar-sanu-hits-mp3-songs-300.jpg",
    path: "https://pwdown.com/12460/Kitna%20Haseen%20Chehra%20-%20Dilwale%20320Kbps.mp3",
  },
];

/*function random_bg_color() {

  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}*/

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}



function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}