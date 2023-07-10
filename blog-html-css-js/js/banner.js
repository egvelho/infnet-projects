let bannerImgs = [];

const banner = document.querySelector("#banner");

let bannerImgsIndex = 0;
const changeImageInterval = 4000;

async function startBanner() {
  const response = await fetch("/json/banner.json");
  bannerImgs = await response.json();

  onBannerImageChange();
  setInterval(onBannerImageChange, changeImageInterval);
}

function onBannerImageChange() {
  const img = bannerImgs[bannerImgsIndex];
  banner.style.backgroundImage = `url(${img})`;

  if (bannerImgsIndex === bannerImgs.length - 1) {
    bannerImgsIndex = 0;
  } else {
    bannerImgsIndex++;
  }
}

startBanner();
