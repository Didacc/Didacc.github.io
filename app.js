(function () {

  /* ── SPA Router ── */

  var currentView = 'view-home';

  var TITLES = {
    'view-home':       'Dídac Cabiscol',
    'view-experience': 'Job Experience – Dídac Cabiscol',
    'view-deloitte':   'Deloitte – Dídac Cabiscol',
    'view-csuc':       'CSUC – Dídac Cabiscol',
    'view-books':      'Book Reviews – Dídac Cabiscol',
    'view-articles':   'Personal Articles – Dídac Cabiscol',
  };

  function showView(targetId) {
    if (!targetId || !document.getElementById(targetId)) targetId = 'view-home';
    if (targetId === currentView) return;

    var prev = document.getElementById(currentView);
    var next = document.getElementById(targetId);

    // Fade out previous
    prev.style.transition = 'opacity 0.18s ease';
    prev.style.opacity = '0';

    setTimeout(function () {
      prev.classList.remove('active');
      prev.style.cssText = '';
      next.classList.add('active');
      window.scrollTo(0, 0);
      currentView = targetId;
      document.title = TITLES[targetId] || 'Dídac Cabiscol';
    }, 180);
  }

  function navigate(targetId) {
    showView(targetId);
    history.pushState({ view: targetId }, '', '#' + targetId);
  }

  // Wire all [data-view] buttons
  document.querySelectorAll('[data-view]').forEach(function (el) {
    el.addEventListener('click', function () {
      navigate(el.dataset.view);
    });
  });

  // Browser back / forward
  window.addEventListener('popstate', function (e) {
    var viewId = (e.state && e.state.view) || location.hash.slice(1) || 'view-home';
    showView(viewId);
  });

  // Initial load: respect URL hash
  var initHash = location.hash.slice(1);
  if (initHash && document.getElementById(initHash)) {
    currentView = initHash;
    history.replaceState({ view: initHash }, '', '#' + initHash);
  } else {
    currentView = 'view-home';
    history.replaceState({ view: 'view-home' }, '', '#view-home');
  }
  document.getElementById(currentView).classList.add('active');


  /* ── HUD live clock ── */

  var clockEl = document.getElementById('hud-clock');

  function updateClock() {
    var d   = new Date();
    var pad = function (n) { return n.toString().padStart(2, '0'); };
    clockEl.textContent =
      d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) +
      ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
  }

  updateClock();
  setInterval(updateClock, 1000);


  /* ── Rotating footer status messages ── */

  var statusEl = document.getElementById('footer-status');

  if (statusEl) {
    var messages = [
      '[+] no CVEs found today',
      '[*] scanning attack surface...',
      '[~] last login: just now',
      '[+] firewall: active',
      '[*] threat intel: nominal',
      '[~] uptime: 847 days',
      '[+] all systems secured',
      '[*] 0-days hoarded: 0',
      '[~] WAF rules: enforced',
      '[+] least privilege: applied',
    ];
    var idx = 0;

    setInterval(function () {
      idx = (idx + 1) % messages.length;
      statusEl.style.opacity = '0';
      setTimeout(function () {
        statusEl.textContent = messages[idx];
        statusEl.style.opacity = '';
      }, 300);
    }, 3500);
  }


  /* ── Copy email to clipboard ── */

  var emailLink = document.getElementById('email-link');

  if (emailLink && navigator.clipboard) {
    emailLink.addEventListener('click', function (e) {
      e.preventDefault();
      navigator.clipboard.writeText('didac@didroot.com').then(function () {
        var prev = emailLink.textContent;
        emailLink.textContent = '[+] copied';
        emailLink.style.color = '#4ade80';
        setTimeout(function () {
          emailLink.textContent = prev;
          emailLink.style.color = '';
        }, 1600);
      }).catch(function () {
        window.location.href = 'mailto:didac@didroot.com';
      });
    });
  }


  /* ── Page fade-in on load ── */

  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  window.addEventListener('load', function () {
    document.body.style.opacity = '1';
  });

})();
