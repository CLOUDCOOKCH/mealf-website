'use strict';
(() => {
  const tabs = [...document.querySelectorAll('.showcase-tabs [role="tab"]')];
  const panels = [...document.querySelectorAll('.showcase-panel')];
  const dialog = document.getElementById('screen-dialog');
  const fullImage = document.getElementById('screen-image');
  const viewport = document.getElementById('screen-viewport');
  const loadStatus = document.getElementById('screen-load');
  const fitButton = document.getElementById('screen-fit');
  let selected = tabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true');
  let opener;

  function selectTab(name, focus = false) {
    const next = tabs.findIndex(tab => tab.dataset.tab === name);
    if (next < 0) return;
    selected = next;
    tabs.forEach((tab, index) => {
      const active = index === selected;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      panels[index].hidden = !active;
    });
    if (focus) {
      tabs[selected].focus({preventScroll: true});
      tabs[selected].scrollIntoView({block: 'nearest', inline: 'nearest', behavior: 'instant'});
    }
    document.getElementById('showcase-status').textContent = `${panels[selected].dataset.screenLabel} screenshot, ${selected + 1} of ${panels.length}.`;
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab.dataset.tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); selectTab(tabs[next].dataset.tab, true); }
    });
  });
  document.querySelectorAll('[data-open-tab]').forEach(link => link.addEventListener('click', () => selectTab(link.dataset.openTab)));

  fullImage.addEventListener('load', () => { fullImage.hidden = false; loadStatus.hidden = true; });
  fullImage.addEventListener('error', () => { fullImage.hidden = true; loadStatus.hidden = false; loadStatus.textContent = 'This screenshot could not load. Use Open original PNG to view it directly.'; });
  function showFullImage() {
    const panel = panels[selected];
    const image = panel.querySelector('img');
    document.getElementById('screen-dialog-title').textContent = panel.dataset.screenLabel;
    document.getElementById('screen-dialog-count').textContent = `${selected + 1} of ${panels.length}`;
    document.getElementById('screen-original').href = image.src;
    fullImage.hidden = true;
    loadStatus.hidden = false;
    loadStatus.textContent = 'Loading screenshot…';
    fullImage.alt = image.alt;
    fullImage.width = Number(image.getAttribute('width'));
    fullImage.height = Number(image.getAttribute('height'));
    fullImage.src = image.src;
    if (fullImage.complete && fullImage.naturalWidth) { fullImage.hidden = false; loadStatus.hidden = true; }
    viewport.scrollTo(0, 0);
  }
  document.querySelectorAll('[data-screen-open]').forEach(link => link.addEventListener('click', event => {
    if (typeof dialog.showModal !== 'function' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = link;
    dialog.classList.remove('is-fit');
    fitButton.textContent = 'Fit to screen';
    showFullImage();
    dialog.showModal();
    document.body.classList.add('screen-is-open');
  }));
  document.getElementById('screen-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    if (dialog.open) return;
    document.body.classList.remove('screen-is-open');
    const focused = document.activeElement;
    if (focused && focused !== document.body && focused !== document.documentElement && !dialog.contains(focused) && focused.getClientRects().length) return;
    if (opener && !opener.closest('[hidden]')) opener.focus({preventScroll: true});
    else tabs[selected].focus({preventScroll: true});
  });
  dialog.addEventListener('click', event => {
    const box = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
  });
  fitButton.addEventListener('click', () => {
    const fit = dialog.classList.toggle('is-fit');
    fitButton.textContent = fit ? 'Actual size' : 'Fit to screen';
    viewport.scrollTo(0, 0);
  });
  function moveScreenshot(direction) {
    const next = (selected + direction + tabs.length) % tabs.length;
    selectTab(tabs[next].dataset.tab);
    showFullImage();
  }
  document.getElementById('screen-previous').addEventListener('click', () => moveScreenshot(-1));
  document.getElementById('screen-next').addEventListener('click', () => moveScreenshot(1));

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const peachResets = [];
  let slapCount = 0;
  document.querySelectorAll('.peach-slap').forEach(button => {
    const peach = button.querySelector('img');
    button.insertAdjacentHTML('beforeend', '<span class="peach-hand" aria-hidden="true"><svg viewBox="0 0 64 64"><path d="M21 34V17a4 4 0 0 1 8 0v11V10a4 4 0 0 1 8 0v18V14a4 4 0 0 1 8 0v16V21a4 4 0 0 1 8 0v20c0 12-7 20-18 20h-5c-6 0-10-3-14-8L5 39a4 4 0 0 1 6-5l10 8Z"/></svg></span><span class="peach-impact" aria-hidden="true"><svg viewBox="0 0 36 36"><path d="m9 12-1 8m6-12-2 13m8-14-2 15m8-12-2 13"/></svg></span><span class="peach-smack" aria-hidden="true">SMACK!</span>');
    const hand = button.querySelector('.peach-hand');
    const impact = button.querySelector('.peach-impact');
    const label = button.querySelector('.peach-smack');
    let animations = [];
    let resetTimer;
    function resetPeach() {
      clearTimeout(resetTimer);
      animations.forEach(animation => animation.cancel());
      animations = [];
      button.classList.remove('is-slapped');
    }
    peachResets.push(resetPeach);
    button.addEventListener('click', () => {
      resetPeach();
      button.classList.add('is-slapped');
      slapCount += 1;
      document.getElementById('peach-status').textContent = `Smack! Peach slapped ${slapCount} ${slapCount === 1 ? 'time' : 'times'}.`;
      if (!reducedMotion.matches && typeof peach.animate === 'function') {
        const restingTransform = getComputedStyle(peach).transform;
        const base = restingTransform === 'none' ? '' : restingTransform;
        animations = [
          peach.animate([
            {transform: `${base} translateX(0) rotate(0deg) scale(1)`, offset: 0},
            {transform: `${base} translateX(9%) rotate(12deg) scale(1.18,.77)`, offset: .14},
            {transform: `${base} translateX(-6%) rotate(-9deg) scale(.90,1.10)`, offset: .34},
            {transform: `${base} translateX(3%) rotate(5deg) scale(1.06,.96)`, offset: .54},
            {transform: `${base} translateX(-1%) rotate(-2deg) scale(.99,1.02)`, offset: .76},
            {transform: `${base} translateX(0) rotate(0deg) scale(1)`, offset: 1}
          ], {duration: 720, easing: 'cubic-bezier(.22,.7,.3,1)', fill: 'both'}),
          hand.animate([
            {opacity: 0, transform: 'translate(70%,-20%) rotate(-35deg)', offset: 0},
            {opacity: 1, transform: 'translate(-35%,15%) rotate(-70deg)', offset: .27},
            {opacity: 1, transform: 'translate(-25%,10%) rotate(-64deg)', offset: .45},
            {opacity: 0, transform: 'translate(45%,-15%) rotate(-25deg)', offset: 1}
          ], {duration: 330, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both'}),
          impact.animate([
            {opacity: 0, offset: 0}, {opacity: .65, offset: .12},
            {opacity: .5, offset: .5}, {opacity: 0, offset: 1}
          ], {duration: 780, fill: 'both'}),
          label.animate([
            {opacity: 0, transform: 'translate(-50%,5px) rotate(-8deg)', offset: 0},
            {opacity: 1, transform: 'translate(-50%,-5px) rotate(-8deg)', offset: .15},
            {opacity: 1, transform: 'translate(-50%,-10px) rotate(-8deg)', offset: .6},
            {opacity: 0, transform: 'translate(-50%,-18px) rotate(-8deg)', offset: 1}
          ], {duration: 700, fill: 'both'})
        ];
      }
      resetTimer = setTimeout(resetPeach, 850);
    });
  });
  reducedMotion.addEventListener('change', () => peachResets.forEach(reset => reset()));
})();
