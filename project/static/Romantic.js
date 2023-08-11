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
        name : "Tujhe Kitna Chahne Lage",
        artist : "Arijit Singh, Mithoon",
        image : "https://www.pagalworld.pw/GpE34Kg9Gq/14697/142750-tujhe-kitna-chahne-lage-kabir-singh-mp3-song-300.jpg",
        path : "https://pwdown.com/14697/variation/190K/Tujhe%20Kitna%20Chahne%20Lage%20-%20Kabir%20Singh.mp3"
    },

    {
      name : "Tum Hi Ho",
      artist : "Arijit Singh, Mithoon",
      image : "https://www.pagalworld.pw/GpE34Kg9Gq/12250/thumb-aashiqui-2-2013-mp3-songs11-300.jpg",
      path : "https://pwdown.com/12250/01%20Tum%20Hi%20Ho%20-%20Aashiqui%202%20(Arijit%20Singh)%20320Kbps.mp3"
    },

    {
      name : "Khairiyat Happy",
      artist : "Arijit Singh, Pritam",
      image : "https://www.pagalworld.pw/GpE34Kg9Gq/113422/143077-khairiyat-happy-chhichhore-mp3-song-300.jpg",
      path : "https://pwdown.com/113422/variation/190K/Khairiyat%20Happy%20-%20Chhichhore.mp3"
    },

    {
      name : "Duniyaa",
      artist : "Akhil, Dhvani Bhanushali , Abhijit Vaghani",
      image : "https://www.pagalworld.pw/GpE34Kg9Gq/14666/118596-duniyaa-luka-chuppi-mp3-song-300.jpg",
      path : "https://pwdown.com/14666/variation/190K/Duniyaa%20-%20Luka%20Chuppi.mp3"
    },

    {
      name : "Humnava Mere",
      artist : "Jubin Nautiyal , Rocky, Shiv",
      image : "https://www.pagalworld.pw/GpE34Kg9Gq/14276/116206-humnava-mere-jubin-nautiyal-mp3-song-300.jpg",
      path : "https://pwdown.com/14276/variation/190K/Humnava%20Mere%20-%20Jubin%20Nautiyal.mp3"
    },

    {
      name : "Haan Tu Hain",
      artist : "Emraan Hashmi",
      image : "https://www.pagalworld.pw/GpE34Kg9Gq/14156/thumb-emraan-hashmi-all-hit-mp3-songs-300.jpg",
      path : "https://pwdown.com/14156/variation/190K/Haan%20Tu%20Hain%20-%20Jannat%20320Kbps.mp3"
    },

    {
      name : "Jeene Laga Hoon",
      artist : "Atif Aslam, Shreya Ghoshal",
      image : "https://www.pagalworld.pw/GpE34Kg9Gq/112601/thumb-ramaiya-vastavaiya-2013-2-300.jpg",
      path : "https://pwdown.com/112601/01.%20Jeene%20Laga%20Hoon.mp3"
    },

    {
      name : "Tu Hi Haqeeqat",
      artist : "Javed Ali , Emraan Hashmi",
      image : "https://www.pagalworld.pw/GpE34Kg9Gq/113119/thumb-tum-mile-300.jpg",
      path : "https://pwdown.com/113119/03.%20Tu%20Hi%20Haqeeqat.mp3"
    },

    {
      name : "Tera Ban Jaunga",
      artist : "Tulsi Kumar, Akhil Sachdeva",
      image : "https://www.quirkybyte.com/wp-content/uploads/2019/06/2-23.jpeg",
      path : "https://pwdown.com/14697/variation/190K/Tera%20Ban%20Jaunga%20-%20Kabir%20Singh.mp3"
    },

    {
      name : "Bol Na Na Halke Halke",
      artist : "Rahat Fateh Ali Khan, Mahalakshmi Iyer",
      image : "https://i.ytimg.com/vi/UE054r4Xrso/maxresdefault.jpg",
      path : "https://pwdown.com/8879/Bol%20Na%20Halke%20Halke%20-%20Rahat%20Fateh%20Ali%20Khan%20320Kbps.mp3"
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