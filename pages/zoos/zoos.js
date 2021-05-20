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

//Slider

const video = document.querySelector(".video");

const main = document.querySelector(".video__big");
video.addEventListener("click", (e) => {
  if (e.target.classList.contains("video__plug")) {
    const choose = e.target.nextElementSibling;
    newSrc = choose.getAttribute("src");
    oldSrc = main.getAttribute("src");
    main.setAttribute("src", newSrc);
    choose.setAttribute("src", oldSrc);
  }
});
