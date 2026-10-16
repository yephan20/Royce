const urlParams = new URLSearchParams(window.location.search);
const searchTerm = (urlParams.get("search") || "").trim();

const searchMessage = document.getElementById("search-message");
const resultsList = document.getElementById("results-list");

searchMessage.textContent = searchTerm
  ? `Search results for "${searchTerm}"`
  : "Enter a search term to find posts.";

if (searchTerm) {
  const normalizedTerm = searchTerm.toLocaleLowerCase();

  // Fetch posts from posts.json
  fetch("js/posts.json")
    .then(res => {
      if (!res.ok) {
        throw new Error("Failed to load posts.json");
      }

      return res.json();
    })
    .then(posts => {

      // Search within posts.json
      const matchingPosts = posts.filter(function (post) {
        return (
          (post.title || "").toLocaleLowerCase().includes(normalizedTerm) ||
          (post.summary || "").toLocaleLowerCase().includes(normalizedTerm)
        );
      });

      if (matchingPosts.length === 0) {
        resultsList.innerHTML = `
          <p class="no-posts-found">
            No posts found for "${searchTerm}". Try another search.
          </p>
          <form id="search-form">
            <input type="search" id="search-input"
              name="search" placeholder="Search Blog" required>
            <button type="submit" id="submit-btn"></button>
          </form>
        `;

        // Make the new search form work
        document.getElementById("search-form")
          .addEventListener("submit", function (event) {
            event.preventDefault();

            const newSearch = document
              .getElementById("search-input")
              .value.trim();

            if (newSearch) {
              window.location.href =
                "search-results.html?search=" +
                encodeURIComponent(newSearch);
            }
          });

      } else {
        const resultsContainer = document.createElement("div");
        resultsContainer.className = "results-container";

        matchingPosts.forEach(function (post) {
          const postItem = document.createElement("div");

          postItem.innerHTML = `
            <div class="post-item">
              <a href="${post.url}">
                <div class="post-photo-box">
                  <img class="post-photo"
                    src="${post.photo}"
                    alt="${post.title}">
                </div>
                <div class="post-text">
                  <h3 class="post-title">${post.title}</h3>
                  <p class="post-summary">${post.summary}</p>
                </div>
              </a>
            </div>
          `;

          resultsContainer.appendChild(postItem);
        });

        resultsList.appendChild(resultsContainer);
      }
    })
    .catch(error => {
      console.error("Error fetching posts:", error);
      searchMessage.textContent =
        "Unable to load posts. Please try again later.";
    });
}