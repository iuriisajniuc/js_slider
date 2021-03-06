class Carousel {
  constructor(params) {
    const settings = {
      ...{
        containerID: "#carousel",
        slideID: ".slide",
        interval: 2000,
        isPlaying: true,
      },
      ...params,
    };

    this.container = document.querySelector(settings.containerID);
    this.slides = this.container.querySelectorAll(settings.slideID);
    this.isPlaying = settings.isPlaying;
    this.interval = settings.interval;

    this.SlideContainer = this.container.querySelector("#slides");
  }

  _initProps() {
    this.controls = this.container.querySelectorAll(".controls");

    this.SLIDES_COUNT = this.slides.length;
    this.CODE_LEFT_ARROW = "ArrowLeft";
    this.CODE_RIGHT_ARROW = "ArrowRight";
    this.CODE_SPACE = "Space";
    this.FA_PAUSE = '<i class="far fa-pause-circle"></i>';
    this.FA_PLAY = '<i class="far fa-play-circle"></i>';
    this.FA_PREV = '<i class="far fa-angle-left"></i>';
    this.FA_NEXT = '<i class="far fa-angle-right"></i>';

    this.currentSlide = 0;
  }

  _initControls() {
    const controls = document.createElement("div");

    const PREV = `<span class="control prev" id="prev">${this.FA_PREV}</span>`;
    const PAUSE = `<span  class="control pause-play" id="pause"> 
    <span id="fa-pause-icon">${this.FA_PAUSE}</span>
    <span id="fa-play-icon">${this.FA_PLAY}</span></i>
    </span>`;
    const NEXT = `<span  class="control next" id="next">${this.FA_NEXT}</span>`;

    controls.setAttribute("class", "btn");
    controls.innerHTML = PREV + PAUSE + NEXT;

    this.SlideContainer.append(controls);

    this.pauseBtn = this.container.querySelector("#pause");
    this.nextBtn = this.container.querySelector("#next");
    this.prevBtn = this.container.querySelector("#prev");

    this.pauseIcon = this.container.querySelector("#fa-pause-icon");
    this.playIcon = this.container.querySelector("#fa-play-icon");

    this.isPlaying
      ? (this.pauseIcon.style.opacity = 1)
      : (this.playIcon.style.opacity = 1);
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
      indicators.append(indicator);
    }

    this.SlideContainer.append(indicators);

    this.indContainer = this.container.querySelector(".indicators");
    this.indicators = this.container.querySelectorAll(".indicator");
  }

  _initListeners() {
    document.addEventListener("keydown", this._pressKey.bind(this));

    this.nextBtn.addEventListener("click", this.next.bind(this));
    this.prevBtn.addEventListener("click", this.prev.bind(this));
    this.pauseBtn.addEventListener("click", this.pausePlay.bind(this));
    this.indContainer.addEventListener("click", this._indicate.bind(this));
    this.container.addEventListener("mouseenter", this._pause.bind(this));
    this.container.addEventListener("mouseleave", this._play.bind(this));
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
    if (this.isPlaying) {
      this.pauseIcon.style.opacity = 0;
      this.playIcon.style.opacity = 1;
      this.isPlaying = false;
      clearInterval(this.timerID);
    }
  }

  _play() {
    if (!this.isPlaying) {
      this.pauseIcon.style.opacity = 1;
      this.playIcon.style.opacity = 0;
      this.isPlaying = true;
      this.timerID = setInterval(this._goToNext.bind(this), this.interval);
    }
  }

  _indicate(e) {
    const target = e.target;

    if (target && target.classList.contains("indicator")) {
      this._pause();
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
    if (this.isPlaying)
      this.timerID = setInterval(this._goToNext.bind(this), this.interval);
  }
}

export default Carousel;
