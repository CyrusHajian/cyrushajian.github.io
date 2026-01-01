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

    // Ghost images are now in the parent container, not inside swap-stack
    const parentContainer = container.closest(".two-col-image");
    if (!parentContainer) return;

    const ghosts = parentContainer.querySelectorAll(".swap-stack__ghost");
    if (ghosts[0] && upcoming[0]) ghosts[0].src = upcoming[0];
    if (ghosts[1] && upcoming[1]) ghosts[1].src = upcoming[1];
  }

  function setCaption(container, captions, idx) {
    if (!container || captions.length === 0) return;

    // Caption may be in container or parent container
    let capEl = container.querySelector(".swap-caption");
    if (!capEl) {
      const parentContainer = container.closest(".two-col-image");
      if (parentContainer) {
        capEl = parentContainer.querySelector(".swap-caption");
      }
    }
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
        container.style.aspectRatio = `${aspectRatio}`;
        
        const parentContainer = container.closest(".two-col-image");
        if (!parentContainer) return;
        
        // Move caption outside container if not already moved
        const caption = container.querySelector(".swap-caption");
        if (caption && caption.parentElement === container) {
          container.removeChild(caption);
          parentContainer.appendChild(caption);
          parentContainer.classList.add("has-swap-container");
        }
        
        // Move ghost images outside black container to show peek effect
        const ghosts = Array.from(container.querySelectorAll(".swap-stack__ghost"));
        ghosts.forEach((ghost, index) => {
          if (ghost.parentElement === container) {
            container.removeChild(ghost);
            parentContainer.appendChild(ghost);
            // Position ghosts to peek out from top-right corner
            ghost.style.position = "absolute";
            ghost.style.width = "28%";
            ghost.style.maxWidth = "140px";
            ghost.style.aspectRatio = `${aspectRatio}`;
            ghost.style.borderRadius = "8px";
            ghost.style.opacity = "0.65";
            ghost.style.zIndex = "1";
            ghost.style.pointerEvents = "none";
            ghost.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.4)";
            ghost.style.objectFit = "cover";
            
            // Position first ghost at top-right, second slightly offset
            if (index === 0) {
              ghost.style.top = "6px";
              ghost.style.right = "6px";
            } else {
              ghost.style.top = "14px";
              ghost.style.right = "14px";
            }
          }
        });
        
        // Apply sizing to main image for centering
        img.style.width = "100%";
        img.style.maxHeight = "100%";
        img.style.height = "auto";
        img.style.objectFit = "contain";
        img.style.objectPosition = "center";
        img.style.display = "block";
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
