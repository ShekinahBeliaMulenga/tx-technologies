import { $ } from "./dom.js";
import { initNav } from "./nav.js";
import { initServices } from "./services.js";
import { initEnquiry } from "./enquiry.js";
import { initEnquiryBar } from "./enquiry-bar.js";
import { initLightbox } from "./lightbox.js";

initServices();   // must run first: other modules subscribe to its selection state
initEnquiry();
initEnquiryBar();
initNav();
initLightbox();
const year = $("#year");
if (year) year.textContent = new Date().getFullYear();
