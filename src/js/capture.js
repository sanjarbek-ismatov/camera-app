const video = document.querySelector("#video");
const takePhotoButton = document.querySelector("#takePhoto");
const imageContainer = document.getElementById("image-container");
navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then((stream) => {
    video.srcObject = stream;
    video.play();
  });
// if (localStorage.images) {
//   for (let src of JSON.parse(localStorage.images)) {
//     const image = document.createElement("img");
//     image.src = src;

//     document.body.appendChild(image);
//   }
// }
function gallery() {
  imageContainer.classList = "position-absolute top-0 start-0 w-100";
  imageContainer.childNodes.forEach((child, key) => {
    child.className = "img-fluid w-100";
  });
}
function takePhoto() {
  video.classList.add("capture");
  // document.documentElement.requestFullscreen();
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.height = video.videoHeight;
  canvas.width = video.videoWidth;
  context.drawImage(video, 0, 0);
  const image = document.createElement("img");
  const base64 = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  image.src = base64;

  if (localStorage.images) {
    const images = JSON.parse(localStorage.getItem("images"));
    if (images.length < 5)
      localStorage.setItem("images", JSON.stringify([...images, base64]));
    else {
      return alert("Limitdan oshib ketdi");
    }
  } else {
    localStorage.setItem("images", JSON.stringify([base64]));
  }
  const animationImage = image.cloneNode(true);
  animationImage.className += "first-image";
  image.className += "second-image position-absolute";
  imageContainer.appendChild(image);
  document.getElementById("video-container").appendChild(animationImage);
  setTimeout(() => video.classList.remove("capture"), 2000);
}

takePhotoButton.addEventListener("click", takePhoto);
