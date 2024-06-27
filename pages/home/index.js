// Animation functions
import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* The following plugins are Club GSAP perks */
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger,DrawSVGPlugin,ScrollSmoother,SplitText);


const animateHeading = (className, tl) => {
  var split = new SplitText(className, { type: "lines" });
  var lines = split.lines;
  tl.from(
    lines,
    {
      opacity: 0,
      stagger: 0.1,
      duration: 3,
    },
    0,
  );
};

const animateText = (className, tl) => {
  var split = new SplitText(className, { type: "lines" });
  var lines = split.lines;
  tl.from(
    lines,
    {
      opacity: 0,
      y: "100%",
      duration: 2,
      stagger: 0.2,
      ease: "power3.out",
    },
    0,
  );
};

const animateElement = (className, tl) => {
  tl.from(
    className,
    {
      opacity: 0,
      y: "100%",
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    },
    0,
  );
};

const animateImage = (className, tl) => {
  var element = document.querySelectorAll(className);
  tl.from(
    element,
    {
      opacity: 0,
      stagger: 0.1,
      duration: 1.5,
      ease: "power2.in",
    },
    0,
  );
  tl.from(
    element,
    {
      y: "5%",
      duration: 3,
      stagger: 0.1,
      ease: "power2.out",
    },
    0,
  );
};

// use a script tag or an external JS file
document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(SplitText);
  gsap.registerPlugin(ScrollSmoother);
  gsap.registerPlugin(Observer);

  ScrollSmoother.create({
    smooth: 2,
    effects: true,
  });

  // Найти все элементы с классами "w-background-video" или "w-background-video-atom"

  let mobileIgnore = gsap.matchMedia();
  // Desktop only
  //---------------------------------------------------------------------//
  mobileIgnore.add("(min-width: 480px)", () => {
    console.log("desktop work!");
    // Найти все элементы с классом .video
    const videoElements = document.querySelectorAll(".video");

    // Проходимся по всем найденным элементам
    videoElements.forEach(function (element) {
      // Найти видео внутри текущего элемента
      var video = element.querySelector("video");

      // Проверить, что видео существует
      if (video) {
        // Останавливаем видео по умолчанию и добавляем класс "grayscale"
        video.pause();
        element.classList.add("grayscale");

        // Добавляем обработчики событий для наведения и ухода курсора
        element.addEventListener("mouseenter", function () {
          element.classList.remove("grayscale");
          video.play();
        });

        element.addEventListener("mouseleave", function () {
          video.pause();
          element.classList.add("grayscale");
        });
      }
    });
    // Create ScrollTrigger for pinning
    ScrollTrigger.create({
      trigger: ".discover_container",
      start: "top top",
      end: "bottom bottom",
      pin: ".discover_section-scroll",
    });
    // Create the timeline for height changes
    const discoverChangeTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".discover_container",
        start: "center center",
        end: "bottom bottom",
        scrub: true,
        // markers: true,
        onEnter: () => {
          gsap.to("#section1 .discover_wrapper", {
            opacity: 0,
            duration: 1,
            ease: "power2",
          });
          gsap.to("#section1", {
            height: "0vh",
            duration: 1,
            ease: "power2",
          });
          gsap.to("#section2 .discover_wrapper", {
            opacity: 1,
            duration: 1,
            ease: "power2",
          });
          gsap.to("#section2", {
            height: "100vh",
            duration: 1,
            ease: "power2",
          });
        },
        onLeaveBack: () => {
          gsap.to("#section1 .discover_wrapper", {
            opacity: 1,
            duration: 1,
            ease: "power2",
          });
          gsap.to("#section1", {
            height: "100vh",
            duration: 1,
            ease: "power2",
          });
          gsap.to("#section12 .discover_wrapper", {
            opacity: 0,
            duration: 1,
            ease: "power2",
          });
          gsap.to("#section2", { height: "0vh", duration: 1, ease: "power2" });
        },
      },
    });
    return;
  });

  //-----------------------------------------------//
  //mobile only

  // gsap code here!

  // Hero animate loading

  const heroTl = gsap.timeline({ paused: true, delay: 0.4 });
  heroTl.to('[animate="reveral-effect-line"]', {
    opacity: 1,
    duration: 1.5,
    stagger: 0.2,
    ease: "power3.inOut",
  });
  heroTl.to(
    '.section_hero [animate="reveal-effect-text"]',
    {
      opacity: 1,
      delay: 1,
      y: "0%",
      duration: 2,
      stagger: 0.3,
      ease: "power3.out",
    },
    0,
  );
  heroTl.play();

  // section_chairman animate

  const chairManTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section_chairman",
      start: "top 60%",
      end: "bottom center",
    },
  });

  animateImage('.section_chairman [animate="image"]', chairManTl);
  animateHeading('.section_chairman [animate="reveal-heading"]', chairManTl);
  animateText('.section_chairman [animate="reveal-effect-text"]', chairManTl);
  animateElement(
    '.section_chairman [animate="reveal-effect-element"]',
    chairManTl,
  );

  const disctoverTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section_discover",
      start: "top 30%",
      end: "bottom bottom",
    },
  });
  animateHeading('.section_discover [animate="reveal-heading"]', disctoverTl);
  animateElement(
    '.section_discover [animate="reveal-effect-element"]',
    disctoverTl,
  );
  animateText('.section_discover [animate="reveal-effect-t"]', disctoverTl);

  // section section_indastries

  const indastriesTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section_indastries",
      start: "top 60%",
      end: "bottom center",
    },
  });
  animateImage('.section_indastries [animate="image"]', indastriesTl);
  animateHeading(
    '.section_indastries [animate="reveal-heading"]',
    indastriesTl,
  );
  animateElement(
    '.section_indastries [animate="reveal-effect-element"]',
    indastriesTl,
  );

  // slider
  const swiper = new Swiper(".cards_wrapper", {
    slidesPerView: "auto",
    navigation: {
      nextEl: ".industries_arrow",
      prevEl: ".industries_arrow-prev",
    },
    on: {
      init: function () {
        let slide = this.slides[0];
        if (slide) {
          gsap.to(slide, {
            opacity: 1,
            duration: 0.8,
          });
        }
      },

      slideChangeTransitionStart: function () {
        this.slides.forEach((slide) => {
          if (slide) {
            gsap.to(slide, {
              opacity: 0.3,
              duration: 0.8,
            });
          }
        });
      },
      slideChangeTransitionEnd: function () {
        let activeSlide = this.slides[this.activeIndex];
        if (activeSlide) {
          gsap.to(activeSlide, {
            opacity: 1,
            duration: 0.8,
          });
        }
      },
    },
  });

  // section_details
  const detailsTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section_details",
      start: "top center",
      end: "bottom center",
    },
  });
  animateImage('.section_details [animate="image"]', detailsTl);
  animateHeading('.section_details [animate="reveal-heading"]', detailsTl);

  const swiperDetails = new Swiper(".detail-slider", {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    speed: 500,
    navigation: {
      nextEl: ".details_arrow-next",
      prevEl: ".details_arrow-prev",
    },
    breakpoints: {
      480: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
    },
    on: {
      init: function () {
        this.updateSlides();
      },
      slideChange: function () {
        this.updateSlides();
      },
    },
  });

  // Функция для обновления слайдов
  Swiper.prototype.updateSlides = function () {
    let activeSlide = this.slides[this.activeIndex];
    this.slides.forEach((slide, index) => {
      if (window.innerWidth >= 480) {
        slide.classList.toggle("scaled", slide === activeSlide);
        activeSlideChange(slide, slide === activeSlide);
      } else activeSlideChange(slide, slide === activeSlide);
    });
  };

  // Функция для смены информации infoBlock
  function activeSlideChange(slide, isActive) {
    const infoBlock = slide.querySelector(".details-card_info");
    const slideImage = slide.querySelector(".details-card_image");
    if (slideImage) {
      gsap.to(slideImage, {
        opacity: isActive ? 1 : 0.5,
        duration: 1,
        ease: "power1.out",
      });
      gsap.to(
        infoBlock,
        {
          opacity: isActive ? 1 : 0,
          duration: 1,
          ease: "power1.out",
        },
        0,
      );
    }
  }

  // Обновление Swiper после загрузки всех изображений
  window.addEventListener("load", function () {
    swiperDetails.update();
  });

  // Обновление Swiper после изменения размера окна
  window.addEventListener("resize", function () {
    swiperDetails.update();
  });

  // animation section_talk

  const ctaTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section_talk",
      start: "top center",
      end: "bottom center",
    },
  });
  animateHeading('.section_talk [animate="reveal-heading"]', ctaTl);
  animateElement('.section_talk [animate="reveal-effect-element"]', ctaTl);

  // Найти все кнопки с атрибутом data-form='open'
  const formBtnOpen = document.querySelectorAll("[data-form='open']");
  const formCloseBtn = document.querySelector(".close-icon");
  const modalForm = document.querySelector("#modal-form");

  formBtnOpen.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log("form open!");
      // Выполнить анимацию с opacity и height
      gsap.to(modalForm, {
        height: "100vh",
        duration: 0.5,
        ease: "power1.out",
      });
    });
  });

  formCloseBtn.addEventListener("click", () => {
    gsap.to(modalForm, {
      height: "0vh",
      duration: 0.5,
      ease: "power1.out",
    });
  });

  // animate inputs
  const inputs = document.querySelectorAll(".field");

  inputs.forEach((input) => {
    const line = input.nextElementSibling;

    input.addEventListener("focus", function () {
      gsap.to(line, { duration: 1, width: "100%" });
    });

    input.addEventListener("blur", function () {
      gsap.to(line, { duration: 1, width: "0%" });
    });
  });
});

