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
    name : "Tera Hone Laga Hoon",
    artist : "Atif Aslam, Alisha Chinoy ",
    image : "https://mymp3bhojpuri.in/siteuploads/thumb/c/4260_resize2x_130x130.webp",
    path : "https://pwdown.com/12054/Tera%20Hone%20Laga%20Hoon%20-%20Atif%20Aslam%20-%20320Kbps.mp3"
  },
  
  {
      name : "Mast Magan",
      artist : "Arijit Singh, Chinmayi",
      image : "https://www.pagalworld.us/_big/2-states-2014-250.jpg",
      path : "https://www.pagalworld.us/db/file.php?list=23104&kbps=128"
  },

  {
    name : "Tere Naina Maar Hi Daalenge",
    artist : "Shaan,Shreya Ghoshal,Shabab Sabri,SajidWajid,Amal Malik",
    image : "https://www.pagalworld.pw/GpE34Kg9Gq/8598/thumb-jai-ho-2014-mp3-songs-300.jpg",
    path : "https://pwdown.com/8598/02%20Tere%20Naina%20Maar%20Hi%20Daalenge%20-%20Jai%20Ho%20[PagalWorld.com].mp3"
},

{
    name : "Raabta",
    artist : "Arijit Singh, Joy",
    image : "https://www.pagalworld.pw/GpE34Kg9Gq/9043/thumb-soulful-voice-arijit-singh-mp3-songs-300.jpg",
    path : "https://pwdown.com/9043/19%20Raabta%20-%20Agent%20Vinod%20(Arijit%20Singh).mp3"
},

{
    name : "I Love You",
    artist : "Ash King, Clinton Cerejo",
    image : "https://pagalsong.in/uploads//thumbnails/300x300/id3Picture_1428852430.jpg",
    path : "https://www.pagalworld.us/db/file.php?list=17997&kbps=128"
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