window.addEventListener("load", () => {
  // Prevent body animations on load
  const body = document.querySelector("body");
  body.classList.remove("no-transition");
});

const darkModeHandler = (() => {
  const body = document.querySelector("body");
  let currentTheme = "dark";

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
    if (localStorage.getItem("theme") === "light") {
      body.classList.remove("body-dark");
    }
  };

  const darkToggleButton = document.getElementById("theme-toggle");
  darkToggleButton.addEventListener("click", toggleDarkMode);

  init();
})();

// Contact form

const contactFormHandler = (() => {
  const contactForm = document.getElementById("contact-form");
  const status = document.querySelector(".form-status");

  const emailField = document.getElementById("email");
  const messageField = document.getElementById("message");

  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");

  // Validate form values
  const validateForm = (email, message) => {
    let result = true;

    // Validate email
    const mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email.match(mailformat)) {
      errorHandler("EMAIL", "Email is invalid");
      result = false;
    }

    // Inputs cannot be empty
    if (email.trim().length === 0) {
      errorHandler("EMAIL", "Cannot be empty");
      result = false;
    }

    if (message.trim().length === 0) {
      errorHandler("MESSAGE", "Say something! :)");
      result = false;
    }

    return result;
  };

  // Handle errors
  const errorHandler = (field, errorMsg) => {
    if (field === "EMAIL") {
      emailError.innerText = errorMsg;
    }

    if (field === "MESSAGE") {
      messageError.innerText = errorMsg;
    }
  };

  // Clear errors on input
  emailField.addEventListener("input", e => {
    emailError.innerText = "";
    status.innerText = "";
  });

  messageField.addEventListener("input", e => {
    messageError.innerText = "";
    status.innerText = "";
  });

  async function handleSubmit(event) {
    event.preventDefault();

    var data = new FormData(event.target);
    fetch(event.target.action, {
      method: contactForm.method,
      body: data,
      headers: {
        Accept: "application/json"
      }
    })
      .then(response => {
        status.innerHTML = "Thanks for your submission!";
        contactForm.reset();
      })
      .catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form";
      });
  }

  contactForm.addEventListener("submit", async e => {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const message = e.target.elements.message.value;

    if (validateForm(email, message)) {
      // Submit form
      handleSubmit(e);
    }
  });
})();

const navScrollHandler = (() => {
  const navAbout = document.getElementById("nav-about");
  const navProjects = document.getElementById("nav-projects");
  const navContact = document.getElementById("nav-contact");

  const aboutHeader = document.querySelector("section[class='about']");
  const projectsHeader = document.querySelector("section[class='projects']");
  const contactHeader = document.querySelector("section[class='contact']");

  navAbout.addEventListener("click", () => {
    aboutHeader.scrollIntoView();
  });

  navProjects.addEventListener("click", () => {
    projectsHeader.scrollIntoView();
  });

  navContact.addEventListener("click", () => {
    contactHeader.scrollIntoView();
  });
})();
