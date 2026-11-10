TX DIGITAL TECHNOLOGIES + TX ACADEMY - NETLIFY WEBSITE

PROJECT STRUCTURE (modular)
- src/index.template.html   page skeleton: lists which CSS files and sections to include
- src/partials/*.html       one file per section (header, hero, services, process, work, academy, contact, footer, enquiry-bar)
- css/*.css                 one stylesheet per section, plus base, components, responsive and ux
- js/*.js                   ES modules: config (phone/email), nav, services, enquiry, enquiry-bar, lightbox, main
- build.mjs                 joins the template and partials into index.html (no dependencies)
- index.html                GENERATED output - this is what gets published

EDITING WORKFLOW
1. Edit a partial (e.g. src/partials/services.html), a CSS file or a JS module.
2. Run:  node build.mjs   (needed after changing the template, partials or JS; CSS changes need no rebuild)
3. Publish the folder (Netlify drop, or Git deploy - netlify.toml already runs the build command).
Common edits: contact number/email -> js/config.js; a service or price -> src/partials/services.html (card text and the
data-estimate attribute on its checkbox); course or timetable -> src/partials/academy.html (keep the data-label attributes).
JS: edit the modules in js/ (not js/app.js). build.mjs bundles them into js/app.js, so you MUST run `node build.mjs` after JS changes too. The site works when index.html is opened directly from disk.

FILES
- index.html: responsive one-page website, services and interactive enquiry form
- tx-academy-logo.png: cropped TX Academy logo from the poster supplied by the owner
- favicon.svg: browser tab icon
- thank-you.html: optional confirmation page retained for future form workflows

PUBLISH FOR FREE
0. If you changed any partial or the template, run: node build.mjs
1. Extract this ZIP file.
2. Sign in to https://app.netlify.com/ or create a free account.
3. Open https://app.netlify.com/drop.
4. Drag the extracted tx-technologies-netlify folder into the drop area.
5. Netlify will publish the site and provide a free *.netlify.app address.
6. No build command or publish directory configuration is required. This is a static HTML, CSS and JavaScript site.

SERVICE ENQUIRIES
- Visitors select one or more services. Each selected service carries its displayed indicative starting estimate into the enquiry message.
- They provide their name, phone number, optional email and organisation, project details and preferred timeframe.
- The site prepares a WhatsApp message to +260 777 918 434 or an email to shekinahbeliamulenga@gmail.com.
- The selected services and the visitor's details are included in the prepared message.
- Visitors review and send the message themselves. The static site does not store enquiries.
- The service rates are indicative starting estimates in ZMW for the baseline scopes described on the website. Final written quotations are confirmed after scope review. Larger scopes, travel, hardware, hosting, domains, licences and third-party charges may be extra.

SERVICES DISPLAYED
- Website design
- Web development
- Portfolio website
- Database design
- Network troubleshooting
- IT consulting
- Portfolio review and advice
- Custom software and systems

INDICATIVE SERVICE STARTING PRICES (ZMW)
- Website UI design: from K2,500 (up to 5 page layouts; design only, development excluded)
- Static one-page website: K1,500 (one scrolling page with Home, About, Services, Gallery/Projects and Contact sections; responsive, basic SEO, two revision rounds)
- Business website development: K5,000 (exactly 5 pages: Home, About, Services, Portfolio/Gallery and Contact; responsive, contact links, basic SEO, two revision rounds; informational static build)
- Portfolio website: from K3,500 (starter portfolio, up to 4 pages/sections)
- Database design: from K2,500 (small relational database design and SQL scripts)
- Network troubleshooting: K350 remote first hour; on-site from K750 (travel and hardware extra)
- IT consulting: K500 per 60-minute online session
- Portfolio review and advice: K350 per 45-minute review
- Custom software and systems: from K10,000 for a small, clearly scoped project

The K1,500 one-page and K5,000 five-page website packages are deliberately scope-limited. Neither includes CMS, user accounts, booking, e-commerce, payments, custom backend/database features, custom domain or paid hosting. A free Netlify subdomain may be used where suitable. The database-design and portfolio-review figures are proposed TX Digital Technologies prices because directly comparable local public price lists were limited. All service scope and prices are confirmed in writing before work begins.

TX ACADEMY CONTENT
The separate TX Academy section uses the logo, five course names, K250 per-course fee and weekday online timetable from the poster supplied by the owner. The listed courses are Programming Fundamentals, Statistical Modelling, Networks & Data Communication, Web Development and Relational Database Design Fundamentals.

CONTACT DETAILS
WhatsApp: 0777918434 (international link: +260 777 918 434)
Email: shekinahbeliamulenga@gmail.com
LinkedIn: https://www.linkedin.com/in/shekinah-belia-mulenga-7873052a1/

BEFORE PUBLISHING
- Confirm that the service descriptions reflect what you currently offer.
- Confirm that the TX Academy course schedule and availability are current.
- Test the WhatsApp and email enquiry buttons on desktop and mobile.
- Review and approve the published indicative starting estimates before launch. They are recommended launch prices informed by publicly listed Zambian provider rates, not externally audited market averages.

WEBSITE PACKAGE DEFINITIONS
- K1,500 static website: one scrolling page with Home, About, Services, Gallery/Projects and Contact sections; responsive layout, basic on-page SEO and two revision rounds. Client provides final text and images.
- K5,000 business website: exactly five pages: Home, About, Services, Portfolio/Gallery and Contact; responsive layout, navigation, WhatsApp/email contact links, basic on-page SEO and two revision rounds. Client provides final text and images.
- Both are informational static websites. CMS, dashboards, accounts, online payments, booking, e-commerce, custom databases/backend functionality, extra pages, domain purchase and paid hosting are not included and require a separate quote.

UX IMPROVEMENTS IN THIS VERSION
- Readable text: the original used 8-11px type in many places; minimum is now 11-12px and body copy 13-15px. Form fields are 16px on phones (stops iOS zooming on focus).
- Navigation: hamburger menu now covers tablets (up to 900px), closes on Escape / outside tap / link tap, highlights the current section, and has a skip-to-content link.
- Services: one tap on a full-width "Add to enquiry" button (48px target); single column on phones; selection is remembered for the session.
- Enquiry: selected services appear as removable chips with their prices beside the form; a sticky "Review enquiry" bar appears while services are selected; "Copy message" fallback for devices with no email app; clearer inline error and status messages.
- Projects: screenshots are a swipeable strip on phones and open in a lightbox (arrow keys, swipe, Esc).
- TX Academy: course list and timetable restack into readable cards on phones instead of side-scrolling.
- Fixes: hero diagram labels were unreadable (maroon on maroon); favicon and logo paths are now relative.
