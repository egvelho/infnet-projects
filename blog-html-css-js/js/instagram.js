const instagramGrid = document.querySelector("#instagram-grid");
const instagramBackdrop = document.querySelector("#instagram-backdrop");

const instagramModalImage = document.querySelector("#instagram-modal-image");
const instagramModalTitle = document.querySelector("#instagram-modal-title");
const instagramModalText = document.querySelector("#instagram-modal-text");

const instagramModalCloseButton = document.querySelector(
  "#instagram-modal-close-button"
);
const instagramModalDeleteButton = document.querySelector(
  "#instagram-modal-delete-button"
);

instagramModalCloseButton.onclick = () => {
  instagramBackdrop.className = "instagram-backdrop";
};

async function loadInstagramImages() {
  const response = await fetch("/json/instagram.json");
  const instagramImages = await response.json();

  instagramImages.forEach((cat) => {
    let instagramImage = document.createElement("img");
    instagramImage.src = cat.thumbnail;
    instagramImage.className = "instagram-image";

    instagramImage.onclick = () => {
      instagramBackdrop.className = "instagram-backdrop open";
      instagramModalImage.src = cat.thumbnail;
      instagramModalTitle.innerHTML = cat.title;
      instagramModalText.innerHTML = cat.text;

      instagramModalDeleteButton.onclick = () => {
        instagramBackdrop.className = "instagram-backdrop";
        instagramGrid.removeChild(instagramImage);
      };
    };

    instagramGrid.appendChild(instagramImage);
  });
}

loadInstagramImages();
