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
