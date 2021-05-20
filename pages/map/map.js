//theme toggle
const checkbox = document.querySelector("input[name=theme]");
let dark = false;
checkTheme();
checkbox.addEventListener("change", function () {
  if (this.checked) {
    trans();
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("dark-theme", "true");
  } else {
    trans();
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("dark-theme", "false");
  }
});

function checkTheme() {
  if (localStorage.getItem("dark-theme") == "true") {
    dark = true;
  } else {
    dark = false;
  }

  if (dark) {
    checkbox.checked = true;
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    checkbox.checked = false;
    document.documentElement.setAttribute("data-theme", "light");
  }
}
const trans = () => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 500);
};

//

//MAP//

let currentItem = 1;
const sliderItems = document.querySelectorAll(".choose-slider__border");
const mapSlider = document.querySelector(".choose-slider");
const container = document.querySelector(".choose-slider__flex");
const arrows = document.querySelectorAll(".choose-slider__arrow");
const left = document.querySelector(".choose-slider__left");
const right = document.querySelector(".choose-slider__right");
const input = document.querySelector('input[type="range"]');
const displayedValue = document.querySelector(".slider-navigation__value span");
const pins = document.querySelectorAll(".map__pin");
const map = document.querySelector(".map__container");
const track = document.querySelector(".choose-slider__items-container");
let position = 0;
let windowInnerWidth;
const button = document.querySelector(".choose__button");
let animal;
let moveIconsMode = false;
let margin = 0;

function widthCheck() {
  windowInnerWidth = window.innerWidth;
  if (Number(windowInnerWidth) <= 1670) {
    moveIconsMode = true;
  } else {
    moveIconsMode = false;
    track.style.marginLeft = `0px`;
  }
}
widthCheck();
window.addEventListener("resize", () => {
  widthCheck();
});
function prev() {
  sliderItems[currentItem].classList.remove("active");
  widthCheck();
  if (moveIconsMode) {
    if (currentItem >= 5) {
      margin += 139;
      track.style.marginLeft = `${margin}px`;
    }
  }

  if (currentItem > 0) {
    currentItem -= 1;
  } else {
    currentItem = sliderItems.length - 1;
    if (moveIconsMode) {
      margin = -139 * (sliderItems.length - 5);
      track.style.marginLeft = `${margin}px`;
    }
  }
  rangeValue();
  sliderItems[currentItem].classList.add("active");
  console.log(currentItem);
  pinCheck();
}

function next() {
  console.log(windowInnerWidth);
  sliderItems[currentItem].classList.remove("active");
  console.log(sliderItems.length);
  console.log(currentItem);
  if (windowInnerWidth <= 1670) {
    if (currentItem >= 4) {
      margin -= 139;
      track.style.marginLeft = `${margin}px`;
    }
  }

  if (currentItem < sliderItems.length - 1) {
    currentItem += 1;
  } else {
    currentItem = 0;
    margin = 0;
    track.style.marginLeft = `${margin}px`;
  }
  rangeValue();
  sliderItems[currentItem].classList.add("active");
  pinCheck();
}

function rangeValue() {
  input.value = currentItem + 1;
  displayedValue.innerHTML = `0${input.value}/`;
  if (currentItem > 3) {
    button.setAttribute("href", "");
  }
}

function pinCheck() {
  pins.forEach((pin) => {
    if (pin.getAttribute("data-pin") == currentItem) {
      pin.classList.add("active");
      animal = pin.getAttribute("title");
      button.setAttribute("href", `../zoos/${animal.toLowerCase()}.html`);
    } else {
      pin.classList.remove("active");
    }
  });
}

arrows.forEach((arrow) => {
  arrow.addEventListener("click", (e) => {
    if (e.currentTarget.classList.contains("choose-slider__left")) {
      prev();
    }
    if (e.currentTarget.classList.contains("choose-slider__right")) {
      next();
    }
  });
});

container.addEventListener("click", (e) => {
  if (e.target.classList.contains("choose-slider__img")) {
    sliderItems[currentItem].classList.remove("active");
    currentItem = Number(e.target.getAttribute("data-image"));
    sliderItems[currentItem].classList.add("active");
    pinCheck();
    rangeValue();
  }
});

input.addEventListener("input", (e) => {
  if (currentItem + 1 < e.target.value) {
    next();
  }
  if (currentItem + 1 > e.target.value) {
    prev();
  }
});

//pins

map.addEventListener("click", (e) => {
  if (e.target.classList.contains("part-of-pin")) {
    currentItem = Number(e.target.getAttribute("data-pin"));
    pins.forEach((pin) => {
      pin.classList.remove("active");
      if (pin.getAttribute("data-pin") == currentItem) {
        pin.classList.add("active");
        animal = pin.getAttribute("title");

        button.setAttribute("href", `../zoos/${animal.toLowerCase()}.html`);
      }
    });
    sliderItems.forEach((item) => {
      if (item.classList.contains("active")) {
        item.classList.remove("active");
      }
    });
    sliderItems[currentItem].classList.add("active");
    margin = 0;
    track.style.marginLeft = `${margin}px`;
  }
  rangeValue();
});
