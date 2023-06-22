const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const startedLink = document.querySelector(".started_link");
const navList = document.querySelector(".nav_list");
const logo = document.querySelector(".logo");
const navIcon = document.querySelector(".nav_icon");
const overlay = document.querySelector(".overlay");
const section1 = document.querySelector(".hero_section");
const questions = document.querySelector(".questions_container");
const showElements = document.querySelectorAll(".show_el");
const mediaQuery1 = window.matchMedia("(max-width: 62rem)");
const mediaQuery2 = window.matchMedia("(max-width: 35.13rem)");

// Listen to media query change
if (mediaQuery1.matches) {
  startedLink.classList.add("hidden");
  navList.insertAdjacentHTML(
    "beforeend",
    `<a href="https://bugbounty.createaforum.com/" class="nav_link started_link flex"
    >Try Bugbeat</a>`
  );
}

// Wait promise
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// nav icon's click event
const showNavList = function () {
  overlay.classList.toggle("hidden");
  wait(0.05).then(() => overlay.classList.toggle("overlay--active"));
  navIcon.classList.toggle("nav_icon--active");
  navList.classList.toggle("nav_list--active");
  header.classList.toggle("header--active");
};

navIcon.addEventListener("click", showNavList);
overlay.addEventListener("click", showNavList);

navList.addEventListener("click", function (e) {
  const clicked = e.target.closest(".nav_link");
  if (clicked && navList.classList.contains("nav_list--active")) {
    overlay.classList.add("hidden");
    overlay.classList.remove("overlay--active");
    navIcon.classList.remove("nav_icon--active");
    navList.classList.remove("nav_list--active");
    header.classList.remove("header--active");
  }
});

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) header.classList.add("sticky");
  else header.classList.remove("sticky");
};

// Slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

// FAQ
questions.addEventListener("click", function (e) {
  const activeQ = e.target.closest(".question_box");
  if (!activeQ) return;
  const icon = activeQ.querySelector(".plus");
  const txt = activeQ.querySelector(".answer");
  document.querySelectorAll(".question_box").forEach((q) => {
    if (q != activeQ) {
      q.querySelector(".answer").style.height = 0;
      q.classList.remove("question_box--active");
      q.querySelector(".plus").classList.add("fa-plus");
      q.querySelector(".plus").classList.remove("fa-minus");
    }
  });
  if (!activeQ.classList.contains("question_box--active")) {
    {
      txt.style.height = txt.scrollHeight + "px";
      activeQ.classList.add("question_box--active");
      activeQ.querySelector(".plus").classList.remove("fa-plus");
      activeQ.querySelector(".plus").classList.add("fa-minus");
    }
  } else {
    txt.style.height = 0;
    activeQ.classList.remove("question_box--active");
    activeQ.querySelector(".plus").classList.add("fa-plus");
    activeQ.querySelector(".plus").classList.remove("fa-minus");
  }
});

window.addEventListener("scroll", function () {
  showElements.forEach((element, index) => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementPosition < windowHeight) {
      if (element.classList.contains("show_el--left")) {
        element.classList.add("animate__fadeInLeft");
      } else element.classList.add("animate__fadeInTop");
    }
  });
});
