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
    name: " Brown Kudi",
    artist: "Abeer Arora, Brown Munde",
    image: "https://www.pagalworld.pw/GpE34Kg9Gq/113510/146173-brown-kudi-abeer-arora-mp3-song-300.jpg",
    path: "https://pwdown.com/113510/Brown%20Kudi%20-%20Abeer%20Arora.mp3"
  },

  {
    name: "Fish Cut Suit mera",
    artist: "Miss Pooja",
    image: "https://www.pagalworld.pw/GpE34Kg9Gq/113510/146166-fish-cut-suit-mera-mp3-song-300.jpg",
    path: "https://pwdown.com/113510/Fish%20Cut%20Suit%20Mera.mp3"
  },
  {
    name: "Bijli Bijli",
    artist: "Harrdy Sindhu,B prak,Jaani",
    image: "https://www.pagalworld.pw/GpE34Kg9Gq/113515/146278-bijlee-bijlee-harrdy-sandhu-mp3-song-300.jpg",
    path: "https://pwdown.com/113515/Bijlee%20Bijlee%20-%20Harrdy%20Sandhu.mp3"
  },
  {
    name: "Lamborghini",
    artist: "Khan Bhaini, Shipra Goyal",
    image: "https://www.pagalworld.pw/GpE34Kg9Gq/113515/144820-lamborghini-khan-bhaini-mp3-song-300.jpg",
    path: "https://pwdown.com/113515/Lamborghini%20-%20Khan%20Bhaini.mp3",
  },
  {
    name: "Tenu lehenga",
    artist: "Zahrah S Khan, Jass Manak, Tanishk Bagchi",
    image: "https://www.pagalworld.pw/GpE34Kg9Gq/113580/146285-tenu-lehenga-satyameva-jayate-2-mp3-song-300.jpg",
    path: "https://pwdown.com/113580/Tenu%20Lehenga%20-%20Satyameva%20Jayate%202.mp3",
  },
  {
    name: "High Rated Gabru",
    artist: "Guru Randhawa",
    image: "https://pagalnew.com/coverimages/High-Rated-Gabru-Guru-Randhawa-500-500.jpg",
    path: "https://pagalnew.com/mp3-songs/punjabi-mp3-songs/high-rated-gabru-guru-randhawa-128-kbps-sound.mp3",
  },
  {
    name: "Gal Karke",
    artist: "Asees Kaur",
    image: "https://pagaliworld.com/siteuploads/thumb/sft7/3267_4.jpg",
    path: "https://pagaliworld.com/files/download/id/3267",
  },
  {
    name: " Laung Laachi",
    artist: "Mannat Noor, Gurmeet Singh",
    image: "https://www.pagalworld.pw/GpE34Kg9Gq/14671/118553-laung-laachi-mannat-noor-mp3-song-300.jpg",
    path: "https://pwdown.com/14671/Laung%20Laachi%20-%20Mannat%20Noor.mp3",
  },
  {
    name: " Sakhiyaan",
    artist: "Maninder Buttar, MixSingh, Babbu",
    image: "https://www.pagalworld.pw/GpE34Kg9Gq/9488/thumb-indipop-mp3-songs-2015-singles-300.jpg",
    path: "https://pwdown.com/14671/Sakhiyaan%20-%20Maninder%20Buttar.mp3",
  },
  {
    name: "Yaari",
    artist: "Nikk",
    image: "https://pagalsong.in/uploads//thumbnails/300x300/id3Picture_1619837923.jpg",
    path: "https://pagalsong.in/uploads/systemuploads/mp3/Yaari%20-%20Nikk/Yaari%20-%20Nikk%20Ft%20Avneet%20Kaur%20128%20Kbps.mp3",
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

(function() {
  (".heart").on("click", function() {
    (this).toggleClass("is-active");
  });
});

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}