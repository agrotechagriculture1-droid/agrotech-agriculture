import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const mapUrl = 'https://maps.app.goo.gl/Ps1UcsNjEF3Vu7ma6';
const whatsappMessage = 'Assalam-o-Alaikum, maine Agrotech Agriculture ki website visit ki hai. Mujhe aapki agricultural machinery aur laser land levelling products ke mutalliq maloomat chahiye. Barah-e-karam rehnumai kar dein. Shukriya.';
const whatsappUrl = 'https://wa.me/923202726027?text=' + encodeURIComponent(whatsappMessage);
const mapEmbedUrl = 'https://www.google.com/maps/embed?origin=mfe&pb=!1m4!2m1!1sAgroTech+Agriculture+Industry,+Bhakkar+Rd,+near+Model+City,+Model+City+Jhang,+35200,+Pakistan!5e0!6i15';
const products = [
  ['Super Seeder', 'super-seeder'],
  ['Wheat Straw Reaper', 'wheat-straw-reaper'],
  ['Laser Land Leveler', 'laser-land-leveler'],
  ['Rotavator', 'rotavator'],
  ['Disc Harrow', 'disc-harrow'],
  ['Cultivator', 'cultivator'],
  ['Border Disk', 'border-disk'],
  ['Disc Plough', 'disc-plough'],
  ['Rotary Slasher', 'rotary-slasher']
];

const footer = `<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="brand" href="/" aria-label="Agrotech Agriculture home"><img class="brand-logo" src="/assets/agrotech-logo.png" alt="Agrotech Agriculture Equipment Manufacturing Company"></a>
        <p class="footer-text">Agricultural equipment made for practical field work, from soil preparation and seeding to harvesting and precision land levelling.</p>
        <div class="footer-secondary-links"><a href="/about/">About Agrotech</a><a href="/contact/">Contact Us</a></div>
      </div>
      <div>
        <h2 class="footer-heading">Products</h2>
        <div class="footer-links">${products.map(([name, slug]) => `<a href="/products/${slug}/">${name}</a>`).join('')}</div>
      </div>
      <div>
        <h2 class="footer-heading">Get in touch</h2>
        <div class="footer-contact">
          <a href="tel:+923202726027"><span class="footer-contact-icon" aria-hidden="true">☎</span><span>0320 2726027</span></a>
          <a href="tel:+923416726027"><span class="footer-contact-icon" aria-hidden="true">☎</span><span>0341 6726027</span></a>
          <a href="${mapUrl}" target="_blank" rel="noopener noreferrer"><span class="footer-contact-icon" aria-hidden="true">⌖</span><span>Bhakar Road, Near Model City<br>Agrotech Agriculture Industry, Jhang</span></a>
        </div>
      </div>
      <div class="footer-map" data-footer-map>
        <iframe class="footer-google-map" src="${mapEmbedUrl}" title="AgroTech Agriculture Industry, Bhakkar Road near Model City, Jhang" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe>
        <div class="footer-local-map" data-footer-local-map aria-label="Interactive map showing AgroTech Agriculture Industry near Model City, Jhang"></div>
        <a class="footer-map-open" href="${mapUrl}" target="_blank" rel="noopener noreferrer" aria-label="Open the exact Agrotech Agriculture Industry location in Google Maps">Open exact location <span aria-hidden="true">↗</span></a>
      </div>
    </div>
    <div class="footer-bottom"><span>© <span data-current-year></span> Agrotech Agriculture. All rights reserved.</span><a href="/contact/">Questions about equipment? Contact our team <span aria-hidden="true">→</span></a></div>
  </div>
  <a class="floating-whatsapp" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" aria-label="Chat with Agrotech Agriculture on WhatsApp">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.075-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.693.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.9 6.994c-.003 5.45-4.437 9.885-9.892 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.304-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
  </a>
</footer>`;

function htmlFiles(directory) {
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap(entry => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(fullPath) : entry.name.endsWith('.html') ? [fullPath] : [];
  });
}

let updated = 0;
for (const file of htmlFiles(root)) {
  const html = fs.readFileSync(file, 'utf8');
  let next = html.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/, footer);
  next = next.replace(/\s*<link rel="stylesheet" href="https:\/\/unpkg\.com\/leaflet@1\.9\.4\/dist\/leaflet\.css">/g, '');
  next = next.replace(/\s*<script src="https:\/\/unpkg\.com\/leaflet@1\.9\.4\/dist\/leaflet\.js" defer><\/script>/g, '');
  if (next === html && !html.includes(footer)) throw new Error(`Footer not found: ${file}`);
  fs.writeFileSync(file, next);
  updated++;
}
console.log(`Updated the shared footer on ${updated} pages.`);
