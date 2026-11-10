// Screenshot lightbox with keyboard, button and swipe navigation. Links still work without JS.
import { $, $$ } from "./dom.js";

export function initLightbox() {
  const shots = $$(".txmate-shot");
  if (!shots.length || typeof HTMLDialogElement === "undefined") return;

  const dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.setAttribute("aria-label", "TXMate screenshots");
  dialog.innerHTML = `
    <button class="lb-btn lb-close" type="button" aria-label="Close">×</button>
    <button class="lb-btn lb-prev" type="button" aria-label="Previous screenshot">‹</button>
    <figure><img alt=""><figcaption></figcaption></figure>
    <button class="lb-btn lb-next" type="button" aria-label="Next screenshot">›</button>`;
  document.body.append(dialog);
  const img = $("img", dialog), caption = $("figcaption", dialog);
  let index = 0, opener = null;

  const show = (i) => {
    index = (i + shots.length) % shots.length;
    const shot = shots[index];
    const thumb = $("img", shot);
    img.src = shot.getAttribute("href");
    img.alt = thumb.alt;
    caption.textContent = `${$("span", shot).textContent} · ${index + 1} / ${shots.length}`;
  };

  shots.forEach((shot, i) => shot.addEventListener("click", (e) => {
    e.preventDefault();
    opener = shot; show(i); dialog.showModal();
  }));
  $(".lb-close", dialog).addEventListener("click", () => dialog.close());
  $(".lb-prev", dialog).addEventListener("click", () => show(index - 1));
  $(".lb-next", dialog).addEventListener("click", () => show(index + 1));
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener("close", () => opener?.focus());
  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
  let startX = null;
  dialog.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
  dialog.addEventListener("touchend", (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
    startX = null;
  });
}
