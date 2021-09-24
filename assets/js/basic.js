(function () {
  const container = document.querySelector("#carousel");

  const slides = container.querySelectorAll(".slide");
  const pauseBtn = container.querySelector("#pause");
  const nextBtn = container.querySelector("#next");
  const prevBtn = container.querySelector("#prev");
  const controls = container.querySelectorAll(".controls");
  const indicatorContainer = container.querySelector("#indicators");
  const indicators = indicatorContainer.querySelectorAll(".indicator");

  const SLIDES_COUNT = slides.length;
  const FA_PAUSE = '<i class="far fa-pause-circle"></i>';
  const FA_PLAY = '<i class="far fa-play-circle"></i>';

  let currentSlide = 0;
  let isPlaying = true;
  let interval = 2000;
  let timerID = null;
  let swipeStartX = null;
  let swipeEndX = null;

  function goToNext() {
    goToSlide(currentSlide + 1);
  }

  function prev() {
    goToSlide(currentSlide - 1);
    pause();
  }

  function goToSlide(n) {
    slides[currentSlide].className = "slide";
    indicators[currentSlide].className = "indicator";
    currentSlide = (n + SLIDES_COUNT) % SLIDES_COUNT;
    console.log(currentSlide);
    slides[currentSlide].className = "slide active";
    indicators[currentSlide].className = "indicator active";
  }

  function pause() {
    pauseBtn.innerHTML = FA_PLAY;
    isPlaying = false;
    clearInterval(timerID);
  }

  function play() {
    pauseBtn.innerHTML = FA_PAUSE;
    isPlaying = true;
    timerID = setInterval(goToNext, interval);
  }

  function next() {
    goToNext();
    pause();
  }

  const pausePlay = () => (isPlaying ? pause() : play());

  for (let i = 0; i < controls.length; i++) {
    controls[i].style.display = "flex";
  }

  function indicate(e) {
    const target = e.target;
    if (target && target.classList.contains("indicator")) pause();
    goToSlide(+target.getAttribute("id"));
  }

  function pressKey(e) {
    if (e.code === "ArrowLeft") prev();
    if (e.code === "ArrowRight") next();
    if (e.code === "Space") pausePlay();
  }

  function swipeStart(e) {
    swipeStartX = e.changedTouches[0].pageX;
  }
  function swipeEnd(e) {
    swipeEndX = e.changedTouches[0].pageX;
    if (swipeEndX - swipeStartX < -100) next();
    if (swipeEndX - swipeStartX > 100) prev();
  }

  function initListeners() {
    nextBtn.addEventListener("click", next);
    prevBtn.addEventListener("click", prev);
    pauseBtn.addEventListener("click", pausePlay);
    indicatorContainer.addEventListener("click", indicate);
    document.addEventListener("keydown", pressKey);
    container.addEventListener("touchstart", swipeStart);
    container.addEventListener("touchend", swipeEnd);
  }

  function init() {
    initListeners();
    timerID = setInterval(goToNext, interval);
  }

  init();
})();
