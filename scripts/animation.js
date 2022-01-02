function closeImgAnim(object, parent) {
  gsap.fromTo(
    [object, ".next", ".prvs"],
    {
      scaleX: 1,
    },
    {
      scaleX: 0,
      duration: 0.5,
    }
  );
  gsap.set([parent, ".next", ".prvs"], {
    visibility: "hidden",
    delay: 0.5,
  });
}

function openImgAnim(object, parent) {
  gsap.set([parent, ".next", ".prvs"], {
    visibility: "visible",
  });
  gsap.fromTo(
    [object, ".next", ".prvs"],
    {
      scaleX: 0,
    },
    {
      scaleX: 1,
      duration: 0.5,
    }
  );
}

gsap.registerPlugin(ScrollTrigger);
sessions = document.querySelectorAll(".photo-session");
sessions.forEach((session) => {
  gsap.fromTo(
    session.children,
    {
      opacity: 0,
      y: "+=30",
    },
    {
      y: 0,
      opacity: 1,
      stagger: 0,
      duration: 1,
      scrollTrigger: {
        trigger: session,
        start: "top 90%",
      },
    }
  );
});
