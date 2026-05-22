const pages = Array.from(document.querySelectorAll(".page"));
const dots = Array.from(document.querySelectorAll(".mini-dot"));
const noButton = document.querySelector("#no-button");

function showPage(id) {
  pages.forEach((page) => page.classList.toggle("active", page.id === id));
  dots.forEach((dot) => dot.classList.toggle("active", dot.dataset.jump === id));
  window.scrollTo({ top: 0, behavior: "smooth" });

}

function showResponse(id) {
  const response = document.getElementById(id);
  if (!response) return;
  response.classList.remove("hidden");
  response.animate(
    [
      { transform: "scale(.88) rotate(-4deg)", opacity: 0 },
      { transform: "scale(1.06) rotate(2deg)", opacity: 1 },
      { transform: "scale(1) rotate(1deg)", opacity: 1 }
    ],
    { duration: 360, easing: "ease-out" }
  );
}

document.addEventListener("click", (event) => {
  const nextButton = event.target.closest("[data-next]");
  const jumpButton = event.target.closest("[data-jump]");
  const responseButton = event.target.closest("[data-response]");

  if (nextButton) {
    showPage(nextButton.dataset.next);
  }

  if (jumpButton) {
    showPage(jumpButton.dataset.jump);
  }

  if (responseButton) {
    showResponse(responseButton.dataset.response);
  }
});

if (noButton) {
  noButton.addEventListener("pointerenter", () => {
    const x = Math.round((Math.random() - 0.5) * 120);
    const y = Math.round((Math.random() - 0.5) * 90);
    noButton.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 24 - 12}deg)`;
  });

  noButton.addEventListener("click", () => {
    noButton.style.display = "none";
    showResponse("no-response");
  });
}

setInterval(() => {
  const activePage = document.querySelector(".page.active");
  if (!activePage) return;

  const sparkle = document.createElement("span");
  sparkle.className = "temporary-sparkle";
  sparkle.textContent = Math.random() > 0.5 ? "\u2661" : "\u2726";
  sparkle.style.left = `${12 + Math.random() * 76}%`;
  sparkle.style.top = `${18 + Math.random() * 66}%`;
  activePage.appendChild(sparkle);

  sparkle.animate(
    [
      { opacity: 0, transform: "translateY(10px) scale(.8) rotate(-10deg)" },
      { opacity: 1, transform: "translateY(-8px) scale(1.2) rotate(8deg)" },
      { opacity: 0, transform: "translateY(-34px) scale(.9) rotate(20deg)" }
    ],
    { duration: 1600, easing: "ease-out" }
  ).onfinish = () => sparkle.remove();
}, 1200);
