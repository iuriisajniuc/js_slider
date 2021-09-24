function Carousel() {
  this.container = document.querySelector("#carousel");

  this.slides = this.container.querySelectorAll(".slide");
  this.pauseBtn = this.container.querySelector("#pause");
  this.nextBtn = this.container.querySelector("#next");
  this.prevBtn = this.container.querySelector("#prev");
  this.controls = this.container.querySelectorAll(".controls");
  this.indicatorContainer = this.container.querySelector("#indicators");
  this.indicators = this.indicatorContainer.querySelectorAll(".indicator");

  this.SLIDES_COUNT = this.slides.length;
  this.FA_PAUSE = '<i class="far fa-pause-circle"></i>';
  this.FA_PLAY = '<i class="far fa-play-circle"></i>';
  this.CODE_LEFT_ARROW = "ArrowLeft";
  this.CODE_RIGHT_ARROW = "ArrowRight";
  this.CODE_SPACE = "Space";

  this.currentSlide = 0;
  this.isPlaying = true;
  this.interval = 2000;
  this.timerID = null;
  this.swipeStartX = null;
  this.swipeEndX = null;
}

Carousel.prototype = {
  _initControls() {
    const controls = document.createElement("div");
    this.container.appendChild(controls);
  },

  //   <div class="btn">
  //   <span class="controls" id="prev"><i class="far fa-angle-left"></i></span>
  //   <span class="controls" id="pause"><i class="far fa-pause-circle"></i></span>
  //   <span class="controls" id="next"><i class="far fa-angle-right"></i></span>

  // </div>

  _initListeners() {
    this.nextBtn.addEventListener("click", this.next.bind(this));
    this.prevBtn.addEventListener("click", this.prev.bind(this));
    this.pauseBtn.addEventListener("click", this.pausePlay.bind(this));
    this.indicatorContainer.addEventListener("click", this.indicate.bind(this));
    document.addEventListener("keydown", this.pressKey.bind(this));
    this.container.addEventListener("touchstart", this.swipeStart.bind(this));
    this.container.addEventListener("touchend", this.swipeEnd.bind(this));
  },

  goToSlide(n) {
    this.slides[this.currentSlide].classList.toggle("active");
    this.indicators[this.currentSlide].classList.toggle("active");
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
    this.slides[this.currentSlide].classList.toggle("active");
    this.indicators[this.currentSlide].classList.toggle("active");
  },

  goToNext() {
    this.goToSlide(this.currentSlide + 1);
  },

  prev() {
    this.goToSlide(this.currentSlide - 1);
    this.pause();
  },
  pause() {
    this.pauseBtn.innerHTML = this.FA_PLAY;
    this.isPlaying = false;
    clearInterval(this.timerID);
  },

  play() {
    this.pauseBtn.innerHTML = this.FA_PAUSE;
    this.isPlaying = true;
    this.timerID = setInterval(this.goToNext.bind(this), this.interval);
  },

  next() {
    this.goToNext();
    this.pause();
  },

  pausePlay() {
    this.isPlaying ? this.pause() : this.play();
  },

  indicate(e) {
    const target = e.target;

    if (target && target.classList.contains("indicator")) {
      this.pause();
      this.goToSlide(+target.getAttribute("id"));
    }
  },

  pressKey(e) {
    if (e.code === this.CODE_LEFT_ARROW) this.prev();
    if (e.code === this.CODE_RIGHT_ARROW) this.next();
    if (e.code === this.CODE_SPACE) this.pausePlay();
  },

  swipeStart(e) {
    this.swipeStartX = e.changedTouches[0].pageX;
  },

  swipeEnd(e) {
    this.swipeEndX = e.changedTouches[0].pageX;
    if (this.swipeEndX - this.swipeStartX < -100) this.next();
    if (this.swipeEndX - this.swipeStartX > 100) this.prev();
  },

  init() {
    this._initListeners();
    this.timerID = setInterval(this.goToNext.bind(this), this.interval);
    for (let i = 0; i < this.controls.length; i++) {
      this.controls[i].style.display = "flex";
    }
  },
};
