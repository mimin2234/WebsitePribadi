// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// Active navigation link highlighting
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Contact form handling
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // Simple validation
    if (!name || !email || !subject || !message) {
      showNotification("Mohon lengkapi semua field!", "error");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification("Format email tidak valid!", "error");
      return;
    }

    // Simulate form submission
    showNotification("Pesan berhasil dikirim! Terima kasih.", "success");
    this.reset();
  });
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
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "#4CAF50"
            : type === "error"
            ? "#f44336"
            : "#2196F3"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;

  // Add to document
  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = "slideOutRight 0.3s ease-in";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.style.animation = "slideOutRight 0.3s ease-in";
    setTimeout(() => notification.remove(), 300);
  });
}

// Add CSS animations for notifications
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
`;
document.head.appendChild(style);

// Portfolio item hover effects
const portfolioItems = document.querySelectorAll(".portfolio-item");
portfolioItems.forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
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
      entry.target.classList.add("fade-in-up");
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(
    ".portfolio-item, .testimonial-item, .skill-item, .stat-item"
  )
  .forEach((el) => {
    observer.observe(el);
  });

// Typing animation for home title
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
window.addEventListener("load", () => {
  const homeTitle = document.querySelector(".home-title");
  if (homeTitle) {
    const originalText = homeTitle.textContent;
    typeWriter(homeTitle, originalText, 50);
  }
});

// Parallax effect for home section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".home");
  if (parallax) {
    const speed = scrolled * 0.5;
    parallax.style.transform = `translateY(${speed}px)`;
  }
});

// Download CV functionality
const downloadBtn = document.querySelector(".btn-outline");
if (downloadBtn) {
  downloadBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // Create a simple CV content (you can replace this with actual CV data)
    const cvContent = `
MUHAMMAD MUSLIMIN
Website Pribadi & Portofolio

KONTAK
Email: muhammad.muslimin@email.com
Telepon: +62 812-3456-7890
Lokasi: Jakarta, Indonesia

PENGALAMAN
- Pengembangan Web (5+ tahun)
- Desain Responsif
- Manajemen Database
- Analisis Data

KEAHLIAN
- HTML, CSS, JavaScript
- React, Node.js
- Python, Django
- Database Management

PENDIDIKAN
- [Tambahkan informasi pendidikan Anda]

PROYEK TERBARU
- Website E-Commerce
- Aplikasi Mobile
- Dashboard Analytics

Hobi: Teknologi, Inovasi, Pembelajaran Berkelanjutan
        `;

    // Create and download file
    const blob = new Blob([cvContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "CV_Muhammad_Muslimin.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    showNotification("CV berhasil diunduh!", "success");
  });
}

// Social media link handlers
const socialLinks = document.querySelectorAll(".social-link");
socialLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const platform = this.querySelector("i").className;

    let url = "#";
    if (platform.includes("github")) {
      url = "https://github.com/muhammadmuslimin";
    } else if (platform.includes("linkedin")) {
      url = "https://linkedin.com/in/muhammadmuslimin";
    } else if (platform.includes("instagram")) {
      url = "https://instagram.com/muhammadmuslimin";
    } else if (platform.includes("twitter")) {
      url = "https://twitter.com/muhammadmuslimin";
    }

    if (url !== "#") {
      window.open(url, "_blank");
    } else {
      showNotification("Link media sosial akan segera tersedia!", "info");
    }
  });
});

// Portfolio link handlers
const portfolioLinks = document.querySelectorAll(".portfolio-link");
portfolioLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    showNotification("Detail proyek akan segera tersedia!", "info");
  });
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Add CSS for loading animation
const loadingStyle = document.createElement("style");
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease-in;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);

// Console welcome message
console.log(`
🚀 Website Pribadi Muhammad Muslimin
📧 Email: muhammad.muslimin@email.com
🌐 Selamat datang di website pribadi saya!
`);

// Performance optimization: Lazy loading for images
const images = document.querySelectorAll("img");
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.src;
      img.classList.remove("lazy");
      imageObserver.unobserve(img);
    }
  });
});

images.forEach((img) => {
  imageObserver.observe(img);
});
