(function () {
  const btn = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Active link
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('nav a[data-page]').forEach(a => {
    if ((a.getAttribute('href') || '').toLowerCase() === path) a.classList.add('active');
  });

  // Simple form handler (no backend): shows message and builds mailto for fallback
  document.querySelectorAll('form[data-mailto]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const to = form.getAttribute('data-mailto');
      const data = new FormData(form);
      const subject = (form.getAttribute('data-subject') || 'Wiadomość ze strony Love Vibe').trim();
      let body = '';
      for (const [k, v] of data.entries()) body += `${k}: ${String(v).trim()}\n`;
      const url = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = url;

      const msg = form.querySelector('[data-form-msg]');
      if (msg) {
        msg.textContent = 'Otwieram Twoją pocztę z uzupełnioną wiadomością…';
      }
    });
  });
})();
