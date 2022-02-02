const images = document.querySelectorAll(".picture");
const img_window = document.querySelector(".close-box");
const prv_btn = document.querySelector(".prvs");
const next_btn = document.querySelector(".next");

const sections = document.querySelectorAll(".content");
const section_1 = sections[0].children;
const section_2 = sections[1].children;
const section_3 = sections[2].children;

let currIndex = 0;
let class_val;
let array;

let startPoint;
let endPoint;

const reg = new RegExp(
  "Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini",
  "i"
);
let device;

function closeImg() {
  closeImgAnim(".img-box", ".img-window");
}

function changeImg(direction) {
  currIndex += direction;
  if (currIndex < 0) {
    currIndex = array.length - 1;
  } else if (currIndex > array.length - 1) {
    currIndex = 0;
  }

  setDataFromImage(array[currIndex]);
}

function setDataFromImage(imageObj) {
  let newImg = document.querySelector(".img");
  newImg.src = imageObj.src;
  document.querySelector(".img__title").innerHTML =
    imageObj.getAttribute("data-title");
  document.querySelector(".img__desc").innerHTML =
    imageObj.getAttribute("data-desc");
}

function setEventsOnDesktop() {
  img_window.setAttribute("onclick", "closeImg()");

  prv_btn.setAttribute("onclick", "changeImg(-1)");
  next_btn.setAttribute("onclick", "changeImg(1)");
}

function setEventsOnMobile() {
  prv_btn.style.display = "none";
  next_btn.style.display = "none";
  img_window.removeAttribute("onclick");

  img_window.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      startPoint = e.touches.item(0);
    },
    false
  );

  img_window.addEventListener(
    "touchend",
    (e) => {
      endPoint = e.changedTouches.item(0);
      if (endPoint.pageX - startPoint.pageX > screen.width * 0.15) {
        changeImg(-1);
      } else if (endPoint.pageX - startPoint.pageX < -screen.width * 0.15) {
        changeImg(1);
      } else if (startPoint.pageY - endPoint.pageY > screen.height * 0.1) {
        closeImgAnimMobile(".img-box", ".img-window");
      }
    },
    false
  );
}

window.onload = () => {
  if (navigator.userAgent.match(reg)) {
    setEventsOnMobile();
  } else {
    setEventsOnDesktop();
  }

  images.forEach((image) => {
    image.addEventListener("click", () => {
      currIndex = Number(image.getAttribute("data-index"));
      class_val = image.parentElement.classList[1];

      switch (class_val) {
        case "s1":
          array = section_1;
          break;
        case "s2":
          array = section_2;
          break;
        case "s3":
          array = section_3;
          break;
      }
      setDataFromImage(image);
      if (navigator.userAgent.match(reg)) {
        openImgAnimMobile(".img-box", ".img-window");
      } else {
        openImgAnim(".img-box", ".img-window");
      }
    });
  });
};
