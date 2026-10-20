const SHOP = 'https://westafary.myshopify.com';
const CDN = 'https://cdn.shopify.com/s/files/1/1088/4333/6010/files/';

const products = [
  { name: 'Jonc Naya', sub: 'Courbes ondulées', price: '19,99 €', handle: 'jonc-naya', variant: '64003261595978', img: 'FullSizeRender_03697b22-cf20-4227-a1ef-c78737103d97.jpg?v=1792409898', alt: 'Jonc Naya doré aux courbes ondulées', badge: 'Nouveau' },
  { name: 'Jonc Amara', sub: 'Large, sculptural', price: '19,99 €', handle: 'jonc-amara', variant: '63946069246282', img: 'IMG-7037.png?v=1792139602', alt: 'Jonc Amara doré aux courbes ondulées' },
  { name: 'Jonc Azélia', sub: 'Courbes entrelacées', price: '19,99 €', handle: 'jonc-azelia', variant: '63946084680010', img: 'IMG-7041.png?v=1792141078', alt: 'Jonc Azélia aux courbes entrelacées' },
  { name: 'Jonc Zahra', sub: 'Lignes organiques', price: '19,99 €', handle: 'jonc-zahra', variant: '63946077045066', img: 'IMG-7039.png?v=1792140182', alt: 'Jonc Zahra aux lignes irrégulières' },
  { name: 'Jonc Sélina', sub: 'Lignes architecturales', price: '19,99 €', handle: 'jonc-selina', variant: '63946078093642', img: 'IMG-7040.png?v=1792140907', alt: 'Jonc Sélina géométrique et asymétrique' },
  { name: 'Jonc Noura', sub: 'Large et bombé', price: '19,99 €', handle: 'jonc-noura', variant: '63946061578570', img: '2CCA6AAD-27E6-4A32-95DF-62521BD020C8.png?v=1792139418', alt: 'Jonc Noura large et bombé' },
  { name: 'Jonc Aura', sub: 'Extrémités arrondies', price: '19,99 €', handle: 'jonc-aura', variant: '63946047652170', img: 'FullSizeRender.jpg?v=1792138982', alt: 'Jonc Aura aux extrémités arrondies' },
  { name: 'Jonc Élya', sub: 'Courbes bombées', price: '19,99 €', handle: 'jonc-elya', variant: '63946056139082', img: 'F8A9B956-9BE8-48DA-A8C4-50085EAC9F3C.png?v=1792139239', alt: 'Jonc Élya aux courbes bombées', soldout: true }
];

const tones = [
  { name: 'Beige', hex: '#D9C8AE', variant: '63946096279882' },
  { name: 'Noir', hex: '#1A1A1A', variant: '63946096312650' },
  { name: 'Vert', hex: '#4E6B57', variant: '63946096345418' },
  { name: 'Bleu', hex: '#2F4A6B', variant: '63946096378186' },
  { name: 'Rouge', hex: '#8E2F2A', variant: '63946096410954' },
  { name: 'Marron', hex: '#6B4632', variant: '63946096443722' },
  { name: 'Violet', hex: '#5A3E66', variant: '64002545189194' }
];

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'class') node.className = v;
    else if (k === 'text') node.textContent = v;
    else node.setAttribute(k, v);
  });
  children.forEach((c) => node.append(c));
  return node;
}

function renderGrid() {
  const grid = document.getElementById('grid');
  products.forEach((p) => {
    const img = el('img', { src: CDN + p.img + '&width=900', alt: p.alt, loading: 'lazy' });
    const ph = el('div', { class: 'ph' }, [img]);
    if (p.soldout) ph.prepend(el('span', { class: 'badge', text: 'Épuisé' }));
    else if (p.badge) ph.prepend(el('span', { class: 'badge', text: p.badge }));
    const left = el('div', {}, [
      el('span', { class: 'card-name', text: p.name }),
      el('span', { class: 'card-sub', text: p.sub })
    ]);
    const info = el('div', { class: 'card-info' }, [left, el('span', { class: 'card-price', text: p.price })]);
    const add = el('span', { class: 'card-add', text: p.soldout ? 'Me prévenir' : 'Voir la pièce' });
    const card = el('a', { class: 'card reveal' + (p.soldout ? ' soldout' : ''), href: `${SHOP}/products/${p.handle}` }, [ph, info, add]);
    grid.append(card);
  });
}

function renderTones() {
  const wrap = document.getElementById('tones');
  const label = document.getElementById('tone-name');
  const buy = document.getElementById('soraya-buy');
  tones.forEach((t, i) => {
    const b = el('button', { type: 'button', class: 'tone', 'aria-label': t.name, 'aria-pressed': i === 0 ? 'true' : 'false' }, [el('i', { style: `background:${t.hex}` })]);
    b.addEventListener('click', () => {
      wrap.querySelectorAll('.tone').forEach((x) => x.setAttribute('aria-pressed', 'false'));
      b.setAttribute('aria-pressed', 'true');
      label.textContent = t.name;
      buy.href = `${SHOP}/cart/${t.variant}:1`;
    });
    wrap.append(b);
  });
}

function setupHeader() {
  const header = document.getElementById('header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const burger = document.getElementById('burger');
  const drawer = document.getElementById('drawer');
  const toggle = (open) => {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    drawer.hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => toggle(burger.getAttribute('aria-expanded') !== 'true'));
  drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => toggle(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !drawer.hidden) toggle(false); });
}

function setupReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((n) => n.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  items.forEach((n) => io.observe(n));
}

function setupImages() {
  document.querySelectorAll('.ph img').forEach((img) => {
    const fail = () => img.classList.add('broken');
    if (img.complete && img.naturalWidth === 0) fail();
    img.addEventListener('error', fail);
  });
}

document.getElementById('year').textContent = new Date().getFullYear();
renderGrid();
renderTones();
setupHeader();
setupReveal();
setupImages();
