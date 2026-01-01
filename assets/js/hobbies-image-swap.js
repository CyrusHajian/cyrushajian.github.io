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

    // Find the largest image in the set to determine the fixed aspect ratio
    function findLargestImageAspectRatio(callback) {
      const imagePromises = cycle.map(src => {
        return new Promise((resolve) => {
          const testImg = new Image();
          testImg.onload = function() {
            resolve({
              src: src,
              width: this.naturalWidth,
              height: this.naturalHeight,
              area: this.naturalWidth * this.naturalHeight,
              aspectRatio: this.naturalWidth / this.naturalHeight
            });
          };
          testImg.onerror = function() {
            resolve(null);
          };
          testImg.src = src;
        });
      });

      Promise.all(imagePromises).then(results => {
        const validResults = results.filter(r => r !== null);
        if (validResults.length === 0) return;

        // Find the image with the largest area
        const largest = validResults.reduce((max, current) => 
          current.area > max.area ? current : max
        );

        callback(largest.aspectRatio);
      });
    }

    // Lock aspect ratio based on the largest image
    function lockAspectRatio(aspectRatio) {
      if (!aspectRatio) return;

      // Apply aspect ratio and styling to container
      if (container) {
        container.classList.add("has-swap-images");
        // Note: aspect-ratio on container will determine the image area height
        // The padding-bottom for caption is separate and adds space below
        container.style.aspectRatio = `${aspectRatio}`;
        
        // Apply sizing to main image
        img.style.width = "100%";
        img.style.height = "auto";
        img.style.objectFit = "contain";
        img.style.display = "block";
        
        // Apply same aspect ratio hint to ghost images for consistent sizing
        const ghosts = container.querySelectorAll(".swap-stack__ghost");
        ghosts.forEach(ghost => {
          ghost.style.objectFit = "contain";
        });
      }
    }

    // Find largest image and lock aspect ratio
    findLargestImageAspectRatio(lockAspectRatio);

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
