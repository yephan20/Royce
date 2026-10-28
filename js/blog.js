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

// load more button when json is inside javascript file

// 2. Pagination Configuration
let posts = [];
let currentPosts = 0;
const postsPerLoad = 8; // Adjust how many items display at a time

// DOM Elements
const postsContainer = document.getElementById('posts-container');
const loadMoreBtn = document.getElementById('load-more-btn');

// 3. fetch json
fetch("js/posts.json")
    .then(res => res.json())
    .then(data => {
        posts = data;

        // Automatically load the first 4 posts
        loadMore();
    })
    .catch(error => {
        console.error("Error loading posts:", error);
    });

    // 3. Main function to slice and display data
function loadMore() {
  // Extract the next batch of items
  const nextBatch = posts.slice(currentPosts, currentPosts + postsPerLoad);
  
  // Render each item from the slice into the DOM
  nextBatch.forEach(post => {
    const postItem = document.createElement('div');
    postItem.innerHTML = `    
      <div class="post-item">
      <a href="${post.url}">
      <div class="post-photo-box">
        <img class="post-photo" src="${post.photo}">
      </div>
      <div class="post-text">
        <h3 class="post-title">${post.title}</h3>
        <p class="post-summary">${post.summary}</p>
      </div>
      </a>
    </div>`;
    postsContainer.appendChild(postItem);
  });

  // Move the pointer forward
  currentPosts += postsPerLoad;

  // 4. Hide the button if no items remain to protect UX
  if (currentPosts >= posts.length) {
    loadMoreBtn.style.display = 'none';
  }
}

// 5. Initial Execution & Event Binding
loadMoreBtn.addEventListener('click', loadMore);

//animation on page load//

const bannerImage1 = document.querySelector(".banner-image1");
const bannerImage2 = document.querySelector(".banner-image2");

document.addEventListener("DOMContentLoaded", () => {  
  bannerImage1.classList.add("active");
  bannerImage2.classList.add("active");
});




