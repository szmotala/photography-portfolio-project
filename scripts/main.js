const images = document.querySelectorAll(".picture");
const img_window = document.querySelector(".close-box");
const prv_btn = document.querySelector(".prvs");
const next_btn = document.querySelector(".next");
let currIndex;
let class_val;
let array;

const wedding_imgs = document.querySelector(".content.wedding").children;
const paris_imgs = document.querySelector(".content.paris").children;

images.forEach((image) => {
  image.addEventListener("click", () => {
    currIndex = Number(image.getAttribute("data-index"));

    img_window.setAttribute("onclick", "closeImg()");

    setDataFromImage(image);

    class_val = image.parentElement.classList[1];

    switch (class_val) {
      case "paris":
        array = paris_imgs;
        break;
      case "wedding":
        array = wedding_imgs;
        break;
    }

    prv_btn.setAttribute("onclick", "changeImg(-1)");
    next_btn.setAttribute("onclick", "changeImg(1)");
    openImgAnim(".img-box", ".img-window");
  });
});

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
