// assets/js/hobbies-image-swap.js
// Click an image to cycle through sources in data-swap.
// If wrapped in .swap-stack, keeps the "ghost" images and caption updated.

(function () {
  function parseList(str) {
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

  function setCaption(container, captions, idx) {
    if (!container || captions.length === 0) return;

    const capEl = container.querySelector(".swap-caption");
    if (!capEl) return;

    // captions correspond to cycle positions: [0]=initial, [1]=first swap, [2]=second swap...
    capEl.textContent = captions[idx] || captions[0] || "";
  }

  function initSwap(img) {
    const swaps = parseList(img.getAttribute("data-swap"));
    if (swaps.length === 0) return;

    const container = img.closest(".swap-stack");
    const initialSrc = img.getAttribute("src");
    const cycle = [initialSrc, ...swaps];

    const captions = parseList(img.getAttribute("data-captions"));
    let idx = 0;

    // Initialize ghosts and caption
    setGhosts(container, [cycle[(idx + 1) % cycle.length], cycle[(idx + 2) % cycle.length]]);
    setCaption(container, captions, idx);

    img.style.cursor = "pointer";

    // Lock aspect ratio to prevent layout shifts when images swap
    function lockAspectRatio() {
      if (img.naturalWidth && img.naturalHeight) {
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        img.style.aspectRatio = `${aspectRatio}`;
        img.style.objectFit = "contain";
      }
    }

    // Set aspect ratio when image loads (handles both already-loaded and loading images)
    if (img.complete && img.naturalWidth) {
      lockAspectRatio();
    } else {
      img.addEventListener("load", lockAspectRatio, { once: true });
    }

    img.addEventListener("click", function () {
      idx = (idx + 1) % cycle.length;
      img.setAttribute("src", cycle[idx]);

      setGhosts(container, [cycle[(idx + 1) % cycle.length], cycle[(idx + 2) % cycle.length]]);
      setCaption(container, captions, idx);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("img.js-swap-img").forEach(initSwap);
  });
})();
