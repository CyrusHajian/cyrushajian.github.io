---
title: "Hobbies"
layout: single
permalink: /hobbies/
author_profile: true
classes: [hobbies-page, wide]
page_js:
  - /assets/js/hobbies-image-swap.js

---
My passions outside of science and academia.

Although, science has a beautiful way of bleeding into everything.

## Hobbies

<div class="hobbies-interactive">
  <div class="hobbies-map" data-hobbies-map>
    <img
      src="{{ '/assets/images/hobbies-map-placeholder.svg' | relative_url }}"
      alt="Hobbies overview map placeholder"
    >
    <button class="hobbies-hotspot hs-learning" type="button" data-hobbies-target="hobby-learning">
      Learning
    </button>
    <button class="hobbies-hotspot hs-cooking" type="button" data-hobbies-target="hobby-cooking">
      Cooking
    </button>
    <button class="hobbies-hotspot hs-fishing" type="button" data-hobbies-target="hobby-fishing">
      Fishing
    </button>
    <button class="hobbies-hotspot hs-hiking" type="button" data-hobbies-target="hobby-hiking">
      Hiking
    </button>
  </div>

  <section class="hobby-detail" id="hobby-learning" hidden>
    <button class="hobby-back" type="button" data-hobbies-back>
      ← Back
    </button>
    <h3>Learning</h3>
    <p>I'm a curious person, and find joy in putting effort into learning or understanding the world. I enjoy approaching ideas from various angles, and discussing/building ideas and concepts with others.</p>
  </section>

  <section class="hobby-detail" id="hobby-cooking" hidden>
    <button class="hobby-back" type="button" data-hobbies-back>
      ← Back
    </button>
    <h3>Cooking</h3>
    <div class="two-col-bleed">
      <div class="two-col-text">
        <p>
          I have been cooking since I was very young, and it has become one of my most rewarding hobbies. Cooking has taught me to be methodical and patient, and to learn effectively from mistakes through iteration and practice. It has also given me a deep appreciation for other cultures and the ways food reflects history, tradition, and community.
        </p>
        <p>
          I enjoy experimenting with ingredients, learning new recipes, and teaching others what I learn along the way. I regularly cook for family and friends and am comfortable preparing a wide range of dishes across many cuisines, including Japanese, Italian, Mediterranean, Filipino, Chinese, Caribbean, Mexican, and Caribbean, among many more.
        </p>
        <p>
          I love iterating a recipe until it suits the taste of myself, or whomever I'm serving it to.
        </p>
      </div>
      <div class="two-col-image bleed-right">
        <figure class="swap-stack">
          <img
            class="js-swap-img swap-stack__main"
            src="{{ '/assets/images/cooking-placeholder-1.jpg' | relative_url }}"
            data-swap="{{ '/assets/images/cooking-placeholder-2.jpg' | relative_url }}, {{ '/assets/images/cooking-placeholder-3.jpg' | relative_url }}"
            data-captions="Cooking and experimenting with flavors, Preparing diverse cuisines, Sharing meals with family and friends"
            alt="Cooking"
          >
          <img
            class="swap-stack__ghost"
            src="{{ '/assets/images/cooking-placeholder-2.jpg' | relative_url }}"
            alt=""
            aria-hidden="true"
          >
          <figcaption class="swap-caption">
            Cooking and experimenting with flavors
          </figcaption>
        </figure>
      </div>
    </div>
  </section>

  <section class="hobby-detail" id="hobby-fishing" hidden>
    <button class="hobby-back" type="button" data-hobbies-back>
      ← Back
    </button>
    <h3>Fishing</h3>
    <div class="two-col-bleed">
      <div class="two-col-text">
        <p>
          Fishing has always been one of my favorite ways to experience nature. I am an experienced surf, lake, and river fisherman. For shark fishing, I make steel leaders for myself and others. I find the strategy for fishing fascinating, changing baits to reflect the target species' prey, surveying surroundings to find places fish will likely be, and the overall idea of using a hidden line attached to bait with the goal of enticing a predator into attacking it... (maybe I'm just weird). Anyways, fishing tends to take me to some beautiful places.
        </p>
      </div>
      <div class="two-col-image bleed-right">
        <figure class="swap-stack">
          <img
            class="js-swap-img swap-stack__main"
            src="{{ '/assets/images/bodegafishing.jpg' | relative_url }}"
            data-swap="{{ '/assets/images/bodegafishing_2.png' | relative_url }}"
            data-captions="a conversation at a small market led to a secret midnight fishing spot, calm water at dusk from the kayak"
            alt="Fishing"
          >
          <img
            class="swap-stack__ghost"
            src="{{ '/assets/images/bodegafishing_2.png' | relative_url }}"
            alt=""
            aria-hidden="true"
          >
          <figcaption class="swap-caption">
            a conversation at a small market led to a secret midnight fishing spot
          </figcaption>
        </figure>
      </div>
    </div>
  </section>

  <section class="hobby-detail" id="hobby-hiking" hidden>
    <button class="hobby-back" type="button" data-hobbies-back>
      ← Back
    </button>
    <h3>Hiking</h3>
    <div class="two-col-bleed">
      <div class="two-col-text">
        <p>
          Aside from the general beauty of nature, I find plants and animals fascinating. Beautiful places tend to be remote, and I love journeying to these places, often with friends. The forests and beaches of the Pacific Northwest have my heart.
        </p>
      </div>
      <div class="two-col-image bleed-right">
        <figure class="swap-stack">
          <img
            class="js-swap-img swap-stack__main"
            src="{{ '/assets/images/mountain.jpg' | relative_url }}"
            data-swap="{{ '/assets/images/hiking-placeholder-1.jpg' | relative_url }}, {{ '/assets/images/hiking-placeholder-2.jpg' | relative_url }}"
            data-captions="Exploring the natural beauty of the Pacific Northwest, Hiking in the Pacific Northwest, Nature exploration"
            alt="Hiking"
          >
          <img
            class="swap-stack__ghost"
            src="{{ '/assets/images/hiking-placeholder-1.jpg' | relative_url }}"
            alt=""
            aria-hidden="true"
          >
          <figcaption class="swap-caption">
            Exploring the natural beauty of the Pacific Northwest
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</div>