(() => {
  const dialog = document.querySelector('.photo-dialog');
  if (!dialog) return;
  const buttons = [...document.querySelectorAll('.photo-open')];
  const image = dialog.querySelector('.viewer-image');
  let active = 0;
  let trigger;
  function show(index) {
    active = (index + buttons.length) % buttons.length;
    const source = buttons[active].querySelector('img');
    image.src = source.src;
    image.alt = source.alt;
    dialog.querySelector('.viewer-caption').textContent = buttons[active].closest('figure')?.querySelector('figcaption')?.textContent || source.alt;
    dialog.querySelector('.viewer-count').textContent = `${String(active + 1).padStart(2, '0')} / ${buttons.length}`;
  }
  buttons.forEach((button, index) => button.addEventListener('click', () => {
    trigger = button;
    show(index);
    dialog.showModal();
    document.documentElement.style.overflow = 'hidden';
  }));
  dialog.querySelector('.viewer-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.viewer-prev').addEventListener('click', () => show(active - 1));
  dialog.querySelector('.viewer-next').addEventListener('click', () => show(active + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      show(active + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    document.documentElement.style.overflow = '';
    trigger?.focus();
  });
})();
