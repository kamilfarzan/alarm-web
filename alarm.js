const TIME = {
  time: "",
};
const sound = new Audio(
  "https://www.freespecialeffects.co.uk/soundfx/animals/duck1.wav"
);
sound.loop = true;

const clockDiv = document.getElementById("clock");
const ampmDiv = document.getElementById("ampm-clock");

const currentTime = setInterval(() => {
  const date = new Date();
  let hours = giveHours(date.getHours());
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = date.getHours() < 12 ? "AM" : "PM";

  // if (hours == 00) {
  //   hours = 12;
  // } else {
  //   hours = hours;
  // }

  clockDiv.textContent =
    addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds) + " ";
  ampmDiv.textContent = ampm;

  TIME.time = clockDiv.textContent + ampmDiv.textContent;
}, 1000);

function addZero(time) {
  const ans = time < 10 ? "0" + time : time;
  return ans.length > 2 ? ans.slice(1, ans.length) : ans;
}

function alarmSet() {
  const hr = document.getElementById("alarmhrs");
  const min = document.getElementById("alarmmins");
  const sec = document.getElementById("alarmsecs");
  const ap = document.getElementById("ampm");
  const check = document.querySelector(".check");
  let selectedHour = hr.value;
  let selectedMin = min.value;
  let selectedSec = sec.value;
  let selectedAP = ap.options[ap.selectedIndex].value;
  selectedHour == "" ? (selectedHour = "12") : selectedHour;
  selectedMin == "" ? (selectedMin = "00") : selectedMin;
  selectedSec == "" ? (selectedSec = "00") : selectedSec;

  let alarmTime =
    addZero(selectedHour) +
    ":" +
    addZero(selectedMin) +
    ":" +
    addZero(selectedSec) +
    " " +
    selectedAP;
  console.log("alarmTime:" + alarmTime);

  document.getElementById("alarmhrs").disabled = true;
  document.getElementById("alarmmins").disabled = true;
  document.getElementById("alarmsecs").disabled = true;
  document.getElementById("ampm").disabled = true;

  check.textContent = "Alarm Set for " + alarmTime;
  check.classList.add("active");

  setInterval(() => {
    if (alarmTime == TIME.time) {
      sound.play();
    }
  }, 1000);
}

function alarmClear() {
  document.getElementById("alarmhrs").disabled = false;
  document.getElementById("alarmmins").disabled = false;
  document.getElementById("alarmsecs").disabled = false;
  document.getElementById("ampm").disabled = false;

  document.querySelector(".check").classList.remove("active");

  sound.pause();
}

function giveHours(hour) {
  if (hour == 0) {
    return 12;
  } else if (hour < 12) {
    return hour;
  } else {
    return hour - 12;
  }
}
