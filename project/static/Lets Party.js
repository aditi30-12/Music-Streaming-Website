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
    name : "Gallan Goodiyan",
    artist : "Yashita Sharma,Farhan Akhtar,Sukhwinder Singh, ShankarEhsaanLoy",
    image : "https://www.pagalworld.pw/GpE34Kg9Gq/9704/thumb-dil-dhadakne-do-2015-mp3-songs11-300.jpg",
    path : "https://pwdown.com/9704/03%20Gallan%20Goodiyaan%20(Dil%20Dhadakne%20Do)%20Farhan%20Akhtar%20190Kbps.mp3"
  },
  
  {
    name : "Kar Gayi Chull",
    artist : "Badshah, Fazilpuria, Sukriti Kakar, Neha Kakkar",
    image : "https://www.pagalworld.pw/GpE34Kg9Gq/12990/thumb-kapoor-and-sons-2016-hindi-mp3-songs111-300.jpg",
    path : "https://pwdown.com/12990/01%20Kar%20Gayi%20Chull%20-%20Badshah%20190Kbps.mp3"
  },

  {
    name : "Dil Chori",
    artist : "Yo Yo Honey Singh, Simar Kaur, Ishers",
    image : "https://www.pagalworld.pw/GpE34Kg9Gq/14367/thumb-sonu-ke-titu-ki-sweety-mp3-songs-300.jpg",
    path : "https://pwdown.com/14367/variation/190K/Dil%20Chori%20-%20Sonu%20Ke%20Titu%20Ki%20Sweety.mp3"
  },

  {
    name : "Aankh Marey",
    artist : "Neha Kakkar, Mika Singh, Kumar Sanu , Tanishk Bagchi",
    image : "https://www.pagalworld.pw/GpE34Kg9Gq/14624/117875-aankh-marey-simmba-mp3-song-300.jpg",
    path : "https://pwdown.com/14624/variation/190K/Aankh%20Marey%20-%20Simmba.mp3"
  },

  {
    name : "High Heels",
    artist : "Yo Yo Honey Singh, Jaz Dhami",
    image : "https://img.pagalworld.icu/High%20Heels%20Te%20Nachche-1221-hd.jpg",
    path : "https://pwdown.com/8555/High%20Heels%20-%20Ki%20and%20Ka%20(Yo%20Yo%20Honey%20Singh)%20320Kbps.mp3"
  },

  {
    name : "Tamma Tamma Again",
    artist : "Bappi Lahiri, Anuradha Paudwal, Badshah, Tanishk Bagchi",
    image : "https://www.pagalworld.pw/GpE34Kg9Gq/14375/thumb-badrinath-ki-dulhania-2017-mp3-songs-300.jpg",
    path : "https://pwdown.com/14375/variation/190K/Tamma%20Tamma%20Again%20-%20Badrinath%20Ki%20Dulhania.mp3"
  },

  {
    name : "The Breakup Song",
    artist : "Arijit Singh, Badshah, Jonita Gandhi, Nakash Aziz , Pritam",
    image : "https://www.pagalworld.pw/GpE34Kg9Gq/11219/thumb-ae-dil-hai-mushkil-mp3-songs-album1-300.jpg",
    path : "https://pwdown.com/11219/The%20Breakup%20Song%20-%20190Kbps.mp3"
  },
  
  {
    name : "Bom Diggy Diggy",
    artist : "Jasmin Walia, Zack Knight",
    image : "https://www.pagalworld.pw/GpE34Kg9Gq/14367/thumb-sonu-ke-titu-ki-sweety-mp3-songs-300.jpg",
    path : "https://pwdown.com/14367/variation/190K/Bom%20Diggy%20Diggy%20-%20Sonu%20Ke%20Titu%20Ki%20Sweety.mp3"
  },

  {
    name : "Swag Se Swagat",
    artist : "Vishal Dadlani, Neha Bhasin , VishalShekhar",
    image : "https://www.pagalworld.pw/GpE34Kg9Gq/12831/thumb-tiger-zinda-hai-2017-mp3-songs111-300.jpg",
    path : "https://pwdown.com/12831/01%20Swag%20Se%20Swagat%20-%20Tiger%20Zinda%20Hai%20190Kbps.mp3"
  },

  {
    name : "Kamariya",
    artist : "Darshan Raval , DJ Chetas, Lijo George",
    image : "https://www.pagalworld.pw/GpE34Kg9Gq/14450/117075-04-kamariya-mitron-mp3-song-300.jpg",
    path : "https://pwdown.com/14450/variation/190K/04%20Kamariya%20-%20Mitron.mp3"
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