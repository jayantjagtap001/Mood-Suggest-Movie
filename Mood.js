const video = document.getElementById("video");
const scanBar = document.getElementById("scan-bar");
const detectBtn = document.getElementById("detectMood");
const resultDiv = document.getElementById("result");

const movies = {
  Happy: {
    name: "Welcome",
    link: "https://www.primevideo.com/detail/0MJFLZHIV04F9V9V21RAY2Z8ZZ/",
    thumbnail:
      "https://m.media-amazon.com/images/S/pv-target-images/af13e1c59556eb143d2b213c9f95567677f409033d4c9619c553367d71bee982._SX1920_FMwebp_.jpg",
  },
  Sad: {
    name: "Call me Bae",
    link: "https://www.primevideo.com/detail/0TF2BODX83KZOWTP08NXFE897E/",
    thumbnail:
      "https://m.media-amazon.com/images/S/pv-target-images/0cb7ac74d1d6e8eb2e3d59aa5354359714eb54d84fcfaa616d9de19d64b492ca._SX1920_FMwebp_.jpg",
  },
  Excited: {
    name: "Citadel Honey Bunny",
    link: "https://www.primevideo.com/detail/0KYRVT4JDB957NXZO72E2MIFW5",
    thumbnail:
      "https://m.media-amazon.com/images/S/pv-target-images/51c2c75da778c109ccc33ff293ff48f0cccc60b18c3fef8a42afe2a80e07acac._SX1920_FMwebp_.jpg",
  },
  Neutral: {
    name: "Farzi",
    link: "https://www.primevideo.com/detail/0HDHQAUF5LPWOJRCO025LFJSJI",
    thumbnail:
      "https://m.media-amazon.com/images/S/pv-target-images/8aed532f0875925f72c4012aab688ed409773ecbfb3b18e1a39cd9ad1a4dd485._SX1920_FMwebp_.jpg",
  },
  Angry: {
    name: "Agneepath",
    link: "https://www.primevideo.com/detail/0NU7IFXPL2WWSDHNGAR5Z1GUJE/",
    thumbnail:
      "https://images-eu.ssl-images-amazon.com/images/S/pv-target-images/1863426056ae862def9a69ca76e8af54cdb6b8a5a2be1100e096e59b00060847._UX1920_.png",
  },
};

async function initCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (err) {
    alert("Camera access denied.");
  }
}

function animateScanBar() {
  scanBar.style.top = "80px";
  scanBar.style.display = "block";
  gsap.fromTo(
    scanBar,
    {
      y: 60,
    },
    {
      y: 230,
      repeat: 2,
      yoyo: true,
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: () => (scanBar.style.display = "none"),
    }
  );
}

function getSnapshot() {
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);
  return canvas.toDataURL("image/jpeg");
}

async function detectMoodFromImage(base64Image) {
  const moods = ["Happy", "Sad", "Excited", "Angry", "Neutral"];
  const random = Math.floor(Math.random() * moods.length);
  return moods[random];
}

function showMovie(mood) {
  const movie = movies[mood] || movies["Neutral"];
  resultDiv.innerHTML = `
    <img src="${movie.thumbnail}" alt="${movie.name}" />
    <h3>${movie.name}</h3>
    <a href="${movie.link}" target="_blank">
      <button>Watch Now</button>
    </a>
    <button onclick="window.location.reload()">Scan Again</button>
  `;
}

detectBtn.addEventListener("click", async () => {
  animateScanBar();
  const image = getSnapshot();
  setTimeout(async () => {
    const mood = await detectMoodFromImage(image);
    showMovie(mood);
  }, 3500);
});

function showMoodSelector() {
  const moods = ["Happy", "Sad", "Excited", "Angry", "Neutral"];
  let buttons = moods
    .map((mood) => `<button onclick="showMovie('${mood}')">${mood}</button>`)
    .join("<br>");
  resultDiv.innerHTML = `
    <h3>Select Your Mood</h3>
    ${buttons}
  `;
}

window.onload = initCamera;
