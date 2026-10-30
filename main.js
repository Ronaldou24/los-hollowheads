// Menú en celular
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('menu');
toggle.addEventListener('click', () => {
  toggle.setAttribute('aria-expanded', menu.classList.toggle('open'));
});
menu.addEventListener('click', e => {
  if (e.target.closest('a')) { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', false); }
});

// Cualquier link con data-yt carga ese video en el player de su sección.
// Donde no se pueden incrustar videos (SIN_EMBEDS), el link abre YouTube normal.
document.addEventListener('click', e => {
  const b = e.target.closest('[data-yt]');
  if (!b || window.SIN_EMBEDS) return;
  e.preventDefault();
  const section = b.closest('section');
  const player = section.querySelector('.player');
  player.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${b.dataset.yt}?autoplay=1&rel=0" title="Video de Los Hollowheads" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
  section.querySelectorAll('[data-yt].on').forEach(x => x.classList.remove('on'));
  section.querySelectorAll(`[data-yt="${b.dataset.yt}"]`).forEach(x => x.classList.add('on'));
  if (!b.closest('.player')) player.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// Galería y hojas del cuaderno: foto en grande
const lb = document.querySelector('.lb');
const lbImg = lb.querySelector('img');
document.addEventListener('click', e => {
  const img = e.target.closest('.gallery button, [data-zoom]')?.querySelector('img');
  if (!img) return;
  lbImg.src = img.src;
  lbImg.alt = img.alt;
  lb.showModal();
});
lb.addEventListener('click', () => lb.close());
