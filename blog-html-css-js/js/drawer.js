let botaozinhoAppBar = document.getElementById("app-bar-open-drawer-button");

let drawer = document.querySelector("#drawer");

botaozinhoAppBar.addEventListener("click", () => {
  if (drawer.style.right === "0px") {
    drawer.style.right = "-256px";
  } else {
    drawer.style.right = "0px";
  }
});
