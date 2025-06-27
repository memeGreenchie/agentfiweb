$(document).ready(function () {
  setTimeout(() => {
    $(".loader").css("display", "none");
  }, 5000);
  gsap.registerPlugin(ScrollTrigger);

  // Smoth-scroll
  const ScrollArea = document.getElementById("scroll-content");
  const options = {
    damping: 0.1,
    speed: 1,
    renderByPixel: true,
    continuousScrolling: true,
    syncCallbacks: true,
    alwaysShowTracks: true,
  };
  var scrollbar = Scrollbar.init(ScrollArea, options);

  const delay = 4.5;

  scrollbar.addListener(({ offset }) => {
    scrollbar.setPosition(0, offset.y); // Lock X-axis
  });
  var backToTop = $("#backToTop");
  var birzaNav = $(".birzaNav");
  scrollbar.addListener((status) => {
    if (status.offset.y > 1000) {
      backToTop.addClass("show");
      birzaNav.css({ top: status.offset.y + "px" });
      birzaNav.addClass("stickyNav");
    } else {
      backToTop.removeClass("show");
      birzaNav.css({ top: 0 });

      birzaNav.removeClass("stickyNav");
    }
  });
  gsap.from(".animateTop", {
    y: 300,
    opacity: 0,
    ease: "power2.out",
    duration: 1,
    delay: delay + 0.3,
  });

  $('.birzaMenu li a[href^="#"]').on("click", function (e) {
    if ($(".mobNavInner").hasClass("menuActive")) {
      menu($(".menuIcon"));
    }

    e.preventDefault();
    $('.birzaMenu li a[href^="#"]').parent().removeClass("active");
    $(this).parent().addClass("active");
    var targetId = $(this).attr("href");
    var targetSection = $(targetId);

    if (targetSection.length) {
      scrollbar.scrollIntoView(targetSection[0], {
        offsetTop: 100,
        duration: 1000,
      });
    }
  });

  backToTop.on("click", function () {
    if ($(".mobNavInner").hasClass("menuActive")) {
      menu($(".menuIcon"));
    }
    gsap.to(scrollbar, {
      scrollTop: 0,
      duration: 2,
      ease: "power2.inOut",
    });
  });

  // button animations hover
  $(".birzaButton").on("mouseover", function (e) {
    var relX = e.pageX - $(this).offset().left;
    var relY = e.pageY - $(this).offset().top;
    $(this).find(".birzaButton-hover").css({ left: relX, top: relY });
    $(this).find(".birzaButton-hover").removeClass("desplode-circle");
    $(this).find(".birzaButton-hover").addClass("explode-circle");
  });

  $(".birzaButton").on("mouseleave", function (e) {
    var relX = e.pageX - $(this).offset().left;
    var relY = e.pageY - $(this).offset().top;
    $(this).find(".birzaButton-hover").css({ left: relX, top: relY });
    $(this).find(".birzaButton-hover").removeClass("explode-circle");
    $(this).find(".birzaButton-hover").addClass("desplode-circle");
  });

  document.querySelectorAll(".tabButton button").forEach((button) => {
    button.addEventListener("click", function () {
      document
        .querySelectorAll(".tabButton button")
        .forEach((b) => b.classList.remove("active"));

      this.classList.add("active");

      document.querySelectorAll(".tab-pane").forEach((pane) => {
        pane.classList.remove("show", "active");
      });

      let targetTabContents = this.getAttribute("data-bs-target").split(",");

      targetTabContents.forEach((tabId) => {
        let tabContent = document.querySelector(tabId);
        if (tabContent) {
          tabContent.classList.add("show", "active");
        }
      });
    });
  });
  $(".marquee").marquee({
    speed: 200,
    gap: 30,
    delayBeforeStart: 0,
    direction: "left",
    duplicated: true,
    pauseOnHover: false,
  });

  scrollbar.addListener(ScrollTrigger.update);
  ScrollTrigger.defaults({ scroller: ScrollArea });

  ScrollTrigger.scrollerProxy("#scroll-content", {
    scrollTop(value) {
      if (arguments.length) {
        scrollbar.scrollTop = value;
      }
      return scrollbar.scrollTop;
    },
  });

  scrollbar.addListener(ScrollTrigger.update);
  ScrollTrigger.defaults({ scroller: ScrollArea });

  gsap.from(".birzaNav", {
    y: -200,
    opacity: 0,
    ease: "power2.out",
    duration: 0.5,
    delay: delay,
  });

  gsap.from(".animateLeft", {
    x: 300,
    opacity: 0,
    ease: "power2.out",
    duration: 1,
    delay: delay + 0.3,
  });
  gsap.from(".animateRight", {
    x: -300,
    opacity: 0,
    ease: "power2.out",
    duration: 1,
    delay: delay + 0.3,
  });

  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    ".heroImages img:first-child",
    { scale: 0 },
    {
      scale: 1.5,
      duration: 1,
      scrollTrigger: {
        trigger: ".birzaHero",
        start: "top center",
        end: "bottom center",
        scrub: true,
        toggleActions: "play reverse play reverse",
      },
    }
  );

  gsap.fromTo(
    ".featureslide",
    {
      rotation: -15,
    },
    {
      rotate: 0,
      scrollTrigger: {
        trigger: ".birzaAbout",
        start: "center center",
        duration: 1,
        scrub: true,
        toggleActions: "play reverse play reverse",
      },
    }
  );
  let birzaAnimation; // Variable to store the animation instance

  function setupBirzaAnimation() {
    // Check if the window width is greater than 912px
    if (window.innerWidth > 912) {
      // Create the animation if it doesn't already exist
      if (!birzaAnimation) {
        birzaAnimation = gsap.fromTo(
          ".birzaEvents .container",
          {
            xPercent: 0,
          },
          {
            xPercent: -100,
            scrollTrigger: {
              trigger: ".birzaEvents",
              start: "center center",
              duration: 2,
              scrub: true,
              pin: true,
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    } else {
      // For widths 912px or smaller, kill the animation if it exists
      if (birzaAnimation) {
        birzaAnimation.kill(); // Kill the animation
        birzaAnimation = null; // Reset the variable
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // Kill associated ScrollTriggers
      }
    }
  }

  // Initial setup
  setupBirzaAnimation();

  // Re-run setup on window resize
  window.addEventListener("resize", setupBirzaAnimation);

  // GSAP counter animation
  const counter = $(".expAmmount span");

  gsap.from(counter, {
    textContent: 0,
    duration: 4,
    snap: { textContent: 1 },

    scrollTrigger: {
      trigger: ".birzaExp",
      start: "top center",
    },
  });

  // GSAP counter animation
  const birzaCExp = $(".birzaCExp");

  gsap.from(birzaCExp, {
    textContent: 0,
    duration: 3,
    snap: { textContent: 1 },

    scrollTrigger: {
      trigger: ".birzaTeam",
      start: "top center",
    },
  });

  $(".text-line").each(function () {
    var text = $(this).text().trim();
    var newText = text
      .split(" ")
      .filter(function (word) {
        return word.trim() !== "";
      })
      .map(function (word) {
        return (
          '<span style="display:inline-block; overflow:hidden;"><span class="word">' +
          word +
          "</span></span>"
        );
      })
      .join(" ");
    $(this).html(newText);

    var $textLine = $(this);

    gsap.from($textLine, {
      scrollTrigger: {
        trigger: $textLine.parent(),
        start: "top 80%",
        end: "bottom 20%",
        onEnter: function () {
          $textLine.addClass("textAnimate");
        },
      },
    });
  });

  $(".revealImg").each(function () {
    const revealImg = $(this);

    revealImg.wrap('<div class="w-100 animateContainer"></div>');

    revealImg.parent().parent().css("overflow", "hidden");

    let imgTl = gsap.timeline({
      scrollTrigger: {
        trigger: revealImg.parent(),
        start: "top center",
      },
    });

    imgTl.from(revealImg.parent(), {
      xPercent: -200,
    });
    imgTl.from(revealImg, {
      scale: 1.3,

      ease: Power2.out,
    });
  });

  $(".teamMember").each(function () {
    $(this).hover(
      function () {
        $(this)
          .parent()
          .prevAll()
          .find(".teamMember")
          .css("transform", "translateX(-100%)");
      },
      function () {
        $(this)
          .parent()
          .prevAll()
          .find(".teamMember")
          .css("transform", "translateX(0)");
      }
    );
  });

  $(document).ready(function () {
    $("#birzaAccordion .collapse").on("shown.bs.collapse", function () {
      $(this).parent().addClass("active");
    });

    $("#birzaAccordion .collapse").on("hidden.bs.collapse", function () {
      $(this).parent().removeClass("active");
    });
  });

  const footerSlider = new Swiper(".footerSlider", {
    modules: [EffectShutters],

    effect: "shutters",

    shuttersEffect: {
      split: 10,
    },
    speed: 900,
    pagination: {
      el: ".footerPagination",
    },
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },

    loop: true,
  });

  var testimonials = new Swiper(".testimonials", {
    grabCursor: true,
    effect: "creative",
    creativeEffect: {
      prev: {
        shadow: true,
        translate: [0, 0, -400],
      },
      next: {
        translate: ["100%", 0, 0],
      },
    },
    speed: 900,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
    navigation: {
      nextEl: ".next",
      prevEl: ".prev",
    },
  });

  const nextPrevHeight = $(".nextPrev").outerHeight();
  console.log(nextPrevHeight);

  function menu(menuIcon) {
    $(".mobNavInner").toggleClass("menuActive");
    menuIcon.toggleClass("menuActive");
  }
  const mobileNav = $(".mobNavInner");
  $(".menuIcon").on("click", function () {
    menu((menuIcon = $(".menuIcon")));
  });

  scrollbar.addListener((status) => {
    mobileNav.css({ top: status.offset.y + "px" });
  });

  $(".testimonials").css("padding-bottom", nextPrevHeight);

  // color pallete

  $(".palleteButton").on("click", function () {
    $(".colorPallete").toggleClass("reveal");
  });

  $(".pallete").on("click", function () {
    $(".pallete").removeClass("active");
    $(this).addClass("active");

    const color = $(this).css("background-color");
    const logoColor = $(this).css("--logo-color");
    console.log(color, logoColor);

    $(":root").css({ "--primary-color": color, "--logo-color": logoColor });
  });

  $(".themeChange button").on("click", function () {
    if ($(this).hasClass("dark")) {
      $(":root").addClass("dark");
    } else {
      $(":root").removeClass("dark");
    }
  });
});
