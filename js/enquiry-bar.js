// Sticky "Review enquiry" bar: visible while services are selected and the form is off-screen.
import { $ } from "./dom.js";
import { onSelectionChange } from "./services.js";

export function initEnquiryBar() {
  const bar = $("#enquiry-bar");
  const panel = $("#enquiry");
  if (!bar || !panel) return;
  let count = 0, panelVisible = false;

  const render = () => {
    const show = count > 0 && !panelVisible;
    bar.hidden = !show;
    document.body.classList.toggle("has-bar", show);
  };
  onSelectionChange((selected) => {
    count = selected.length;
    $("#bar-count").textContent = `${count} service${count === 1 ? "" : "s"}`;
    render();
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => { panelVisible = entry.isIntersecting; render(); },
      { rootMargin: "0px 0px -80px 0px" }).observe(panel);
  }
}
