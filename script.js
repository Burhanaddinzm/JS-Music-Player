"use strict";

//Data
const songs = [
  {
    name: "glimpse-of-us",
    artist: "Joji",
    title: "Glimpse of Us",
    duration: "3:53",
  },
  {
    name: "fourth-of-july",
    artist: "Sufjan Stevens",
    title: "Fourth of July",
    duration: "4:38",
  },
  {
    name: "indigo-night",
    artist: "Tamino",
    title: "Indigo Night",
    duration: "4:14",
  },
  {
    name: "remembrance",
    artist: "Balmorhea",
    title: "Remembrance",
    duration: "5:59",
  },
  {
    name: "summertime-sadness",
    artist: "Lana del Rey",
    title: "Summertime Sadness",
    duration: "3:25",
  },
  {
    name: "i-know-i-am-not-the-only-one",
    artist: "Sam Smith",
    title: "I Know I'm Not The Only One",
    duration: "3:57",
  },
  {
    name: "amend",
    artist: "J^P^N",
    title: "Amend",
    duration: "1:44",
  },
  {
    name: "bored",
    artist: "Billie Eilish",
    title: "Bored",
    duration: "2:58",
  },
  {
    name: "daylight",
    artist: "Joji & Diplo",
    title: "Daylight",
    duration: "2:43",
  },
  {
    name: "go-away",
    artist: "Yot Club",
    title: "Go Away",
    duration: "2:41",
  },
  {
    name: "habits",
    artist: "Tove Lo",
    title: " Habits (Stay High - Hippie Sabotage Remix)",
    duration: "4:23",
  },
  {
    name: "homage",
    artist: "Mild High Club",
    title: "Homage",
    duration: "2:57",
  },
  {
    name: "k.",
    artist: "Cigarettes After Sex",
    title: "K.",
    duration: "5:17",
  },
  {
    name: "novocaine",
    artist: "The Unlikely Candidates",
    title: "Novocaine",
    duration: "4:06",
  },
  {
    name: "space-song",
    artist: "Beach House",
    title: "Space Song",
    duration: "5:20",
  },
  {
    name: "youngblood",
    artist: "5 Seconds Of Summer",
    title: "Youngblood",
    duration: "3:23",
  },
];

const songCount = document.getElementById("song-count");
const totalDuration = document.getElementById("total-duration");

const playlist = document.querySelector(".playlist");

const cover = document.querySelector("#cover img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const song = document.getElementById("song");

const previousBtn = document.getElementById("previous");
const playPauseBtn = document.getElementById("play-pause");
const nextBtn = document.getElementById("next");

const playPauseBtnIcon = document.querySelector("#play-pause img");

const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const durationBar = document.querySelector(".duration-bar");
const songDurationBar = document.getElementById("song-duration-bar");

const volumeBar = document.querySelector(".volume-bar");
const volume = document.getElementById("volume");

const volumeIconBar = document.querySelector(".volume-icon .bar");
const volumeIconImg = document.querySelector(".volume-icon img");

let index = 0;

let isPlaying = false;

const displayHeaderInfo = () => {
  songCount.textContent = `${songs.length} songs`;

  const allDurations = songs.map((song) => {
    const [minute, second] = song.duration.split(":");
    return minute * 60 + +second;
  });

  const totalSeconds = allDurations.reduce(
    (total, seconds) => (total += seconds),
    0
  );
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  totalDuration.textContent = `${String(hours).padStart(1, "0")}h ${String(
    minutes
  ).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;
};

const displayPlayList = () => {
  playlist.innerHTML = "";

  songs.forEach((song, i) => {
    const songName = song.name
      .split("-")
      .map((sName) => sName[0].toUpperCase() + sName.slice(1))
      .join(" ");

    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <div class="left-side">
        <span id="number">${i + 1}</span>
        <span id="${
          song.name === songs[index].name ? "active" : ""
        }" class="title">${songName}</span>
      </div>
      <span id="duration">${song.duration}</span>
    `;

    listItem.querySelector(".left-side").addEventListener("click", () => {
      index = i;
      displaySong();
      playSong();
      displayPlayList();
    });

    playlist.appendChild(listItem);
  });
};

const displaySong = () => {
  cover.src = `./assets/images/${songs[index].name}.jpeg`;
  title.textContent = songs[index].title;
  artist.textContent = songs[index].artist;
  song.src = `./assets/music/${songs[index].name}.mp3`;
  duration.textContent = songs[index].duration;
};

const playSong = () => {
  song.play();
  isPlaying = true;
  playPauseBtnIcon.src = `./assets/icons/pause.svg`;
};

const pauseSong = () => {
  song.pause();
  isPlaying = false;
  playPauseBtnIcon.src = `./assets/icons/play.svg`;
};

const nextSong = () => {
  index < songs.length - 1 ? index++ : (index = 0);
  displaySong();
  displayPlayList();
  playSong();
};

const previousSong = () => {
  index > 0 ? index-- : (index = songs.length - 1);
  displaySong();
  displayPlayList();
  playSong();
};

const updateVolume = () => {
  const currentVolume = song.volume;
  const newHeight = `${currentVolume * 100}%`;
  volume.style.height = newHeight;
};

playPauseBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", nextSong);
previousBtn.addEventListener("click", previousSong);

durationBar.addEventListener("click", (event) => {
  const clicked = event.offsetX;
  const totalWidth = durationBar.clientWidth;
  song.currentTime = (clicked / totalWidth) * song.duration;
});

song.addEventListener("timeupdate", () => {
  const { currentTime: cTime, duration } = song;
  const minutes = Math.floor(cTime / 60);
  const seconds = Math.floor(cTime % 60);
  currentTime.textContent = `${minutes}:${String(seconds).padStart(2, "0")}`;
  songDurationBar.style.width = `${(cTime / duration) * 100}%`;
  if (cTime === duration) nextSong();
});

volumeBar.addEventListener("click", (event) => {
  const clicked = event.offsetY;
  const totalHeight = volumeBar.clientHeight;
  song.volume = clicked / totalHeight;
  updateVolume();
});

volumeIconImg.addEventListener("click", () => {
  if (song.volume !== 0) {
    volumeIconBar.classList.remove("hidden");
    song.volume = 0;
  } else {
    volumeIconBar.classList.add("hidden");
    song.volume = 1;
  }
  updateVolume();
});

displaySong();
displayPlayList();
displayHeaderInfo();
updateVolume();