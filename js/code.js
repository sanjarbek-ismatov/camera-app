const video = document.querySelector("#video");
const takePhotoButton = document.querySelector("#takePhoto");
navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then((stream) => {
    video.srcObject = stream;
    video.play();
  });
function takePhoto() {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.height = video.videoHeight;
  canvas.width = video.videoWidth;

  context.drawImage(video, 0, 0);
  const image = document.createElement("img");
  const base64 = canvas.toDataURL("image/png");
  const images = JSON.parse(localStorage.getItem("images"));
  if (!images) {
    localStorage.setItem("images", JSON.stringify([base64]));
  } else {
    images.push(base64);
  }
  localStorage.setItem("images", JSON.stringify(images));
  document.body.appendChild(image);
}
takePhotoButton.addEventListener("click", takePhoto);
