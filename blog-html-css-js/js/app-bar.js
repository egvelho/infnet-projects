const appBarClock = document.querySelector("#app-bar-clock");

function updateClock() {
  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString();
  appBarClock.innerHTML = currentTime;
}

setInterval(updateClock, 1000);

let appBarClockIsFixed = false;
const clockMovement = 20;

appBarClock.addEventListener("keydown", (event) => {
  if (
    appBarClockIsFixed === false &&
    (event.key === "w" ||
      event.key === "s" ||
      event.key === "a" ||
      event.key === "d")
  ) {
    appBarClock.style.position = "fixed";
    appBarClock.style.top = 0;
    appBarClock.style.left = 0;
    appBarClockIsFixed = true;
  }

  if (event.key === "w") {
    appBarClock.style.top =
      parseInt(appBarClock.style.top) - clockMovement + "px";
    console.log("Cima");
  } else if (event.key === "s") {
    appBarClock.style.top =
      parseInt(appBarClock.style.top) + clockMovement + "px";
    console.log("Baixo");
  } else if (event.key === "a") {
    appBarClock.style.left =
      parseInt(appBarClock.style.left) - clockMovement + "px";
    console.log("Esquerda");
  } else if (event.key === "d") {
    appBarClock.style.left =
      parseInt(appBarClock.style.left) + clockMovement + "px";
    console.log("Direita");
  }
});
