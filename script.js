// Mobile Navigation Toggle
const mobileMenu = document.getElementById("mobile-menu");
const navMenu = document.getElementById("nav-menu");

mobileMenu.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Navbar scroll effect
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Update active navigation link
  updateActiveNavLink();
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const scrollPos = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Add animation classes and observe elements
document.addEventListener("DOMContentLoaded", () => {
  // Add fade-in animation to various elements
  const fadeElements = document.querySelectorAll(
    ".about-content, .skill-tag, .project-card, .timeline-item"
  );
  fadeElements.forEach((el, index) => {
    el.classList.add("fade-in");
    el.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(el);
  });

  // Add slide animations to hero content
  const heroText = document.querySelector(".hero-text");
  const heroImage = document.querySelector(".hero-image");

  if (heroText && heroImage) {
    heroText.classList.add("slide-in-left");
    heroImage.classList.add("slide-in-right");

    setTimeout(() => {
      heroText.classList.add("visible");
      heroImage.classList.add("visible");
    }, 200);
  }

  // Add staggered animation to skills
  const skillTags = document.querySelectorAll(".skill-tag");
  skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.05}s`;
  });
});

// Contact form handling
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  // Basic form validation
  if (!name || !email || !subject || !message) {
    showNotification("Please fill in all fields.", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showNotification("Please enter a valid email address.", "error");
    return;
  }

  // Simulate form submission
  showNotification(
    "Thank you for your message! I'll get back to you soon.",
    "success"
  );
  contactForm.reset();

  // In a real application, you would send the data to a server
  console.log("Form submitted:", { name, email, subject, message });
});

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;

  // Set background color based on type
  switch (type) {
    case "success":
      notification.style.background =
        "linear-gradient(135deg, #22c55e, #4ade80)";
      break;
    case "error":
      notification.style.background =
        "linear-gradient(135deg, #ef4444, #f87171)";
      break;
    default:
      notification.style.background =
        "linear-gradient(135deg, #3b82f6, #60a5fa)";
  }

  // Add to DOM
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing animation when page loads
document.addEventListener("DOMContentLoaded", () => {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 80);
    }, 1000);
  }
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector(".hero-image");

  if (heroImage) {
    const rate = scrolled * -0.5;
    heroImage.style.transform = `translateY(${rate}px)`;
  }
});

// Add hover effects to project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    const image = card.querySelector(".project-placeholder");
    if (image) {
      image.style.transform = "scale(1.1)";
    }
  });

  card.addEventListener("mouseleave", () => {
    const image = card.querySelector(".project-placeholder");
    if (image) {
      image.style.transform = "scale(1)";
    }
  });
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Add smooth transitions when page loads
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Experience management functions for future use
function addExperience(experience) {
  const timeline = document.getElementById("experience-timeline");
  const emptyState = document.getElementById("experience-empty");

  // Hide empty state and show timeline
  emptyState.style.display = "none";
  timeline.classList.add("has-content");

  // Create timeline item
  const timelineItem = document.createElement("div");
  timelineItem.className = "timeline-item fade-in";
  timelineItem.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-content">
            <div class="timeline-date">${experience.date}</div>
            <h3>${experience.position}</h3>
            <h4>${experience.company}</h4>
            <p>${experience.description}</p>
            ${
              experience.achievements
                ? `
                <ul>
                    ${experience.achievements
                      .map((achievement) => `<li>${achievement}</li>`)
                      .join("")}
                </ul>
            `
                : ""
            }
        </div>
    `;

  timeline.appendChild(timelineItem);

  // Add animation
  observer.observe(timelineItem);
}

// Example function to show how experience can be added dynamically
function initializeExperience() {
  // This function can be called when you want to add experiences
  // Example usage (commented out):
  /*
    addExperience({
        date: "2022 - Present",
        position: "Senior Full Stack Developer",
        company: "Tech Solutions Inc.",
        description: "Leading development of enterprise web applications, mentoring junior developers, and implementing scalable architecture solutions for high-traffic applications.",
        achievements: [
            "Increased application performance by 40% through optimization",
            "Led a team of 5 developers on major product releases",
            "Implemented CI/CD pipelines reducing deployment time by 60%"
        ]
    });
    */
}
