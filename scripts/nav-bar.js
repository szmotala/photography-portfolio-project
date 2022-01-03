const menu_container = document.querySelector(".menu-btn-container");

const header = document.querySelector(".header");

menu_container.addEventListener("click", () => {
  header.classList.toggle("active");
  menu_container.classList.toggle("active");
});
