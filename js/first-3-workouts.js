
// Responsive Hamburger Menu//

const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");
const menuClose = document.querySelector(".menu-close");

// click anywhere on window to close

window.addEventListener('mouseup', function () {
  if (event.target != menu && event.target.parentNode != menu) {
    menu.classList.remove("active");
  }
})

hamburger.addEventListener("click", () => {
  menu.classList.add("active");
})

menuClose.addEventListener("click", () => {
  menu.classList.remove("active");
})

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
