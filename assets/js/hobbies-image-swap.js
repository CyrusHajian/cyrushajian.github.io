// assets/js/hobbies-image-swap.js
// Click an image to cycle through sources in data-swap.
// If wrapped in .swap-stack, keeps the "ghost" images updated as a cue.

(function () {
  function parseSwapList(str) {
    return (str || "")
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);
  }

  function setGhosts(container, upcoming) {
    if (!container) return;

    const g1 = container.querySelector(".swap-stack__ghost:not(.swap-stack__ghost--2)");
    const g2 = container.querySelector(".swap-stack__ghost--2");

    if (g1 && upcoming[0]) g1.src = upcoming[0];
    if (g2 && upcoming[1]) g2.src = upcoming[1];
  }

  function initSwap(img) {
    const swaps = parseSwapList(img.getAttribute("data-swap"));
    if (swaps.length === 0) return;

    const container = img.closest(".swap-stack");
    const initialSrc = img.getAttribute("src");
    const cycle = [initialSrc, ...swaps];

    let idx = 0;

    // Initialize ghosts to the next two images in the cycle
    setGhosts(container, [cycle[(idx + 1) % cycle.length], cycle[(idx + 2) % cycle.length]]);

    img.addEventListener("click", function () {
      idx = (idx + 1) % cycle.length;
      img.setAttribute("src", cycle[idx]);

      // Update ghosts to show what's coming next
      setGhosts(container, [cycle[(idx + 1) % cycle.length], cycle[(idx + 2) % cycle.length]]);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("img.js-swap-img").forEach(initSwap);
  });
})();
