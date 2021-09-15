let slides = document.querySelectorAll(".slide");
let pauseButton = document.querySelector("#pause");
let nextButton = document.querySelector("#next");
let prevButton = document.querySelector("#prev");
let controls = document.querySelectorAll(".controls");
let indicatorContainer = document.querySelector("#indicators");
console.log(indicatorContainer);
let indicators = document.querySelectorAll(".indicator");
let currentSlide = 0;
let isPlaying = true;

function next() {
  goToSlide(currentSlide + 1);
}

function prev() {
  goToSlide(currentSlide - 1);
}

function goToSlide(n) {
  slides[currentSlide].className = "slide";
  indicators[currentSlide].className = "indicator";
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].className = "slide active";
  indicators[currentSlide].className = "indicator active";
}

function pause() {
  pauseButton.innerHTML = "Play";
  isPlaying = false;
  clearInterval(slideInterval);
}

function play() {
  pauseButton.innerHTML = "Pause";
  isPlaying = true;
  slideInterval = setInterval(next, 2000);
}

const pausePlay = () => (isPlaying ? pause() : play());
pauseButton.onclick = pausePlay;

nextButton.onclick = function () {
  next();
  pause();
};
prevButton.onclick = function () {
  prev();
  pause();
};
for (let i = 0; i < controls.length; i++) {
  controls[i].style.display = "flex";
}

indicatorContainer.onclick = function (e) {
  const target = e.target;
  if (target && target.classList.contains("indicator")) pause();
  goToSlide(+target.getAttribute("id"));
};
let slideInterval = setInterval(next, 2000);

function pressKey(e) {
  if (e.code === "ArrowLeft") prev();
  if (e.code === "ArrowRight") next();
  if (e.code === "Space") pausePlay();
  // if (e.code === 'ArrowLeft')
}

document.addEventListener("keydown", pressKey);
