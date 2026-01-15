// assets/js/research-sections.js
// Toggle research detail sections without leaving the page.
(function () {
  function showDetail(grid, detail) {
    if (!grid || !detail) return;
    grid.hidden = true;
    grid.classList.add("is-hidden");
    detail.hidden = false;
    detail.classList.add("is-active");
  }

  function showGrid(grid, details) {
    if (!grid) return;
    details.forEach(section => {
      section.hidden = true;
      section.classList.remove("is-active");
    });
    grid.hidden = false;
    grid.classList.remove("is-hidden");
  }

  document.addEventListener("DOMContentLoaded", function () {
    const grid = document.querySelector("[data-research-grid]");
    const details = Array.from(document.querySelectorAll(".research-detail"));

    if (!grid || details.length === 0) return;

    grid.addEventListener("click", function (event) {
      const button = event.target.closest("[data-research-target]");
      if (!button) return;

      const targetId = button.getAttribute("data-research-target");
      const detail = document.getElementById(targetId);
      if (!detail) return;

      showDetail(grid, detail);
    });

    document.addEventListener("click", function (event) {
      const backBtn = event.target.closest("[data-research-back]");
      if (!backBtn) return;

      showGrid(grid, details);
    });
  });
})();
