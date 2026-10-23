'use strict';
(() => {
  const status = document.getElementById('hosting-status');
  const resetTimers = new WeakMap();
  document.querySelectorAll('[data-hosting-copy]').forEach(button => {
    button.addEventListener('click', async () => {
      const code = document.getElementById(button.dataset.hostingCopy);
      const label = button.querySelector('span');
      clearTimeout(resetTimers.get(button));
      try {
        if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(code.textContent);
        label.textContent = 'Copied';
        status.textContent = `${button.dataset.copyName} copied.`;
        resetTimers.set(button, setTimeout(() => { label.textContent = 'Copy'; }, 2200));
      } catch {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(code);
        selection.removeAllRanges();
        selection.addRange(range);
        label.textContent = 'Selected';
        status.textContent = 'Clipboard access is unavailable. The text is selected; use your browser’s Copy command.';
        resetTimers.set(button, setTimeout(() => { label.textContent = 'Copy'; }, 3500));
      }
    });
  });
})();
