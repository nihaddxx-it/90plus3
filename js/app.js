const body = document.body;
const intro = document.getElementById("intro");
const video = document.getElementById("introVideo");
const enter = document.getElementById("enterSite");

function finishIntro() {
  if (intro) intro.classList.add("is-finished");
}

function openHome() {
  body.classList.add("show-home");
  window.scrollTo(0, 0);
}

if (video) {
  video.addEventListener("ended", finishIntro);
  video.addEventListener("error", finishIntro);

  window.addEventListener("load", () => {
    const playPromise = video.play();
    if (playPromise && playPromise.catch) {
      playPromise.catch(() => finishIntro());
    }

    setTimeout(finishIntro, 3500);
  });
} else {
  finishIntro();
}

if (enter) {
  enter.addEventListener("click", openHome);
}

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const group = btn.parentElement;
    group.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

document.querySelectorAll(".product-card").forEach((card) => {
  card.addEventListener("pointerenter", () => card.classList.add("is-active"));
  card.addEventListener("pointerleave", () => card.classList.remove("is-active"));
});
