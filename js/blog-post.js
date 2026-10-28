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

// email sign up//

const form = document.getElementById("form");
const formStatus = document.getElementById("form-status");

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
      formStatus.innerHTML = "Thank you for signing up to ROYCE emails!";
      form.reset(); // Clears the form fields
    } else {
      formStatus.innerHTML = "Oops! There was a problem submitting your email.";
    }
  } catch (error) {
    formStatus.innerHTML = "Oops! There was a connectivity problem.";
  }
});


// Search blog. Search results open in different page.
// Search form handling. This runs only on pages that contain the form.
const searchForm = document.getElementById("search-form");

if (searchForm) {
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const searchInput = document.getElementById("search-input");
    const searchTerm = searchInput.value.trim();

    if (!searchTerm) {
      searchInput.focus();
      return;
    }

    window.location.href =
      "search-results.html?search=" + encodeURIComponent(searchTerm);
  });
}

//animation on page load//

const bannerImage1 = document.querySelector(".banner-image1");
const bannerImage2 = document.querySelector(".banner-image2");

document.addEventListener("DOMContentLoaded", () => {  
  bannerImage1.classList.add("active");
  bannerImage2.classList.add("active");
});



