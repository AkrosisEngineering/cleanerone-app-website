const legalConfig = {
  privacy: {
    en: {
      file: "../docs/privacyEN.md",
      label: "Privacy Policy",
      otherHref: "../user/",
      otherLabel: "User Agreement",
    },
    tr: {
      file: "../docs/privacyTR.md",
      label: "Gizlilik Politikası",
      otherHref: "../user/",
      otherLabel: "Kullanıcı Sözleşmesi",
    },
  },
  user: {
    en: {
      file: "../docs/userEN.md",
      label: "User Agreement",
      otherHref: "../privacy/",
      otherLabel: "Privacy Policy",
    },
    tr: {
      file: "../docs/userTR.md",
      label: "Kullanıcı Sözleşmesi",
      otherHref: "../privacy/",
      otherLabel: "Gizlilik Politikası",
    },
  },
};

const pageType = document.body.dataset.legalType;
const contentRoot = document.querySelector("#legal-content");
const pagePill = document.querySelector("#legal-pill");
const pageTitle = document.querySelector("#legal-title");
const otherLink = document.querySelector("#legal-other-link");
const langButtons = document.querySelectorAll(".lang-btn");

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function parseInline(text) {
  const escaped = escapeHtml(text).replace(/\\\./g, ".");
  return escaped.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );
}

function markdownToHtml(markdown) {
  const lines = markdown.split("\n");
  const blocks = [];
  const paragraph = [];
  let inList = false;
  let headingCount = 0;

  const flushParagraph = () => {
    if (!paragraph.length) {
      return;
    }
    blocks.push(`<p>${parseInline(paragraph.join(" "))}</p>`);
    paragraph.length = 0;
  };

  const closeList = () => {
    if (!inList) {
      return;
    }
    blocks.push("</ul>");
    inList = false;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      closeList();
      continue;
    }

    if (line.startsWith("* ") || line.startsWith("- ")) {
      flushParagraph();
      if (!inList) {
        blocks.push("<ul>");
        inList = true;
      }
      const itemText = line.replace(/^(\*|-)\s+/, "");
      blocks.push(`<li>${parseInline(itemText)}</li>`);
      continue;
    }

    closeList();

    const headingMatch = line.match(/^\*\*(.+)\*\*$/);
    if (headingMatch) {
      flushParagraph();
      headingCount += 1;
      const tag = headingCount === 1 ? "h1" : "h2";
      blocks.push(`<${tag}>${parseInline(headingMatch[1])}</${tag}>`);
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();
  closeList();
  return blocks.join("\n");
}

async function renderLegal(lang) {
  const chosenLang = legalConfig[pageType]?.[lang] ? lang : "en";
  const conf = legalConfig[pageType][chosenLang];

  document.documentElement.lang = chosenLang;
  localStorage.setItem("cleanerone_lang", chosenLang);
  langButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === chosenLang);
  });

  if (pagePill) {
    pagePill.textContent = conf.label;
  }
  if (pageTitle) {
    pageTitle.textContent = conf.label;
  }
  if (otherLink) {
    otherLink.textContent = conf.otherLabel;
    otherLink.setAttribute("href", conf.otherHref);
  }

  try {
    const response = await fetch(conf.file, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load ${conf.file}`);
    }
    const markdown = await response.text();
    contentRoot.innerHTML = markdownToHtml(markdown);
  } catch (error) {
    contentRoot.innerHTML =
      chosenLang === "tr"
        ? "<p>Belge yüklenemedi. Lütfen daha sonra tekrar deneyin.</p>"
        : "<p>The document could not be loaded. Please try again later.</p>";
    console.error(error);
  }
}

langButtons.forEach((button) => {
  button.addEventListener("click", () => renderLegal(button.dataset.lang));
});

const initialLang = localStorage.getItem("cleanerone_lang") || "en";
renderLegal(initialLang);
