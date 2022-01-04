const images = document.querySelectorAll(".picture");
const img_window = document.querySelector(".close-box");
const prv_btn = document.querySelector(".prvs");
const next_btn = document.querySelector(".next");

const wedding_imgs = document.querySelector(".content.wedding").children;
const paris_imgs = document.querySelector(".content.paris").children;

let currIndex;
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
  img_window.removeAttribute("onclick");
  closeImgAnim(".img-box", ".img-window");
}

function changeImg(direction) {
  currIndex += direction;
  if (currIndex < 0) {
    currIndex = array.length - 1;
    console.log(array.length - 1);
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
      if (endPoint.pageX - startPoint.pageX > screen.width / 3) {
        changeImg(-1);
      } else if (endPoint.pageX - startPoint.pageX < -screen.width / 3) {
        changeImg(1);
      } else if (startPoint.pageY - endPoint.pageY > screen.height / 4) {
        closeImg();
      }
    },
    false
  );
}

images.forEach((image) => {
  image.addEventListener("click", () => {
    currIndex = Number(image.getAttribute("data-index"));

    class_val = image.parentElement.classList[1];

    switch (class_val) {
      case "paris":
        array = paris_imgs;
        break;
      case "wedding":
        array = wedding_imgs;
        break;
    }
    setDataFromImage(image);
    if (navigator.userAgent.match(reg)) {
      console.log("hello android");
      setEventsOnMobile();
    } else {
      console.log("hello desktop");
      setEventsOnDesktop();
    }
    openImgAnim(".img-box", ".img-window");
  });
});
