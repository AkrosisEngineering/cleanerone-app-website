const translations = {
  en: {
    nav_features: "Features",
    nav_how: "How It Works",
    nav_screens: "Screenshots",
    download_btn: "Download",
    privacy_link: "Privacy Policy",
    terms_link: "User Agreement",
    hero_badge: "Available on iOS",
    hero_title_top: "Clean your library",
    hero_title_em: "without the chaos.",
    hero_subtitle:
      "CleanerOne finds duplicates, screenshots, and heavy files in minutes so your camera roll stays usable.",
    hero_cta_primary: "Download on App Store",
    hero_cta_secondary: "Learn More",
    metric_downloads: "Downloads",
    metric_rating: "App Rating",
    metric_cleaned: "Media Reviewed",
    features_kicker: "Features",
    features_title: "The important parts, without feature noise.",
    feature_1_title: "Smart duplicate detection",
    feature_1_body:
      "Spot similar photos and repeated screenshots quickly, then decide what stays.",
    feature_2_title: "Swipe-first cleanup flow",
    feature_2_body:
      "Keep, delete, or skip with minimal taps. Fast decisions, fewer mistakes.",
    feature_3_title: "Hidden Album mode",
    feature_3_body:
      "Keep private media behind a cleaner, deliberate vault entry.",
    how_kicker: "How It Works",
    how_title: "Three steps. No unnecessary complexity.",
    step_1_badge: "Step 1",
    step_1_title: "Scan",
    step_1_body:
      "Run a quick scan to group duplicates, screenshots, and large videos.",
    step_2_badge: "Step 2",
    step_2_title: "Review",
    step_2_body:
      "Check grouped items in a visual flow designed for fast decisions.",
    step_3_badge: "Step 3",
    step_3_title: "Clean",
    step_3_body:
      "Remove clutter and reclaim storage while keeping what matters.",
    screens_kicker: "Screenshots",
    screens_title: "Placeholder visuals ready for your real exports.",
    shot_1_caption: "Smart Scan Overview",
    shot_2_caption: "Swipe Mode Cleanup",
    shot_3_caption: "Hidden Album",
    cta_title: "Ready for cleaner storage?",
    cta_body:
      "Replace placeholder links with your App Store and TestFlight URLs, then publish.",
    cta_primary: "Download App",
  },
  tr: {
    nav_features: "Ozellikler",
    nav_how: "Nasil Calisir",
    nav_screens: "Ekranlar",
    download_btn: "Indir",
    privacy_link: "Gizlilik Politikasi",
    terms_link: "Kullanici Sozlesmesi",
    hero_badge: "iOS'ta mevcut",
    hero_title_top: "Galeri temizligi",
    hero_title_em: "artik daha duzenli.",
    hero_subtitle:
      "CleanerOne yinelenen fotograflari, ekran goruntulerini ve buyuk dosyalari hizlica bulur.",
    hero_cta_primary: "App Store'dan indir",
    hero_cta_secondary: "Detaylari gor",
    metric_downloads: "Indirme",
    metric_rating: "Puan",
    metric_cleaned: "Incelenen medya",
    features_kicker: "Ozellikler",
    features_title: "Gereksiz kalabalik yok, net is akisi var.",
    feature_1_title: "Akilli benzer fotograf tespiti",
    feature_1_body:
      "Benzer fotograflari ve tekrar eden ekran goruntulerini kolayca gor.",
    feature_2_title: "Kaydirarak hizli temizlik",
    feature_2_body: "Tut, sil veya gec. Daha hizli karar, daha az hata.",
    feature_3_title: "Gizli Album modu",
    feature_3_body:
      "Ozel medyani daha temiz ve kontrollu bir kasada sakla.",
    how_kicker: "Nasil Calisir",
    how_title: "Uc adim, gereksiz karmasa yok.",
    step_1_badge: "Adim 1",
    step_1_title: "Tara",
    step_1_body:
      "Hizli tarama ile yinelenenler, ekran goruntuleri ve buyuk videolari grupla.",
    step_2_badge: "Adim 2",
    step_2_title: "Incele",
    step_2_body: "Gruplanan icerikleri hizli karar akisinda gozden gecir.",
    step_3_badge: "Adim 3",
    step_3_title: "Temizle",
    step_3_body: "Gereksizleri kaldir, depolamani rahatlat.",
    screens_kicker: "Ekran Goruntuleri",
    screens_title: "Gercek ekranlari koyman icin hazir alanlar.",
    shot_1_caption: "Akilli Tarama",
    shot_2_caption: "Kaydirma Modu",
    shot_3_caption: "Gizli Album",
    cta_title: "Depolamani toparlamaya hazir misin?",
    cta_body:
      "Yer tutucu linkleri App Store ve TestFlight linklerinle degistirip yayinla.",
    cta_primary: "Uygulamayi indir",
  },
};

const langButtons = document.querySelectorAll(".lang-btn");
const i18nElements = document.querySelectorAll("[data-i18n]");
const menuButton = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector("#mobile-menu");
const closeMenuLinks = document.querySelectorAll("[data-nav-close]");
const revealTargets = document.querySelectorAll(".reveal");
const currentYear = document.querySelector("#current-year");

function applyLanguage(lang) {
  const chosen = translations[lang] ? lang : "en";
  const dictionary = translations[chosen];

  i18nElements.forEach((node) => {
    const key = node.dataset.i18n;
    const text = dictionary[key];
    if (text) {
      node.textContent = text;
    }
  });

  document.documentElement.lang = chosen;
  langButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === chosen);
  });

  localStorage.setItem("cleanerone_lang", chosen);
}

langButtons.forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    mobileMenu.hidden = expanded;
  });

  closeMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      mobileMenu.hidden = true;
    });
  });
}

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );

  revealTargets.forEach((item) => revealObserver.observe(item));
} else {
  revealTargets.forEach((item) => item.classList.add("is-visible"));
}

const initialLanguage = localStorage.getItem("cleanerone_lang") || "en";
applyLanguage(initialLanguage);
