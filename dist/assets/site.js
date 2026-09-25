(() => {
  const body = document.body;
  const menuButton = document.querySelector("[data-menu-toggle]");
  const navigation = document.querySelector("[data-navigation]");

  if (menuButton && navigation) {
    const closeMenu = () => {
      body.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
    };

    menuButton.addEventListener("click", () => {
      const isOpen = body.classList.toggle("menu-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  const carousel = document.querySelector("[data-carousel]");
  if (carousel) {
    const slides = [...carousel.querySelectorAll("[data-slide]")];
    const dots = [...carousel.querySelectorAll("[data-carousel-dot]")];
    const previous = carousel.querySelector("[data-carousel-previous]");
    const next = carousel.querySelector("[data-carousel-next]");
    const title = carousel.querySelector("[data-hero-title]");
    const text = carousel.querySelector("[data-hero-text]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let index = 0;
    let timer;
    let playing = !reducedMotion;

    const show = (nextIndex) => {
      index = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === index;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", String(!active));
      });
      dots.forEach((dot, dotIndex) => {
        const active = dotIndex === index;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-current", active ? "true" : "false");
      });
      const activeSlide = slides[index];
      if (title) title.textContent = activeSlide.dataset.title;
      if (text) text.textContent = activeSlide.dataset.text;
    };

    const stop = () => {
      window.clearInterval(timer);
      timer = undefined;
    };

    const start = () => {
      stop();
      if (playing && !document.hidden) {
        timer = window.setInterval(() => show(index + 1), 2000);
      }
    };

    previous?.addEventListener("click", () => {
      show(index - 1);
      start();
    });
    next?.addEventListener("click", () => {
      show(index + 1);
      start();
    });
    dots.forEach((dot, dotIndex) => {
      dot.addEventListener("click", () => {
        show(dotIndex);
        start();
      });
    });
    document.addEventListener("visibilitychange", start);

    show(0);
    start();
  }

  const requestedProduct = new URLSearchParams(window.location.search).get("product");
  document.querySelectorAll("[data-enquiry-form]").forEach((form) => {
    const productSelect = form.querySelector('select[name="product"]');
    if (productSelect && requestedProduct && [...productSelect.options].some((option) => option.value === requestedProduct)) {
      productSelect.value = requestedProduct;
    }
    const status = form.querySelector("[data-form-status]");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (status) {
        const values = new FormData(form);
        const productName = productSelect?.selectedOptions[0]?.textContent || "Not selected";
        const lines = [
          "Agrotech Agriculture product enquiry",
          `Name: ${values.get("name")}`,
          `Phone: ${values.get("phone")}`,
          `City or district: ${values.get("city")}`,
          `Product: ${productName}`,
          values.get("tractor") ? `Tractor: ${values.get("tractor")}` : null,
          `Requirements: ${values.get("message")}`
        ].filter(Boolean);
        const link = document.createElement("a");
        link.href = `https://wa.me/923202726027?text=${encodeURIComponent(lines.join("\n"))}`;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Open your WhatsApp enquiry";
        status.replaceChildren("Your message is ready. ", link, " and review it before sending.");
      }
    });
  });

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  document.querySelectorAll("[data-years-since]").forEach((element) => {
    const startingYear = Number(element.dataset.yearsSince);
    if (Number.isFinite(startingYear)) element.textContent = new Date().getFullYear() - startingYear;
  });

  const footerMap = document.querySelector("[data-footer-map]");
  const localMap = document.querySelector("[data-footer-local-map]");
  const isLocalPreview = ["localhost", "127.0.0.1"].includes(window.location.hostname);

  if (footerMap && localMap && isLocalPreview) {
    body.classList.add("local-map-fallback");

    const initializeLocalMap = () => {
      if (!window.L || localMap.dataset.ready === "true") return;
      localMap.dataset.ready = "true";
      const location = [31.2596126, 72.3081892];
      const map = window.L.map(localMap, { scrollWheelZoom: false }).setView(location, 16);
      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors"
      }).addTo(map);
      window.L.marker(location)
        .addTo(map)
        .bindPopup('<strong>AgroTech Agriculture Industry</strong><br>Bhakkar Road, near Model City, Jhang<br><a href="https://maps.app.goo.gl/Ps1UcsNjEF3Vu7ma6" target="_blank" rel="noopener noreferrer">Open exact location ↗</a>');
    };

    if (!document.querySelector('link[data-leaflet-styles]')) {
      const styles = document.createElement("link");
      styles.rel = "stylesheet";
      styles.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      styles.dataset.leafletStyles = "true";
      document.head.append(styles);
    }

    if (window.L) {
      initializeLocalMap();
    } else {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = initializeLocalMap;
      document.head.append(script);
    }
  }
})();
