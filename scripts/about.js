gsap.registerPlugin(ScrollTrigger);
sessions = document.querySelectorAll(".section");
sessions.forEach((session) => {
  gsap.fromTo(
    session.children,
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
        trigger: session,
        start: "top 30%",
      },
    }
  );
});

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
