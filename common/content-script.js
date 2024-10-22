function observerCallback() {
  observer.disconnect();
  processLinks();
  observer.observe(document.body, { childList: true, subtree: true });
}

const observer = new MutationObserver(observerCallback);
observerCallback();

async function processLinks() {
  const hiddenPreviewLinks = document.querySelectorAll(
    "[data-ally-file-preview-url]"
  );
  if (hiddenPreviewLinks) {
    for (hiddenLink of hiddenPreviewLinks) {
      if (hiddenLink.getAttribute("data-link-revealed") === "true") {
        continue;
      }

      customLog("Revealing preview link.");
      revealLink(hiddenLink);

      hiddenLink.setAttribute("data-link-revealed", "true");
    }
  }
}

function revealLink(link) {
  link.style.display = "";
  link.setAttribute("href", link.getAttribute("data-ally-file-preview-url"));
  link.setAttribute("target", "_blank");
  link.innerHTML = `
    <svg focusable="false" aria-hidden="true" role="presentation" viewBox="0 0 512 512" style="width: 1em; height: 1em; font-size: 1.25rem; line-height: 1; margin-bottom: -0.3em;">
  <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
  <path fill="currentColor" d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"></path>
  </svg>
    `;
}

function customLog(message, type = "info") {
  console[type](
    `%c[Blackboard Native PDF Viewer]:%c ${message}`,
    "font-weight: bold;"
  );
}
