var player = document.getElementById("vp1-videoPlayer");
var poster = document.getElementById("vp1-poster");
var playBtn = document.getElementById("vp1-playBtn");

var domains = {
  d1: "https://1fichier.com",
  d2: "https://dailyuploads.net",
  d3: "https://nitroflare.com",
  d4: "https://mixdrop.top",
  d5: "https://hashgen.website",
  d6: "https://www.messycloud.ink"
};

var workerUrl = "https://messyextract.salim1monira.workers.dev/?url=";

let finalLink = null;
let domainKey = null;
let initialized = false;

/* SET THUMBNAIL */
(function setPoster() {
  const img = document.querySelector(".post-thumbnail img");
  if (img && img.src) {
    poster.style.backgroundImage = `url(${img.src})`;
  } else {
    poster.style.background = "#000";
  }
})();

/* PREPARE LINK */
(function prepare() {
  var btn = document.querySelector(".button-link[data-url]");
  if (!btn) return;

  var parts = btn.dataset.url.split("|");

  var path = parts[0];
  domainKey = parts[1];

  var domain = domains[domainKey];

  if (!domain || !path) return;

  finalLink = domain + path;
})();

/* LOAD ONLY ON PLAY */
async function startVideo() {

  if (initialized) return;
  initialized = true;

  poster.style.display = "none";
  playBtn.style.display = "none";

  if (!finalLink) return;

  if (domainKey !== "d6") {
    player.src = finalLink;
    player.play().catch(() => {});
    return;
  }

  try {
    const res = await fetch(workerUrl + encodeURIComponent(finalLink));
    const data = await res.json();

    if (data.success && data.downloadUrl) {
      player.src = data.downloadUrl;
      player.play().catch(() => {});
    }
  } catch (e) {}
}

/* EVENTS */
function triggerPlay() {
  startVideo();
}

poster.addEventListener("click", triggerPlay);
playBtn.addEventListener("click", triggerPlay);
player.addEventListener("play", startVideo, { once: true });
