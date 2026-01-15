// assets/js/adventures-carousel.js
// Simple carousel for the Adventures page detail sections.
(function () {
  function parseList(str) {
    return (str || "")
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);
  }

  function initCarousel(carousel) {
    if (!carousel) return;

    const images = parseList(carousel.getAttribute("data-images"));
    const imgEl = carousel.querySelector("[data-carousel-image]");
    const prevBtn = carousel.querySelector("[data-carousel-prev]");
    const nextBtn = carousel.querySelector("[data-carousel-next]");

    if (!imgEl || images.length === 0) return;

    let idx = 0;

    function render() {
      imgEl.src = images[idx];
    }

    function step(delta) {
      idx = (idx + delta + images.length) % images.length;
      render();
    }

    render();

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        step(-1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        step(1);
      });
    }

    if (images.length < 2) {
      if (prevBtn) prevBtn.disabled = true;
      if (nextBtn) nextBtn.disabled = true;
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-carousel]").forEach(initCarousel);
  });
})();
