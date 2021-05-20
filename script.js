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

///watch slider

const container = document.querySelector(".slider1__container");
const track = document.querySelector(".slider1__collection");
const items1 = document.querySelectorAll(".slider1__item");
const images = document.querySelectorAll(".slider1__image");
let position = 0;
let itemNumer = 1;
const info = document.querySelectorAll(".slider1__slider-info");
console.log(info);

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("slider1__image") &&
    e.target.getAttribute("data-number") < itemNumer
  ) {
    prev(e);
    infoHandle();
  } else if (
    e.target.classList.contains("slider1__image") &&
    e.target.getAttribute("data-number") > itemNumer
  ) {
    next(e);
    infoHandle();
  }
});

function prev(e) {
  images[itemNumer].classList.remove("active");
  e.target.classList.add("active");
  position += 186;
  itemNumer = e.target.getAttribute("data-number");
  track.style.transform = `translateX(${position}px)`;
  rangeValue1();
}

function next(e) {
  let n = e.target.getAttribute("data-number") - itemNumer;
  images[itemNumer].classList.remove("active");
  e.target.classList.add("active");
  position -= 186 * n;
  itemNumer = e.target.getAttribute("data-number");
  track.style.transform = `translateX(${position}px)`;
  rangeValue1();
}

function infoHandle() {
  info.forEach((i) => {
    if (i.classList.contains("active")) {
      i.classList.remove("active");
    }
    if (i.getAttribute("data-info") == itemNumer) {
      i.classList.add("active");
      console.log(i.getAttribute("data-info"));
      console.log(itemNumer);
    }
  });
}

//watch navigation

const elem1 = document.querySelectorAll('input[type="range"]')[0];
console.log(elem1);
let rangeValue1 = function () {
  elem1.value = Number(itemNumer) + 1;
  const target1 = document.querySelectorAll(
    ".slider-navigation__value span"
  )[0];
  target1.innerHTML = `0${elem1.value}/`;
};

elem1.addEventListener("input", (e) => {
  if (itemNumer + 1 < elem1.value) {
    images[itemNumer].classList.remove("active");
    images[elem1.value - 1].classList.add("active");
    itemNumer++;
    position -= 186;
    track.style.transform = `translateX(${position}px)`;
    infoHandle();
  }
  if (itemNumer + 1 > elem1.value) {
    images[itemNumer].classList.remove("active");
    images[elem1.value - 1].classList.add("active");
    itemNumer--;
    position += 186;
    track.style.transform = `translateX(${position}px)`;
    infoHandle();
  }

  rangeValue1();
});

//pets in zoo
const elem = document.querySelectorAll('input[type="range"]')[2];

let items = document.querySelectorAll(".pets__item");
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener("animationend", function () {
    this.classList.remove("active", direction);
  });
}

function showItem(direction) {
  items[currentItem].classList.add("next", direction);
  items[currentItem].addEventListener("animationend", function () {
    this.classList.remove("next", direction);
    this.classList.add("active");
    isEnabled = true;
  });
}

function nextItem(n) {
  hideItem("to-left");
  changeCurrentItem(n + 1);
  showItem("from-right");
  rangeValue();
}

function previousItem(n) {
  hideItem("to-right");
  changeCurrentItem(n - 1);
  showItem("from-left");
  rangeValue();
}

document.querySelector(".arrow-left").addEventListener("click", function () {
  if (isEnabled) {
    previousItem(currentItem);
    console.log(currentItem);
  }
});

document.querySelector(".arrow-right").addEventListener("click", function () {
  if (isEnabled) {
    nextItem(currentItem);
    console.log(currentItem);
  }
});

//pets in zoo

//pets in zoo navigation

let rangeValue = function (e) {
  if (!isEnabled) {
    elem.setAttribute("disabled", true);
  }
  items[currentItem].addEventListener("animationend", function () {
    elem.removeAttribute("disabled");
  });
  elem.value = currentItem + 1;
  const target = document.querySelectorAll(".slider-navigation__value span")[2];
  target.innerHTML = `0${elem.value}/`;
};

elem.addEventListener("input", (e) => {
  if (elem.value > currentItem + 1 && isEnabled) {
    nextItem(currentItem);
  }
  if (elem.value < currentItem + 1 && isEnabled) {
    previousItem(currentItem);
  }
  console.log(currentItem);
});
