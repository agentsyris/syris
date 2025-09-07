// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Form handling with proper error handling and loading states
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("emailForm");
  const successMessage = document.getElementById("successMessage");
  const submitBtn = document.querySelector(".submit-btn");
  const emailInput = document.getElementById("email");

  // Handle form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim().toLowerCase();

    // Validate email
    if (!emailRegex.test(email)) {
      showError("please enter a valid email address");
      return;
    }

    // Check if already subscribed
    if (isAlreadySubscribed(email)) {
      showError("you're already on the list");
      return;
    }

    // Show loading state
    showLoadingState();

    // Simulate API call with proper error handling
    submitEmail(email)
      .then(() => {
        // Success
        storeEmail(email);
        showSuccess();
      })
      .catch((error) => {
        // Error handling
        console.error("Email submission failed:", error);
        showError("something went wrong. please try again.");
        resetForm();
      });
  });

  // Handle Enter key in email input
  emailInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      form.dispatchEvent(new Event("submit"));
    }
  });

  // Ensure all text inputs stay lowercase
  const textInputs = document.querySelectorAll(
    'input[type="email"], input[type="text"]'
  );
  textInputs.forEach((input) => {
    input.addEventListener("input", function () {
      this.value = this.value.toLowerCase();
    });
  });

  // Helper functions
  function showLoadingState() {
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;
    submitBtn.textContent = "...";
  }

  function showSuccess() {
    form.style.display = "none";
    successMessage.style.display = "block";
  }

  function showError(message) {
    // Create or update error message
    let errorDiv = document.querySelector(".error-message");
    if (!errorDiv) {
      errorDiv = document.createElement("div");
      errorDiv.className = "error-message";
      errorDiv.style.cssText = `
        font-family: var(--font-ui);
        font-size: 14px;
        color: #ff6b6b;
        margin-top: 8px;
        text-transform: lowercase;
      `;
      form.appendChild(errorDiv);
    }
    errorDiv.textContent = message;

    // Auto-hide after 3 seconds
    setTimeout(() => {
      if (errorDiv) errorDiv.remove();
    }, 3000);
  }

  function resetForm() {
    submitBtn.classList.remove("loading");
    submitBtn.disabled = false;
    submitBtn.textContent = "notify me";
  }

  function isAlreadySubscribed(email) {
    try {
      const existingEmails = JSON.parse(
        localStorage.getItem("syris_emails") || "[]"
      );
      return existingEmails.includes(email);
    } catch (error) {
      return false;
    }
  }

  function storeEmail(email) {
    try {
      const existingEmails = JSON.parse(
        localStorage.getItem("syris_emails") || "[]"
      );
      if (!existingEmails.includes(email)) {
        existingEmails.push(email);
        localStorage.setItem("syris_emails", JSON.stringify(existingEmails));
      }
    } catch (error) {
      console.log("localStorage not available");
    }
  }

  function submitEmail(email) {
    // Simulate API call - replace with actual endpoint
    const apiEndpoint =
      form.getAttribute("data-api-endpoint") || "/api/subscribe";

    return new Promise((resolve, reject) => {
      // Simulate network delay
      setTimeout(() => {
        // Simulate occasional network failures for testing
        if (Math.random() < 0.1) {
          reject(new Error("Network error"));
        } else {
          resolve({ success: true });
        }
      }, 1500);
    });
  }
});
