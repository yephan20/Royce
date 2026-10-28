
// Responsive Hamburger Menu//

const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");
const menuClose = document.querySelector(".menu-close");

// Disable scrolling
function disableScroll() {
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
}

// Enable scrolling
function enableScroll() {
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
}

// Open menu
hamburger.addEventListener("click", () => {
  menu.classList.add("active");
  hamburger.style.opacity = "0";
  disableScroll();
});

// Close menu
menuClose.addEventListener("click", () => {
  menu.classList.remove("active");
  hamburger.style.opacity = "1";
  enableScroll();
});

// Close when clicking outside the menu
window.addEventListener("click", (event) => {
  if (
    menu.classList.contains("active") &&
    !menu.contains(event.target) &&
    !hamburger.contains(event.target)
  ) {
    menu.classList.remove("active");
    hamburger.style.opacity = "1";
    enableScroll();
  }
});

// first 3 classes submission confirmation//

const formContainer = document.getElementById("form-container");
const confirmation = document.getElementById("confirmation");
const form = document.getElementById("form");
const h3 = document.getElementById("h3");

form.addEventListener("submit", async function(event) {
  event.preventDefault(); // Prevents the browser from redirecting
  
  const data = new FormData(event.target);
  
  try {
    const response = await fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      formContainer.style.display = 'none';
      formContainer.style.opacity = '0';
      confirmation.style.display = 'block';
      confirmation.style.opacity = '1';
      form.reset(); // Clears the form fields
    } else {
      h3.innerHTML = "Oops! There was a problem submitting your email.";
    }
  } catch (error) {
    h3.innerHTML = "Oops! There was a connectivity problem.";
  }
});
