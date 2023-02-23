const wrapper = document.getElementById("wrapper");
const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  //   scrollbar: {
  //     el: ".swiper-scrollbar",
  //   },
});
if (localStorage.images) {
  for (const src of JSON.parse(localStorage.images)) {
    // const img = document.createElement("img");
    // img.src = src;
    wrapper.innerHTML += `<div class="swiper-slide"><img src=${src} ></div>`;
  }
}
wrapper.childNodes.forEach((node, index) => {
  node.addEventListener("click", (e) => {
    const images = JSON.parse(localStorage.images);
    images.splice(index - 1, 1);
    localStorage.setItem("images", JSON.stringify(images));
    window.location.reload();
    // wrapper.removeChild(node);
  });
});
