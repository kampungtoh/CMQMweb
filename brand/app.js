'use strict';
// Keep old links to the 2025 programme working.
if (location.hash === '#program') location.replace('chimeira-2025/#program');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.getElementById('main-nav');
function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu(); menuButton.focus();
  }
});
matchMedia('(min-width: 721px)').addEventListener('change', closeMenu);
const photos = [...document.querySelectorAll('[data-photo]')];
const dialog = document.getElementById('photo-dialog');
let photoIndex = 0, photoTrigger;
function showPhoto(index) {
  photoIndex = (index + photos.length) % photos.length;
  const source = photos[photoIndex], image = document.getElementById('photo-large');
  image.src = source.dataset.photo; image.alt = source.dataset.caption;
  document.getElementById('photo-caption').textContent = source.dataset.caption;
  document.getElementById('photo-count').textContent = `${photoIndex + 1} / ${photos.length}`;
}
photos.forEach((button, index) => button.addEventListener('click', () => {
  photoTrigger = button; showPhoto(index); dialog.showModal();
}));
document.getElementById('photo-close').addEventListener('click', () => dialog.close());
document.getElementById('photo-prev').addEventListener('click', () => showPhoto(photoIndex - 1));
document.getElementById('photo-next').addEventListener('click', () => showPhoto(photoIndex + 1));
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault(); showPhoto(photoIndex + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
dialog.addEventListener('click', event => {
  const r = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) dialog.close();
});
dialog.addEventListener('close', () => photoTrigger?.focus());
