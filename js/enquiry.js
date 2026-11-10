// Enquiry form: renders selected services as removable chips and builds the WhatsApp / email / copy message.
import { $ } from "./dom.js";
import { WHATSAPP_NUMBER, EMAIL_ADDRESS, EMAIL_SUBJECT } from "./config.js";
import { onSelectionChange, getSelected, deselect } from "./services.js";

const field = (id) => $(id).value.trim();

function buildMessage() {
  const email = field("#client-email");
  const org = field("#client-organisation");
  return [
    "Hello TX Digital Technologies, I would like to enquire about your services.",
    "",
    `Name: ${field("#client-name")}`,
    `My phone / WhatsApp: ${field("#client-phone")}`,
    email ? `Email: ${email}` : null,
    org ? `Business / organisation: ${org}` : null,
    "",
    "Selected service(s):",
    ...getSelected().map((s) => `• ${s.value} — ${s.estimate}`),
    "",
    "The displayed website package prices apply to the exact page counts and scopes listed. Extra pages, backend features, integrations, domain registration, paid hosting and third-party services are quoted separately. Please confirm the final scope and price against the requirements below.",
    `Project details: ${field("#project-details")}`,
    `Preferred timeframe: ${$("#project-timing").value}`,
    "",
    "Please let me know the next steps and any further information you need.",
  ].filter((l) => l !== null).join("\n");
}

export function initEnquiry() {
  const form = $("#enquiry-form");
  const status = $("#form-status");
  const list = $("#selected-list");
  const empty = $("#selected-empty");

  const say = (msg, isError = false) => {
    status.textContent = msg;
    status.classList.toggle("is-error", isError);
  };

  onSelectionChange((selected) => {
    $("#selected-count").textContent = selected.length
      ? `${selected.length} service${selected.length === 1 ? "" : "s"} selected` : "No services selected";
    $("#selected-note").textContent = selected.length
      ? "Estimates shown; additions are quoted separately" : "Select a service to request a quotation";
    empty.hidden = selected.length > 0;
    list.replaceChildren(...selected.map((s) => {
      const li = document.createElement("li");
      li.className = "chip";
      const text = document.createElement("span");
      text.innerHTML = `<strong></strong><small></small>`;
      text.firstChild.textContent = s.title;
      text.lastChild.textContent = s.price;
      const rm = document.createElement("button");
      rm.type = "button";
      rm.className = "chip-remove";
      rm.setAttribute("aria-label", `Remove ${s.title}`);
      rm.textContent = "×";
      rm.addEventListener("click", () => deselect(s.value));
      li.append(text, rm);
      return li;
    }));
    if (selected.length) say("");
  });

  function validate() {
    if (!getSelected().length) {
      say("Select at least one service before sending your enquiry.", true);
      $("#service-grid").scrollIntoView({ behavior: "smooth", block: "start" });
      return false;
    }
    if (!form.reportValidity()) return false;
    say("");
    return true;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) return;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, "_blank", "noopener,noreferrer");
    say("WhatsApp opened with your enquiry. Review the message and press Send.");
  });

  $("#email-submit").addEventListener("click", () => {
    if (!validate()) return;
    location.href = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(buildMessage())}`;
    say("Your email app should open with the enquiry filled in. If nothing happens, use “Copy message”.");
  });

  $("#copy-submit").addEventListener("click", async () => {
    if (!validate()) return;
    const text = buildMessage();
    try {
      await navigator.clipboard.writeText(text);
      say(`Message copied. Paste it into WhatsApp or an email to ${EMAIL_ADDRESS}.`);
    } catch {
      const ta = Object.assign(document.createElement("textarea"), { value: text });
      document.body.append(ta); ta.select();
      const ok = document.execCommand("copy"); ta.remove();
      say(ok ? "Message copied to your clipboard." : "Could not copy automatically. Please use WhatsApp or email instead.", !ok);
    }
  });
}
