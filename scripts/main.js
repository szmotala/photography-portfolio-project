const images = document.querySelectorAll(".picture");
const img_window = document.querySelector(".close-box");
const prv_btn = document.querySelector(".prvs");
const next_btn = document.querySelector(".next");

const newImg = document.querySelector(".img");
const sections = document.querySelectorAll(".content");
const section_1 = sections[0].children;
const section_2 = sections[1].children;
const section_3 = sections[2].children;

let currIndex = 0;
let class_val;
let array;

let startPoint;
let isOpen = false;
let scalingState = false;
let changingState = false;

const reg = new RegExp(
  "Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini",
  "i"
);
let device;

function closeImg() {
  closeImgAnim(".img-box", ".img-window");
  isOpen = false;
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
  newImg.src = imageObj.src;
  document.querySelector(".img__title").innerHTML =
    imageObj.getAttribute("data-title");
  document.querySelector(".img__desc").innerHTML =
    imageObj.getAttribute("data-desc");
}

function setEventsOnDesktop() {
  window.addEventListener("keydown", function (event) {
    if (event.keyCode == "27" && isOpen === true) {
      closeImg();
    }
  });
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

      if (e.touches.length > 1) {
        scalingState = true;
        changingState = false;
      } else {
        changingState = true;
        scalingState = false;
      }
      startPoint = e.touches.item(0);
    },
    false
  );

  img_window.addEventListener("touchmove", (e) => {
    if (scalingState === true && e.touches.length > 1) {
      newImg.style.transition = "none";

      let scale = Math.hypot(
        (e.touches[0].pageX - e.touches[1].pageX) / (window.innerWidth / 4),
        (e.touches[0].pageY - e.touches[1].pageY) / (window.innerHeight / 4)
      );

      if (scale > 1) {
        let x =
          window.innerWidth / 2 -
          e.touches[0].pageX +
          (window.innerWidth / 2 - e.touches[1].pageX);
        let y =
          window.innerHeight / 2 -
          e.touches[0].pageY +
          (window.innerHeight / 2 - e.touches[1].pageY);

        newImg.style.transform = `translate(${x / 2 + window.pageXOffset}px, ${
          y / 2 + window.pageYOffset
        }px) scale(${scale})`;
      }
    }
  });

  img_window.addEventListener(
    "touchend",
    (e) => {
      if (changingState === true) {
        let endPoint = e.changedTouches.item(0);
        if (endPoint.pageX - startPoint.pageX > screen.width * 0.15) {
          changeImg(-1);
        } else if (endPoint.pageX - startPoint.pageX < -screen.width * 0.15) {
          changeImg(1);
        } else if (startPoint.pageY - endPoint.pageY > screen.height * 0.1) {
          closeImgAnimMobile(".img-box", ".img-window");
          isOpen = false;
          singleTouch = false;
        }
      } else {
        newImg.style.transition = "all 0.5s";
        newImg.style.transform = "scale(1)";
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
      isOpen = true;
    });
  });
};
