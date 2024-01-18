// TODO: make configurable in UI
const words = [
  "afd",
  "israel",
  "klima",
  "krieg",
  "krise",
  "lindner",
  "palästin",
  "putin",
  "republikaner",
  "russia",
  "russisch",
  "russland",
  "terror",
  "trump",
  "ukraine",
];

// TODO: make configurable in UI?
// or even with a "picker" like uBlock?
const documentQueryByHost = {
  "www.sueddeutsche.de": "article,h2,h3,h4",
  "de.reddit.com": ".thing",
  "www.tagesschau.de": ".teaser,.teaser-xs,h2,h3,h4",
};

function deleteElements() {
  const queryToSelectForThisHost = documentQueryByHost[document.location.host];

  if (queryToSelectForThisHost) {
    [...document.querySelectorAll(queryToSelectForThisHost)].forEach(
      (article) => {
        const textcontent = article.textContent.toLowerCase();

        if (words.some((word) => textcontent.includes(word))) {
          // TODO: only hide & make allow for enabling/disabling in UI?
          article.remove();
        }
      }
    );
  }
}

// Function to be executed when the page has finished loading
function onPageLoad() {
  deleteElements();

  // TODO: use MutationObserver instead
  window.setInterval(deleteElements, 2000);
}

// Execute onPageLoad when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", onPageLoad);

// In case the DOM is already loaded (e.g., on sites with AJAX), execute onPageLoad immediately
onPageLoad();
