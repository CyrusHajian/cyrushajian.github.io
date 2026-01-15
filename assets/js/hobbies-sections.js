// assets/js/hobbies-sections.js
// Toggle hobby detail sections without leaving the page.
(function () {
  function showDetail(map, detail) {
    if (!map || !detail) return;
    map.hidden = true;
    map.classList.add("is-hidden");
    detail.hidden = false;
    detail.classList.add("is-active");
  }

  function showMap(map, details) {
    if (!map) return;
    details.forEach(section => {
      section.hidden = true;
      section.classList.remove("is-active");
    });
    map.hidden = false;
    map.classList.remove("is-hidden");
  }

  document.addEventListener("DOMContentLoaded", function () {
    const map = document.querySelector("[data-hobbies-map]");
    const details = Array.from(document.querySelectorAll(".hobby-detail"));

    if (!map || details.length === 0) return;

    map.addEventListener("click", function (event) {
      const button = event.target.closest("[data-hobbies-target]");
      if (!button) return;

      const targetId = button.getAttribute("data-hobbies-target");
      const detail = document.getElementById(targetId);
      if (!detail) return;

      showDetail(map, detail);
    });

    document.addEventListener("click", function (event) {
      const backBtn = event.target.closest("[data-hobbies-back]");
      if (!backBtn) return;

      showMap(map, details);
    });
  });
})();
