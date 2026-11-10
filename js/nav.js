import { $, $$ } from "./dom.js";

export function initNav() {
  const header = $(".site-header");
  const button = $(".menu-toggle");
  const nav = $("#site-navigation");
  if (!button || !nav) return;

  const setOpen = (open) => {
    button.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
  };
  const isOpen = () => button.getAttribute("aria-expanded") === "true";

  button.addEventListener("click", () => setOpen(!isOpen()));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) { setOpen(false); button.focus(); }
  });
  document.addEventListener("click", (e) => {
    if (isOpen() && !e.target.closest(".site-header")) setOpen(false);
  });
  matchMedia("(min-width: 901px)").addEventListener("change", () => setOpen(false));

  // Header shadow once the page scrolls.
  const onScroll = () => header.classList.toggle("is-scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Scroll-spy: mark the nav link for the section in view.
  const links = $$('a[href^="#"]', nav).filter((a) => a.getAttribute("href").length > 1 && !a.classList.contains("nav-cta"));
  const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
  const sections = [...map.keys()].map((id) => document.getElementById(id)).filter(Boolean);
  if (!("IntersectionObserver" in window) || !sections.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => a.removeAttribute("aria-current"));
      map.get(entry.target.id)?.setAttribute("aria-current", "true");
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach((s) => io.observe(s));
}
