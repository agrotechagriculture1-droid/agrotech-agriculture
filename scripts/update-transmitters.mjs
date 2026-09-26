import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const cataloguePath = join(root, "dist", "transmitters", "index.html");
const dataPath = join(root, "scripts", "transmitters-data.json");
const products = JSON.parse(await readFile(dataPath, "utf8"));
let catalogue = await readFile(cataloguePath, "utf8");

const esc = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");

function catalogueCard(product) {
  return [
    '          <article class="product-card" id="' + product.slug + '">',
    '            <img class="product-card-image" src="' + product.image + '" alt="' + esc(product.title) + '" loading="lazy">',
    '            <div class="product-card-body"><span class="product-category">' + esc(product.category) + '</span><h2 class="product-title">' + esc(product.title) + '</h2><p class="product-description">' + esc(product.cardDescription) + '</p><a class="text-link" href="/transmitters/' + product.slug + '/">View details <span aria-hidden="true">→</span></a></div>',
    '          </article>'
  ].join("\n");
}

const introPattern = /(<section class="product-intro transmitter-intro"[\s\S]*?<h1 id="transmitters-page-heading">)[\s\S]*?(<\/h1>\s*<p>)[\s\S]*?(<\/p>)/;
catalogue = catalogue.replace(
  introPattern,
  '$1Laser Transmitters$2Explore Agrotech&#39;s rotary laser transmitter range for accurate agricultural land levelling and field-grade reference work.$3'
);
catalogue = catalogue.replace(
  'aria-label="Agrotech transmitter and control-system range"',
  'aria-label="Agrotech laser transmitter range"'
);
catalogue = catalogue.replace(
  /<div class="product-grid transmitter-product-grid">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/,
  '<div class="product-grid transmitter-product-grid">\n' + products.map(catalogueCard).join("\n") + '\n        </div>\n      </div>\n    </section>'
);
await writeFile(cataloguePath, catalogue, "utf8");

const headerMatch = catalogue.match(/<header class="site-header">[\s\S]*?<\/header>/);
const footerMatch = catalogue.match(/<footer class="site-footer">[\s\S]*?<\/footer>/);
if (!headerMatch || !footerMatch) throw new Error("Could not read the shared header or footer.");
const header = headerMatch[0];
const footer = footerMatch[0];

function relatedCards(current) {
  return products
    .filter((product) => product.slug !== current.slug)
    .map((product) =>
      '<article class="related-transmitter-card">' +
      '<img src="' + product.image + '" alt="' + esc(product.title) + '" loading="lazy">' +
      '<div><span class="product-category">' + esc(product.category) + '</span>' +
      '<h3>' + esc(product.title) + '</h3>' +
      '<a class="text-link" href="/transmitters/' + product.slug + '/">View details <span aria-hidden="true">→</span></a></div>' +
      '</article>'
    ).join("");
}

function detailPage(product) {
  const gallery = product.images.map((item, index) =>
    '<figure class="product-detail-photo' + (index === 0 ? ' is-main' : '') + '">' +
    '<img src="' + item[0] + '" alt="' + esc(item[1]) + '" loading="' + (index === 0 ? 'eager' : 'lazy') + '">' +
    '<figcaption>' + esc(item[1]) + '</figcaption></figure>'
  ).join("");
  const features = product.features.map((item) => '<li>' + esc(item) + '</li>').join("");
  const applications = product.applications.map((item) => '<li>' + esc(item) + '</li>').join("");
  const specs = product.specs.map((item) =>
    '<div class="transmitter-spec-row"><dt>' + esc(item[0]) + '</dt><dd>' + esc(item[1]) + '</dd></div>'
  ).join("");

  return [
    '<!doctype html>',
    '<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">',
    '<title>' + esc(product.title) + ' | Agrotech Agriculture</title>',
    '<meta name="description" content="Explore ' + esc(product.title) + ' images, applications and product details from Agrotech Agriculture.">',
    '<link rel="icon" href="/assets/agrotech-mark.png" type="image/png"><link rel="stylesheet" href="/assets/site.css"><script src="/assets/site.js" defer></script></head>',
    '<body><a class="skip-link" href="#main">Skip to content</a>' + header + '<main id="main">',
    '<div class="container product-detail-breadcrumb"><a href="/transmitters/">Transmitters</a><span aria-hidden="true">/</span><span aria-current="page">' + esc(product.title) + '</span></div>',
    '<section class="product-detail-top" aria-labelledby="product-heading"><div class="container product-detail-top-inner"><div class="product-detail-heading"><span class="product-category">' + esc(product.category) + '</span><h1 id="product-heading">' + esc(product.title) + '</h1><p>' + esc(product.tagline) + '</p><a class="button primary" href="/contact/?product=' + product.slug + '">Request product details <span aria-hidden="true">→</span></a></div><div class="product-detail-primary-media"><img src="' + product.image + '" alt="' + esc(product.title) + '"></div></div></section>',
    '<section class="section product-detail-section transmitter-detail-gallery"><div class="container"><div class="product-detail-section-heading"><span class="eyebrow">PRODUCT IMAGES</span><h2>A closer look</h2></div><div class="product-detail-gallery" aria-label="' + esc(product.title) + ' images">' + gallery + '</div></div></section>',
    '<section class="section tint product-detail-content"><div class="container product-detail-content-grid transmitter-detail-overview"><div><span class="eyebrow">PRODUCT OVERVIEW</span><h2>About the ' + esc(product.title) + '</h2><p>' + esc(product.description) + '</p><h3>Key features</h3><ul class="transmitter-feature-list">' + features + '</ul></div><aside class="product-detail-use"><h2>Applications</h2><ul>' + applications + '</ul></aside></div></section>',
    '<section class="section product-detail-section"><div class="container product-detail-content-grid"><div><span class="eyebrow">TECHNICAL DETAILS</span><h2>Product specifications</h2><p>Published values are used where manufacturer data is available. Agrotech confirms the supplied model, compatibility and final specifications before ordering.</p></div><dl class="transmitter-spec-panel">' + specs + '</dl></div></section>',
    '<section class="related-transmitter-section" aria-labelledby="related-heading"><div class="container"><div class="related-transmitter-heading"><div><span class="eyebrow">TRANSMITTER RANGE</span><h2 id="related-heading">Related Products</h2></div><a class="text-link" href="/transmitters/">View all transmitters <span aria-hidden="true">→</span></a></div><div class="related-transmitter-grid transmitter-only-grid">' + relatedCards(product) + '</div></div></section>',
    '</main>' + footer + '</body></html>'
  ].join("\n");
}

for (const product of products) {
  const directory = join(root, "dist", "transmitters", product.slug);
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, "index.html"), detailPage(product), "utf8");
}

for (const obsolete of ["automatic-control-unit", "transmitter-tripod-setup", "receiver-mounting-system", "complete-levelling-system"]) {
  await rm(join(root, "dist", "transmitters", obsolete), { recursive: true, force: true });
}

console.log("Updated the transmitter catalogue and generated " + products.length + " transmitter detail pages.");
