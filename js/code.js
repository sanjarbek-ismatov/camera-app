const video = document.querySelector("#video");
const takePhotoButton = document.querySelector("#takePhoto");
navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then((stream) => {
    video.srcObject = stream;
    video.play();
  });
if (localStorage.images) {
  for (let src of JSON.parse(localStorage.images)) {
    const image = document.createElement("img");
    image.src = src;

    document.body.appendChild(image);
  }
}
function takePhoto() {
  document.documentElement.requestFullscreen();
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
    else alert("Limitdan oshib ketdi");
  } else {
    localStorage.setItem("images", JSON.stringify([base64]));
  }
  document.getElementById("images").appendChild(image);
}

takePhotoButton.addEventListener("click", takePhoto);
