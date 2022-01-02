const items = document.querySelectorAll(".nav_item a");

items.forEach((item) => {
  const href = item.getAttribute("href");
  if (window.location.href.includes(href)) {
    item.classList.add("active");
  }
});
