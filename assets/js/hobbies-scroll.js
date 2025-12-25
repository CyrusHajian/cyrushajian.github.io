(function () {
  if (!document.body.classList.contains("hobbies-page")) return;

  // “3 scroll ticks” ≈ 180–260px on most mice/trackpads
  var THRESHOLD_PX = 220;

  function apply() {
    if (window.scrollY > THRESHOLD_PX) {
      document.body.classList.add("hobbies-scrolled");
    } else {
      document.body.classList.remove("hobbies-scrolled");
    }
  }

  window.addEventListener("scroll", apply, { passive: true });
  apply();
})();
