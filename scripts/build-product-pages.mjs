import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const products = [
  {
    slug: 'super-seeder', name: 'Super Seeder', category: 'Seeding',
    summary: 'Prepare the seedbed and place seed in a single field pass, including fields with leftover crop residue.',
    overview: 'A Super Seeder brings soil preparation and seed placement together. Its working parts manage surface residue, loosen the upper soil and place seed behind the tractor. It is commonly considered when a grower wants to establish the next crop after harvest with fewer separate field operations.',
    steps: ['Works through the upper soil and remaining crop residue.', 'Places seed as the machine travels across the prepared field.', 'Leaves the field ready for the next stage of crop establishment.'],
    uses: ['Sowing after a previous crop has been harvested', 'Working in fields with manageable surface residue', 'Reducing the number of separate preparation and sowing passes'],
    confirm: ['Available working width and row spacing', 'Seed-metering options and supported crops', 'Tractor power and PTO requirements', 'Residue and soil conditions suited to the selected model'],
    images: [
      {src:'/assets/agrotech-super-seeder.png', alt:'Agrotech Super Seeder product image', caption:'Super Seeder'},
      {src:'/assets/agrotech-super-seeder-2.png', alt:'Additional Agrotech Super Seeder product image', caption:'Super Seeder — additional view'},
      {src:'/assets/agrotech-super-seeder-3.png', alt:'Third Agrotech Super Seeder product image', caption:'Super Seeder — additional view'}
    ]
  },
  {
    slug: 'wheat-straw-reaper', name: 'Wheat Straw Reaper', category: 'Harvesting',
    summary: 'Collect and process wheat straw left in the field after grain harvesting.',
    overview: 'A Wheat Straw Reaper follows the grain harvest to pick up standing or loose straw. It cuts and processes the material into chaff that can be collected and handled more easily. Field conditions and the intended use of the straw help determine the right setup.',
    steps: ['Picks up the straw remaining after wheat harvest.', 'Cuts and processes the material into smaller pieces.', 'Transfers the processed straw for collection and handling.'],
    uses: ['Post-harvest wheat fields', 'Collecting straw for feed or other farm uses', 'Clearing residue before the next field operation'],
    confirm: ['Cutting width and straw collection method', 'Tractor power and PTO compatibility', 'Expected straw conditions and field moisture', 'Service parts and maintenance access'],
    images: [
      {src:'/assets/agrotech-wheat-straw-reaper-2.png', alt:'Agrotech Wheat Straw Reaper in a harvested field', caption:'Wheat Straw Reaper'},
      {src:'/assets/agrotech-wheat-straw-reaper-1.png', alt:'Additional front view of Agrotech Wheat Straw Reaper', caption:'Wheat Straw Reaper — front view'},
      {src:'/assets/agrotech-wheat-straw-reaper-3.png', alt:'Rear view of Agrotech Wheat Straw Reaper', caption:'Wheat Straw Reaper — rear view'}
    ]
  },
  {
    slug: 'laser-land-leveler', name: 'Laser Land Leveler', category: 'Land levelling',
    summary: 'Grade the field to a reference plane for more consistent sowing and irrigation.',
    overview: 'A Laser Land Leveler uses a transmitter to establish a reference plane across the field. A receiver and control system guide the implement as it cuts and moves soil from higher areas toward lower areas. The result is a more even working surface when the equipment is set up correctly for the field.',
    steps: ['The transmitter establishes a laser reference plane.', 'A receiver reads the reference while the tractor moves.', 'The control system guides the levelling blade to cut and spread soil.'],
    uses: ['Preparing a more even surface before sowing', 'Improving the consistency of irrigation layout', 'Correcting high and low areas in a field'],
    confirm: ['Leveler working width and tractor fit', 'Transmitter, receiver and control-system configuration', 'Field survey and target grade', 'Hydraulic compatibility and operating support'],
    images: [
      {src:'/assets/agrotech-laser-land-leveler.png', alt:'Agrotech Laser Land Leveler in a field', caption:'Laser Land Leveler'},
      {src:'/assets/agrotech-digital-laser-transmitter-wide.png', alt:'Agrotech Digital Laser Transmitter', caption:'Related component: Digital Laser Transmitter'},
      {src:'/assets/agrotech-receiver-control-system.png', alt:'Agrotech Receiver and Control System', caption:'Related components: receiver and control system'}
    ]
  },
  {
    slug: 'rotavator', name: 'Rotavator', category: 'Soil preparation',
    summary: 'Loosen, break up and mix surface soil to prepare a workable seedbed.',
    overview: 'A Rotavator is a tractor-driven tillage implement with a rotating blade assembly. As it moves through the field, the blades break up clods and mix the upper layer of soil. The desired finish depends on soil moisture, working depth and travel speed.',
    steps: ['Rotating blades enter the upper soil layer.', 'Clods are broken and material is mixed.', 'The worked soil is left ready for the next preparation or planting step.'],
    uses: ['Seedbed preparation', 'Mixing crop residue into the surface layer', 'Breaking clods after primary tillage'],
    confirm: ['Working width and tilling depth', 'Tractor horsepower and PTO speed', 'Blade configuration and replacement parts', 'Suitable soil moisture and field conditions'],
    images: [
      {src:'/assets/agrotech-rotavator-1.png', alt:'Agrotech Rotavator in a prepared field', caption:'Rotavator'},
      {src:'/assets/agrotech-rotavator-2.png', alt:'Additional front view of Agrotech Rotavator', caption:'Rotavator — front view'},
      {src:'/assets/agrotech-rotavator-3.png', alt:'Rear view of Agrotech Rotavator', caption:'Rotavator — rear view'}
    ]
  },
  {
    slug: 'disc-harrow', name: 'Disc Harrow', category: 'Soil preparation',
    summary: 'Break clods and mix surface residue during secondary field preparation.',
    overview: 'A Disc Harrow uses angled disc gangs that roll through the soil. The discs cut and stir the upper layer, reducing clods and mixing crop residue. It is often used after primary tillage or where a field needs a further preparation pass.',
    steps: ['Angled discs cut into the soil as the implement is pulled.', 'The gangs turn and mix the upper layer.', 'A more workable surface is left for later field operations.'],
    uses: ['Secondary tillage', 'Clod reduction', 'Incorporating light crop residue'],
    confirm: ['Disc diameter, spacing and working width', 'Mounted or trailed configuration', 'Tractor drawbar or linkage fit', 'Bearing and disc service requirements'],
    images: [
      {src:'/assets/agrotech-disc-harrow.png', alt:'Agrotech Disc Harrow in a prepared field', caption:'Disc Harrow'}
    ]
  },
  {
    slug: 'cultivator', name: 'Cultivator', category: 'Cultivation',
    summary: 'Loosen and aerate soil using a set of field-working tines.',
    overview: 'A Cultivator pulls tines through the soil to loosen the upper layer without fully turning it over. Depending on tine arrangement and depth, it can help with seedbed preparation, soil aeration and weed disturbance.',
    steps: ['Tines penetrate the soil at the set depth.', 'Soil is loosened and surface weeds may be disturbed.', 'The field is left ready for further preparation or planting.'],
    uses: ['Pre-sowing soil preparation', 'Loosening compacted surface soil', 'Shallow cultivation and weed disturbance'],
    confirm: ['Number and spacing of tines', 'Working width and depth range', 'Tractor linkage and power requirement', 'Tine and sweep options'],
    images: [
      {src:'/assets/agrotech-cultivator-2.png', alt:'Agrotech Cultivator in a prepared field', caption:'Cultivator'},
      {src:'/assets/agrotech-cultivator-1.png', alt:'Additional front view of Agrotech Cultivator', caption:'Cultivator — additional view'},
      {src:'/assets/agrotech-cultivator-3.png', alt:'Alternative view of Agrotech Cultivator', caption:'Cultivator — alternative view'}
    ]
  },
  {
    slug: 'border-disk', name: 'Border Disk', category: 'Field shaping',
    summary: 'Move soil into ridges or borders to define field sections and water paths.',
    overview: 'A Border Disk positions angled discs to draw soil into a raised border. Farmers use borders to divide a field into manageable sections and support a planned irrigation layout. The intended border height and soil conditions determine the appropriate adjustment.',
    steps: ['Angled discs cut and gather soil.', 'Soil is moved toward the border line.', 'A raised boundary is formed along the pass.'],
    uses: ['Forming field borders', 'Defining irrigation sections', 'Maintaining existing soil ridges'],
    confirm: ['Disc size and angle adjustment', 'Desired border height and shape', 'Tractor linkage fit', 'Soil texture and field moisture'],
    images: [
      {src:'/assets/agrotech-border-disk-2.png', alt:'Agrotech Border Disk in a prepared field', caption:'Border Disk'},
      {src:'/assets/agrotech-border-disk-1.png', alt:'Additional view of Agrotech Border Disk', caption:'Border Disk — additional view'},
      {src:'/assets/agrotech-border-disk-3.png', alt:'Alternate view of Agrotech Border Disk', caption:'Border Disk — alternate view'}
    ]
  },
  {
    slug: 'disc-plough', name: 'Disc Plough', category: 'Primary tillage',
    summary: 'Cut and turn firm soil for primary tillage and residue incorporation.',
    overview: 'A Disc Plough uses large concave discs to cut into and turn over soil. It is used for the first substantial tillage pass, particularly where firm soil or crop residue makes the work demanding. Correct depth and disc setup are important for the field result.',
    steps: ['Concave discs cut into the ground.', 'Soil is lifted and turned to one side.', 'Weeds and surface residue are incorporated into the worked layer.'],
    uses: ['Primary tillage', 'Turning firm soil', 'Incorporating weeds and crop residue'],
    confirm: ['Disc count, diameter and working depth', 'Tractor horsepower and linkage', 'Soil conditions and intended tillage depth', 'Wear-part availability'],
    images: [
      {src:'/assets/agrotech-disc-plough-3.png', alt:'Agrotech Disc Plough in a prepared field', caption:'Disc Plough'},
      {src:'/assets/agrotech-disc-plough-1.png', alt:'Additional view of Agrotech Disc Plough', caption:'Disc Plough — additional view'},
      {src:'/assets/agrotech-disc-plough-2.png', alt:'Alternate view of Agrotech Disc Plough', caption:'Disc Plough — alternate view'}
    ]
  },
  {
    slug: 'rotary-slasher', name: 'Rotary Slasher', category: 'Field maintenance',
    summary: 'Cut grass, weeds and light brush around fields and tracks.',
    overview: 'A Rotary Slasher is a tractor-driven cutting implement used to manage vegetation outside cropped rows and in uncultivated areas. A rotating blade assembly cuts growth while the protective deck covers the working area. It is selected according to vegetation, ground conditions and tractor fit.',
    steps: ['The tractor powers a rotating blade assembly.', 'The blades cut grass, weeds and suitable light growth.', 'The deck helps direct cut material back onto the ground.'],
    uses: ['Field-edge maintenance', 'Clearing tracks and open areas', 'Managing grass and weeds between seasons'],
    confirm: ['Cutting width and height adjustment', 'Tractor PTO and horsepower requirements', 'Suitable vegetation size', 'Blade and deck maintenance'],
    images: [
      {src:'/assets/agrotech-rotary-slasher-1.png', alt:'Agrotech Rotary Slasher in a prepared field', caption:'Rotary Slasher'},
      {src:'/assets/agrotech-rotary-slasher-2.png', alt:'Additional view of Agrotech Rotary Slasher', caption:'Rotary Slasher — additional view'},
      {src:'/assets/agrotech-rotary-slasher-3.png', alt:'Alternate view of Agrotech Rotary Slasher', caption:'Rotary Slasher — alternate view'}
    ]
  }
];

const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const list = items => items.map(item => `<li>${escapeHtml(item)}</li>`).join('');
const indexHtml = fs.readFileSync(path.join(root, 'products', 'index.html'), 'utf8');
const header = indexHtml.match(/<header class="site-header">[\s\S]*?<\/header>/)?.[0];
const footer = indexHtml.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)?.[0];
if (!header || !footer) throw new Error('Could not find shared site header/footer');
const detailFooter = footer.replaceAll('href="#super-seeder"', 'href="/products/super-seeder/"').replaceAll('href="#wheat-straw-reaper"', 'href="/products/wheat-straw-reaper/"').replaceAll('href="#laser-land-leveler"', 'href="/products/laser-land-leveler/"');

for (const product of products) {
  const title = escapeHtml(product.name);
  const category = escapeHtml(product.category);
  const gallery = product.images?.length ? `<div class="product-detail-gallery" aria-label="${title} images">${product.images.map((image, index) => `<figure class="product-detail-photo${index === 0 ? ' is-main' : ''}"><img src="${image.src}" alt="${escapeHtml(image.alt)}" loading="${index === 0 ? 'eager' : 'lazy'}"><figcaption>${escapeHtml(image.caption)}</figcaption></figure>`).join('')}</div>` : `<div class="product-detail-visual" role="img" aria-label="${title} catalog artwork"><span>AGROTECH EQUIPMENT</span><strong>${title}</strong><small>${category}</small></div>`;
  const related = products.filter(other => other.slug !== product.slug).slice(0, 3).map(other => `<a href="/products/${other.slug}/">${escapeHtml(other.name)} <span aria-hidden="true">→</span></a>`).join('');
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} | Agrotech Agriculture</title>
  <meta name="description" content="Learn about the ${title}: what it does, common field uses, how it works and what to confirm before choosing a model.">
  <link rel="icon" href="/assets/agrotech-mark.png" type="image/png"><link rel="stylesheet" href="/assets/site.css"><script src="/assets/site.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  ${header}
  <main id="main">
    <div class="container product-detail-breadcrumb"><a href="/products/">Products</a><span aria-hidden="true">/</span><span aria-current="page">${title}</span></div>
    <section class="product-detail-top" aria-labelledby="product-heading"><div class="container product-detail-top-inner">
      <div class="product-detail-heading"><span class="product-category">${category}</span><h1 id="product-heading">${title}</h1><p>${escapeHtml(product.summary)}</p><a class="button primary" href="/contact/?product=${product.slug}">Request product details <span aria-hidden="true">→</span></a></div>
      <div class="product-detail-primary-media">${product.images?.length ? `<img src="${product.images[0].src}" alt="${escapeHtml(product.images[0].alt)}">` : `<div class="product-detail-visual" role="img" aria-label="${title} catalog artwork"><span>AGROTECH EQUIPMENT</span><strong>${title}</strong><small>${category}</small></div>`}</div>
    </div></section>
    <section class="section product-detail-content"><div class="container product-detail-content-grid">
      <div><span class="eyebrow">PRODUCT OVERVIEW</span><h2>About the ${title}</h2><p>${escapeHtml(product.overview)}</p></div>
      <aside class="product-detail-use"><h2>Common field uses</h2><ul>${list(product.uses)}</ul></aside>
    </div></section>
    <section class="section tint product-detail-section"><div class="container"><div class="product-detail-section-heading"><span class="eyebrow">IN THE FIELD</span><h2>How it works</h2></div><ol class="product-detail-steps">${product.steps.map((step, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span><p>${escapeHtml(step)}</p></li>`).join('')}</ol></div></section>
    ${product.images?.length > 1 ? `<section class="section product-detail-section"><div class="container"><div class="product-detail-section-heading"><span class="eyebrow">PRODUCT IMAGES</span><h2>A closer look</h2></div>${gallery}</div></section>` : ''}
    <section class="section product-detail-section"><div class="container product-detail-content-grid"><div><span class="eyebrow">BEFORE YOU CHOOSE</span><h2>Details to confirm</h2><p>Configurations vary by model and field conditions. Our team can help match the equipment to your tractor and intended work.</p></div><ul class="product-detail-checklist">${list(product.confirm)}</ul></div></section>
    <section class="product-detail-cta"><div class="container product-detail-cta-inner"><div><span class="eyebrow">LET'S TALK EQUIPMENT</span><h2>Ask about the ${title}</h2><p>Tell us about your tractor, field and intended use. We can confirm the available configuration and specifications.</p></div><a class="button primary" href="/contact/?product=${product.slug}">Contact our team <span aria-hidden="true">→</span></a></div></section>
    <div class="container product-detail-related"><a class="text-link" href="/products/"><span aria-hidden="true">←</span> All products</a><div>${related}</div></div>
  </main>
  ${detailFooter}
</body>
</html>
`;
  const dir = path.join(root, 'products', product.slug);
  fs.mkdirSync(dir, {recursive: true});
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  const oldHref = `/contact/?product=${product.slug}`;
  const newHref = `/products/${product.slug}/`;
  if (!indexHtml.includes(oldHref) && !indexHtml.includes(newHref)) {
    throw new Error(`Missing card link: ${product.slug}`);
  }
}

let updatedIndex = indexHtml;
for (const product of products) {
  updatedIndex = updatedIndex.replace(`href="/contact/?product=${product.slug}">Ask about this product`, `href="/products/${product.slug}/">View More`);
}
fs.writeFileSync(path.join(root, 'products', 'index.html'), updatedIndex);
console.log(`Built ${products.length} product pages and updated their card links.`);
