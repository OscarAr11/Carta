const song = document.getElementById("song");

const record = document.getElementById("record");
const tonearm = document.getElementById("tonearm");

const playPauseBtn = document.getElementById("playPauseBtn");
const backBtn = document.getElementById("backBtn");
const volumeSlider = document.getElementById("volumeSlider");

let isPlaying = false;

song.volume = 0.5;

function playSong() {
    song.play();

    record.classList.add("playing");
    tonearm.classList.add("playing");

    playPauseBtn.textContent = "Ⅱ";
    isPlaying = true;
    function playSong() {
    song.play()
        .then(() => {
            record.classList.add("playing");
            tonearm.classList.add("playing");
            playPauseBtn.textContent = "Ⅱ";
            isPlaying = true;
        })
        .catch((error) => {
            console.error("No se pudo reproducir:", error);
        });
}
}

function pauseSong() {
    song.pause();

    record.classList.remove("playing");
    tonearm.classList.remove("playing");

    playPauseBtn.textContent = "▶";
    isPlaying = false;
}

playPauseBtn.addEventListener("click", () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

backBtn.addEventListener("click", () => {
    song.currentTime = 0;

    if (!isPlaying) {
        playSong();
    }
});

volumeSlider.addEventListener("input", () => {
    song.volume = volumeSlider.value;
});

song.addEventListener("ended", () => {
    pauseSong();
    song.currentTime = 0;
});