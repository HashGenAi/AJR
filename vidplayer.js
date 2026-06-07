var player = document.getElementById("vp1-videoPlayer");
var posterImg = document.getElementById("vp1-posterImg");
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

/* =========================
   FIXED POSTER (ONLY CHANGE)
========================= */
(function setPoster() {

  const img =
    document.querySelector("#detailContent img");  // ✅ FIXED LINE ONLY

  if (img && img.src) {
    posterImg.src = img.src;
  } else {
    posterImg.src =
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";
  }

})();

/* =========================
   PREPARE LINK
========================= */
(function prepare() {

  var btn =
    document.querySelector(".button-link[data-url]");

  if (!btn) return;

  var parts = btn.dataset.url.split("|");

  var path = parts[0];
  domainKey = parts[1];

  var domain = domains[domainKey];

  if (!domain || !path) return;

  finalLink = domain + path;

})();

/* =========================
   START VIDEO
========================= */
async function startVideo() {

  if (initialized) return;
  initialized = true;

  posterImg.style.display = "none";
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

posterImg.addEventListener("click", triggerPlay);
playBtn.addEventListener("click", triggerPlay);
player.addEventListener("play", startVideo, { once: true });
