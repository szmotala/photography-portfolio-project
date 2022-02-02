gsap.registerPlugin(ScrollTrigger);
sections = document.querySelectorAll(".section:not(.about-me)");
elements = document.querySelector(".about-me div:not(.background_wrap");
sections.forEach((section) => {
  gsap.fromTo(
    section.children,
    {
      opacity: 0,
      y: "+=50",
    },
    {
      y: 0,
      opacity: 1,
      stagger: 0.3,
      duration: 1,
      scrollTrigger: {
        scroller: ".content",
        trigger: section,
        start: "top 30%",
      },
    }
  );
});

gsap.fromTo(
  elements,
  {
    opacity: 0,
    y: "+=50",
  },
  {
    y: 0,
    opacity: 1,
    stagger: 0.3,
    duration: 1,
    scrollTrigger: {
      scroller: ".content",
      trigger: document.querySelector(".about-me"),
      start: "top 30%",
    },
  }
);

const activities = document.querySelectorAll(".activity-div");

activities.forEach((activity) => {
  activity.addEventListener("mouseover", () => {
    const desc = activity.getAttribute("data-desc");
    const name = activity.getAttribute("data-title");
    document.querySelector(".desc-activity-title").innerHTML = name;
    document.querySelector(".desc-activity").innerHTML = desc;
  });
});

activities.forEach((activity) => {
  activity.addEventListener("mouseleave", () => {
    document.querySelector(".desc-activity-title").innerHTML = "";
    document.querySelector(".desc-activity").innerHTML = "";
  });
});

const scroll_btn = document.querySelector(".scroll-down");
scroll_btn.addEventListener(
  "click",
  () => {
    document.querySelector(".about-me").scrollIntoView();
  },
  false
);
