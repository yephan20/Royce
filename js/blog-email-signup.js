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


