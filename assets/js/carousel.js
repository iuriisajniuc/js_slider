class Carousel {
  constructor(containerID = "#carousel", slideID = ".slide") {
    this.container = document.querySelector(containerID);
    this.slides = this.container.querySelectorAll(slideID);
  }

  _initProps() {
    this.controls = this.container.querySelectorAll(".controls");

    this.SLIDES_COUNT = this.slides.length;
    this.FA_PAUSE = '<i class="far fa-pause-circle"></i>';
    this.FA_PLAY = '<i class="far fa-play-circle"></i>';
    this.CODE_LEFT_ARROW = "ArrowLeft";
    this.CODE_RIGHT_ARROW = "ArrowRight";
    this.CODE_SPACE = "Space";

    this.currentSlide = 0;
    this.isPlaying = true;
    this.interval = 2000;
  }

  _initControls() {
    const controls = document.createElement("div");

    const PREV =
      '<span style ="display:flex" class="controls" id="prev"><i class="far fa-angle-left"></i></span>';
    const PAUSE =
      '<span style ="display:flex" class="controls" id="pause"><i class="far fa-pause-circle"></i></span>';
    const NEXT =
      '<span style ="display:flex" class="controls" id="next"><i class="far fa-angle-right"></i></span>';

    controls.setAttribute("class", "btn");
    controls.innerHTML = PREV + PAUSE + NEXT;

    this.container.appendChild(controls);

    this.pauseBtn = this.container.querySelector("#pause");
    this.nextBtn = this.container.querySelector("#next");
    this.prevBtn = this.container.querySelector("#prev");
    // for (let i = 0; i < this.controls.length; i++) {
    //   this.controls[i].style.display = "flex";
    // }
  }

  _initIndicators() {
    const indicators = document.createElement("div");

    indicators.setAttribute("class", "indicators");
    for (let i = 0, n = this.SLIDES_COUNT; i < n; i++) {
      const indicator = document.createElement("div");
      indicator.setAttribute("class", "indicator");
      indicator.setAttribute("id", `${i}`);
      i === 0 && indicator.classList.add("active");
      indicators.appendChild(indicator);
    }

    this.container.appendChild(indicators);

    this.indContainer = this.container.querySelector(".indicators");
    this.indicators = this.container.querySelectorAll(".indicator");
  }

  _initListeners() {
    this.nextBtn.addEventListener("click", this.next.bind(this));
    this.prevBtn.addEventListener("click", this.prev.bind(this));
    this.pauseBtn.addEventListener("click", this.pausePlay.bind(this));
    this.indContainer.addEventListener("click", this._indicate.bind(this));
    document.addEventListener("keydown", this._pressKey.bind(this));
  }

  _goToSlide(n) {
    this.slides[this.currentSlide].classList.toggle("active");
    this.indicators[this.currentSlide].classList.toggle("active");
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
    this.slides[this.currentSlide].classList.toggle("active");
    this.indicators[this.currentSlide].classList.toggle("active");
  }

  _goToNext() {
    this._goToSlide(this.currentSlide + 1);
  }

  _pause() {
    this.pauseBtn.innerHTML = this.FA_PLAY;
    this.isPlaying = false;
    clearInterval(this.timerID);
  }

  _play() {
    this.pauseBtn.innerHTML = this.FA_PAUSE;
    this.isPlaying = true;
    this.timerID = setInterval(this._goToNext.bind(this), this.interval);
  }

  _indicate(e) {
    const target = e.target;

    if (target && target.classList.contains("indicator")) {
      this.pause();
      this._goToSlide(+target.getAttribute("id"));
    }
  }

  _pressKey(e) {
    if (e.code === this.CODE_LEFT_ARROW) this.prev();
    if (e.code === this.CODE_RIGHT_ARROW) this.next();
    if (e.code === this.CODE_SPACE) this.pausePlay();
  }

  prev() {
    this._goToSlide(this.currentSlide - 1);
    this._pause();
  }

  next() {
    this._goToNext();
    this._pause();
  }

  pausePlay() {
    this.isPlaying ? this._pause() : this._play();
  }

  init() {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListeners();
    this.timerID = setInterval(this._goToNext.bind(this), this.interval);
  }
}
