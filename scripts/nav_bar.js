const items = document.querySelectorAll(".nav_item a");

items.forEach((item) => {
  const href = item.getAttribute("href");
  console.log(window.location);
  if (window.location.href.includes(href)) {
    item.classList.add("active");
  } else if (window.location.pathname == "/" && href == "index.html") {
    item.classList.add("active");
  }
});
