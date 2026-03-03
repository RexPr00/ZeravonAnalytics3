const body = document.body;

const trapFocus = (container, event) => {
  const focusables = container.querySelectorAll('a[href], button:not([disabled]), input:not([disabled])');
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (event.key !== 'Tab') return;
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
};

const setScrollLock = (lock) => {
  body.style.overflow = lock ? 'hidden' : '';
};

const lang = document.querySelector('[data-lang]');
if (lang) {
  const toggle = lang.querySelector('.lang-toggle');
  const closeLang = () => lang.classList.remove('open');
  toggle.addEventListener('click', () => lang.classList.toggle('open'));
  document.addEventListener('click', (e) => {
    if (!lang.contains(e.target)) closeLang();
  });
}

const drawer = document.querySelector('[data-drawer]');
const burger = document.querySelector('[data-burger]');
const closeDrawerBtn = document.querySelector('[data-close-drawer]');
if (drawer && burger) {
  const panel = drawer.querySelector('.drawer-panel');
  const closeDrawer = () => {
    drawer.classList.remove('open');
    setScrollLock(false);
    burger.focus();
  };
  const openDrawer = () => {
    drawer.classList.add('open');
    setScrollLock(true);
    panel.querySelector('a,button,input')?.focus();
  };

  burger.addEventListener('click', openDrawer);
  closeDrawerBtn?.addEventListener('click', closeDrawer);
  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) closeDrawer();
  });
  document.addEventListener('keydown', (e) => {
    if (drawer.classList.contains('open') && e.key === 'Escape') closeDrawer();
    if (drawer.classList.contains('open')) trapFocus(panel, e);
  });
}

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  const button = item.querySelector('.faq-q');
  button.addEventListener('click', () => {
    faqItems.forEach((other) => {
      if (other !== item) other.classList.remove('open');
    });
    item.classList.toggle('open');
  });
});

const modal = document.querySelector('[data-modal]');
const openModal = document.querySelectorAll('[data-open-privacy]');
const closeModalBtns = document.querySelectorAll('[data-close-modal]');
if (modal) {
  const panel = modal.querySelector('.modal-panel');
  const closeModal = () => {
    modal.classList.remove('open');
    setScrollLock(false);
  };
  openModal.forEach((btn) => btn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('open');
    setScrollLock(true);
    panel.querySelector('button, a, input')?.focus();
  }));
  closeModalBtns.forEach((btn) => btn.addEventListener('click', closeModal));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('open') && e.key === 'Escape') closeModal();
    if (modal.classList.contains('open')) trapFocus(panel, e);
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
