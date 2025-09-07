// Email form handler for glass coming soon page
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("emailForm");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const button = e.target.querySelector(".glass-button");
    const input = e.target.querySelector(".glass-input");

    // Add loading state
    button.textContent = "...";
    button.disabled = true;

    // Simulate API call (replace with actual endpoint)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Success state
    const form = document.getElementById("emailForm");
    form.innerHTML = '<div class="success-message">you\'re on the list</div>';
  });
});
