// ==UserScript==
// @name         YouTube Premium
// @version      1.10
// @description  Replace YouTube logo with Premium
// @match        *://*.youtube.com/*
// @grant        none
// ==/UserScript==

(() => {
  function normalizeYouTubeLogos() {
    const logoRenderers = document.querySelectorAll('ytd-topbar-logo-renderer');
    logoRenderers.forEach(logoRenderer => {
      // Disable doodle
      const yoodle = logoRenderer.querySelector('ytd-yoodle-renderer:not([hidden])');
      if (yoodle) yoodle.setAttribute('hidden', '');

      // Enable YouTube logo
      const logoDiv = logoRenderer.querySelector('div[hidden]');
      if (logoDiv) logoDiv.removeAttribute('hidden');

      // Enable country code
      const countryCode = logoRenderer.querySelector('#country-code[hidden]');
      if (countryCode) countryCode.removeAttribute('hidden');

      // Replace doodle tooltip
      function syncLogoTooltip() {
        const logoLink = logoRenderer.querySelector('a#logo');
        if (logoLink) {
          let tooltip = logoLink.getAttribute('aria-label') || logoLink.title || '';
          if (tooltip && tooltip.includes('YouTube') && !tooltip.includes('Premium')) {
            const newTooltip = tooltip.replace('YouTube', 'YouTube Premium');
            logoLink.title = newTooltip;
            logoLink.setAttribute('aria-label', newTooltip);
          } else if (tooltip) {
            logoLink.title = tooltip;
            logoLink.setAttribute('aria-label', tooltip);
          }
        }
      }
      syncLogoTooltip();
      const observer = new MutationObserver(syncLogoTooltip);
      observer.observe(logoRenderer, { childList: true, subtree: true });
    });
  }
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="101" height="20" viewBox="0 0 101 20" focusable="false" aria-hidden="true" style="pointer-events:none;display:inherit;width:100%;height:100%;">
  <g>
    <path d="M14.4848 20C14.4848 20 23.5695 20 25.8229 19.4C27.0917 19.06 28.0459 18.08 28.3808 16.87C29 14.65 29 9.98 29 9.98C29 9.98 29 5.34 28.3808 3.14C28.0459 1.9 27.0917 0.94 25.8229 0.61C23.5695 0 14.4848 0 14.4848 0C14.4848 0 5.42037 0 3.17711 0.61C1.9286 0.94 0.954148 1.9 0.59888 3.14C0 5.34 0 9.98 0 9.98C0 9.98 0 14.65 0.59888 16.87C0.954148 18.08 1.9286 19.06 3.17711 19.4C5.42037 20 14.4848 20 14.4848 20Z" fill="#FF0033"></path>
    <path d="M19 10L11.5 5.75V14.25L19 10Z" fill="white"></path>
  </g>
  <g>
    <path d="M32.1819 2.10016V18.9002H34.7619V12.9102H35.4519C38.8019 12.9102 40.5619 11.1102 40.5619 7.57016V6.88016C40.5619 3.31016 39.0019 2.10016 35.7219 2.10016H32.1819ZM37.8619 7.63016C37.8619 10.0002 37.1419 11.0802 35.4019 11.0802H34.7619V3.95016H35.4519C37.4219 3.95016 37.8619 4.76016 37.8619 7.13016V7.63016Z"></path>
    <path d="M41.982 18.9002H44.532V10.0902C44.952 9.37016 45.992 9.05016 47.302 9.32016L47.462 6.33016C47.292 6.31016 47.142 6.29016 47.002 6.29016C45.802 6.29016 44.832 7.20016 44.342 8.86016H44.162L43.952 6.54016H41.982V18.9002Z"></path>
    <path d="M55.7461 11.5002C55.7461 8.52016 55.4461 6.31016 52.0161 6.31016C48.7861 6.31016 48.0661 8.46016 48.0661 11.6202V13.7902C48.0661 16.8702 48.7261 19.1102 51.9361 19.1102C54.4761 19.1102 55.7861 17.8402 55.6361 15.3802L53.3861 15.2602C53.3561 16.7802 53.0061 17.4002 51.9961 17.4002C50.7261 17.4002 50.6661 16.1902 50.6661 14.3902V13.5502H55.7461V11.5002ZM51.9561 7.97016C53.1761 7.97016 53.2661 9.12016 53.2661 11.0702V12.0802H50.6661V11.0702C50.6661 9.14016 50.7461 7.97016 51.9561 7.97016Z"></path>
    <path d="M60.1945 18.9002V8.92016C60.5745 8.39016 61.1945 8.07016 61.7945 8.07016C62.5645 8.07016 62.8445 8.61016 62.8445 9.69016V18.9002H65.5045L65.4845 8.93016C65.8545 8.37016 66.4845 8.04016 67.1045 8.04016C67.7745 8.04016 68.1445 8.61016 68.1445 9.69016V18.9002H70.8045V9.49016C70.8045 7.28016 70.0145 6.27016 68.3445 6.27016C67.1845 6.27016 66.1945 6.69016 65.2845 7.67016C64.9045 6.76016 64.1545 6.27016 63.0845 6.27016C61.8745 6.27016 60.7345 6.79016 59.9345 7.76016H59.7845L59.5945 6.54016H57.5445V18.9002H60.1945Z"></path>
    <path d="M74.0858 4.97016C74.9858 4.97016 75.4058 4.67016 75.4058 3.43016C75.4058 2.27016 74.9558 1.91016 74.0858 1.91016C73.2058 1.91016 72.7758 2.23016 72.7758 3.43016C72.7758 4.67016 73.1858 4.97016 74.0858 4.97016ZM72.8658 18.9002H75.3958V6.54016H72.8658V18.9002Z"></path>
    <path d="M79.9516 19.0902C81.4116 19.0902 82.3216 18.4802 83.0716 17.3802H83.1816L83.2916 18.9002H85.2816V6.54016H82.6416V16.4702C82.3616 16.9602 81.7116 17.3202 81.1016 17.3202C80.3316 17.3202 80.0916 16.7102 80.0916 15.6902V6.54016H77.4616V15.8102C77.4616 17.8202 78.0416 19.0902 79.9516 19.0902Z"></path>
    <path d="M90.0031 18.9002V8.92016C90.3831 8.39016 91.0031 8.07016 91.6031 8.07016C92.3731 8.07016 92.6531 8.61016 92.6531 9.69016V18.9002H95.3131L95.2931 8.93016C95.6631 8.37016 96.2931 8.04016 96.9131 8.04016C97.5831 8.04016 97.9531 8.61016 97.9531 9.69016V18.9002H100.613V9.49016C100.613 7.28016 99.8231 6.27016 98.1531 6.27016C96.9931 6.27016 96.0031 6.69016 95.0931 7.67016C94.7131 6.76016 93.9631 6.27016 92.8931 6.27016C91.6831 6.27016 90.5431 6.79016 89.7431 7.76016H89.5931L89.4031 6.54016H87.3531V18.9002H90.0031Z"></path>
  </g>
</svg>
`.trim();
  function parseSVG(svgString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, "image/svg+xml");
    return doc.documentElement;
  }
  const css = `
yt-icon.ytd-logo, ytd-logo[is-red-logo] yt-icon.ytd-logo,
c3-icon.mobile-topbar-logo.full-logo, c3-icon.yt-spec-more-drawer-view-model__more-drawer-header-logo {
  width:101px!important;height:20px!important;
}
c3-icon.mobile-topbar-logo.full-logo svg, c3-icon.yt-spec-more-drawer-view-model__more-drawer-header-logo svg {
  width:100%!important;height:100%!important;
}
`.trim();
  document.head.appendChild(Object.assign(document.createElement('style'), {textContent: css}));

  // PC (Update logo, tooltip)
  function swapPC() {
    document.querySelectorAll('ytd-topbar-logo-renderer, ytd-yoodle-renderer').forEach(container => {
      const icon = container.querySelector('yt-icon#logo-icon');
      if (icon) {
        const svgEl = icon.querySelector('svg');
        if (svgEl) {
          const newSVG = parseSVG(svg);
          if (!svgEl.isEqualNode(newSVG)) svgEl.replaceWith(newSVG);
        }
      }
    });
    document.querySelectorAll('ytd-topbar-logo-renderer a#logo, ytd-yoodle-renderer a#logo').forEach(a => {
      let tooltip = a.getAttribute('aria-label') || a.title || '';
      if (tooltip && tooltip.includes('YouTube') && !tooltip.includes('Premium')) {
        const newTooltip = tooltip.replace('YouTube', 'YouTube Premium');
        a.title = newTooltip;
        a.setAttribute('aria-label', newTooltip);
      } else if (tooltip) {
        a.title = tooltip;
        a.setAttribute('aria-label', tooltip);
      }
    });
  }

  // Mobile (Update logo)
  function swapMobile() {
    document.querySelectorAll('c3-icon.mobile-topbar-logo.full-logo, c3-icon.yt-spec-more-drawer-view-model__more-drawer-header-logo').forEach(icon => {
      const div = icon.querySelector('span.yt-icon-shape>div');
      if (div) {
        const svgEl = div.querySelector('svg');
        const newSVG = parseSVG(svg);
        if (!svgEl) {
          div.appendChild(newSVG);
        } else if (!svgEl.isEqualNode(newSVG)) {
          svgEl.replaceWith(newSVG);
        }
      }
    });
  }

  function run() {
    normalizeYouTubeLogos();
    if (location.hostname === "www.youtube.com") swapPC();
    else if (location.hostname === "m.youtube.com") swapMobile();
  }
  new MutationObserver(run).observe(document.body, {childList:true,subtree:true});
  window.addEventListener('yt-navigate-finish', run);
  document.addEventListener('DOMContentLoaded', run);
  run();
})();
