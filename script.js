// script.js – mobile menu toggle & smooth interactions
document.addEventListener('DOMContentLoaded', function() {
  // mobile hamburger menu
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      navLinks.classList.toggle('show');
    });
    
    // close menu when clicking outside (optional)
    document.addEventListener('click', function(event) {
      if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
        navLinks.classList.remove('show');
      }
    });
  }

  // simple form alert (non-functional demo)
  const quickForm = document.getElementById('quickForm');
  if (quickForm) {
    quickForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you! We will get back to you shortly. (demo)');
      quickForm.reset();
    });
  }
});