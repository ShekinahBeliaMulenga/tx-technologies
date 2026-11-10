// Service selection: the single source of truth for what the visitor has picked.
import { $$ } from "./dom.js";
import { STORAGE_KEY } from "./config.js";
import { safeStorage } from "./dom.js";

const checks = $$(".service-check");
const listeners = new Set();

export const onSelectionChange = (fn) => { listeners.add(fn); fn(getSelected()); };

export function getSelected() {
  return checks.filter((c) => c.checked).map((c) => {
    const card = c.closest(".service-card");
    return {
      value: c.value,
      estimate: c.dataset.estimate || "To be scoped",
      title: card.querySelector("h3").textContent.trim(),
      price: card.querySelector(".service-price strong").textContent.trim(),
    };
  });
}

export function deselect(value) {
  checks.forEach((c) => { if (c.value === value) c.checked = false; });
  sync();
}

function sync() {
  checks.forEach((c) => {
    const card = c.closest(".service-card");
    const label = c.closest(".service-select-label");
    const text = label.querySelector(".select-text");
    card.classList.toggle("is-selected", c.checked);
    text.textContent = c.checked ? text.dataset.on : text.dataset.off;
  });
  const selected = getSelected();
  safeStorage.set(STORAGE_KEY, JSON.stringify(selected.map((s) => s.value)));
  listeners.forEach((fn) => fn(selected));
}

export function initServices() {
  try {
    const saved = JSON.parse(safeStorage.get(STORAGE_KEY) || "[]");
    checks.forEach((c) => { c.checked = saved.includes(c.value); });
  } catch { /* ignore corrupt storage */ }
  checks.forEach((c) => c.addEventListener("change", sync));
  sync();
}
