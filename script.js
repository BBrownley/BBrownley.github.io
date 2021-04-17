const darkModeHandler = (() => {
  const body = document.querySelector("body");
  let currentTheme = "light";

  const toggleDarkMode = () => {
    if (body.classList.contains("body-dark")) {
      body.classList.remove("body-dark");
      currentTheme = "light";
    } else {
      body.classList.add("body-dark");
      currentTheme = "dark";
    }
    saveUserPreference();
  };
  const saveUserPreference = () => {
    localStorage.setItem("theme", currentTheme);
  };
  const init = () => {
    if (localStorage.getItem("theme") === "dark") {
      body.classList.add("body-dark");
    }
  };

  const darkToggleButton = document.getElementById("theme-toggle");
  darkToggleButton.addEventListener("click", toggleDarkMode);

  init();
})();

const ImageScrollHandler = (() => {
  // Target images to be scrolled

  const designoImages = document.querySelectorAll(
    ".project-designo > div > div"
  );

  const designoMobileImg = document.querySelector(
    ".project-designo .outline-mobile div"
  );

  const designoTabletImg = document.querySelector(
    ".project-designo .outline-tablet div"
  );

  const designoDesktopImg = document.querySelector(
    ".project-designo .outline-desktop div"
  );

  const designoinitialPositions = {
    mobile: parseInt(
      window
        .getComputedStyle(designoMobileImg)
        .getPropertyValue("background-position-y")
        .split("px")[0]
    ),
    tablet: parseInt(
      window
        .getComputedStyle(designoTabletImg)
        .getPropertyValue("background-position-x")
        .split("px")[0]
    ),
    desktop: parseInt(
      window
        .getComputedStyle(designoDesktopImg)
        .getPropertyValue("background-position-y")
        .split("px")[0]
    )
  };

  // Scroll

  let increment = 0;
  let scrolling = true;

  const scroll = () => {
    if (!scrolling) return false;
    designoMobileImg.style.backgroundPositionY = `-${designoinitialPositions.mobile +
      increment}px`;
    designoTabletImg.style.backgroundPositionX = `${designoinitialPositions.tablet +
      increment}px`;
    designoDesktopImg.style.backgroundPositionY = `-${designoinitialPositions.desktop +
      increment}px`;
    increment += 1;
  };

  setInterval(scroll, 50);

  // Stop scrolling whenever user hovers over one of the images

  designoImages.forEach(image => {
    image.addEventListener("mouseenter", () => {
      if (scrolling) {
        clearInterval(scroll);
        scrolling = false;
      }
    });
    image.addEventListener("mouseleave", () => {
      if (scrolling === false) {
        scrolling = true;
      }
    });
  });
})();
