(function () {
  // Run only on the Hobbies page (requires classes: hobbies-page in front matter)
  if (!document.body.classList.contains("hobbies-page")) return;

  var NOTCHES_TO_TRIGGER = 32;

  // Most mouse wheels report ~100px per notch. We convert deltaY to "notches".
  // Clamp so trackpads don't count as 50 notches from one gesture.
  function deltaToNotches(deltaY) {
    var approx = deltaY / 100;
    if (approx > 3) approx = 3;
    if (approx < -3) approx = -3;
    return approx;
  }

  var notchProgress = 0;
  var collapsed = false;

  function applyCollapsed(next) {
    if (next === collapsed) return;
    collapsed = next;
    document.body.classList.toggle("hobbies-scrolled", collapsed);
  }

  // Count wheel notches
  window.addEventListener(
    "wheel",
    function (e) {
      // Only count if user is actually moving down/up
      var n = deltaToNotches(e.deltaY);

      // Down = accumulate toward trigger; Up = reduce
      notchProgress += n;

      // Bound it so it doesn't drift infinitely
      if (notchProgress < 0) notchProgress = 0;
      if (notchProgress > NOTCHES_TO_TRIGGER) notchProgress = NOTCHES_TO_TRIGGER;

      applyCollapsed(notchProgress >= NOTCHES_TO_TRIGGER);
    },
    { passive: true }
  );

  // Safety: if user drags scrollbar/touches, keep state consistent with top-of-page
  window.addEventListener(
    "scroll",
    function () {
      // If they return near top, reset everything
      if (window.scrollY < 40) {
        notchProgress = 0;
        applyCollapsed(false);
      }
    },
    { passive: true }
  );
})();
