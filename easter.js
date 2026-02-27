(function () {
  const TRIGGER = 'whoami';
  let typed = '';

  // DevTools hint
  console.log('%c[*] Initializing recon...', 'color:#4ade80;font-family:monospace;font-size:13px;');
  console.log('%c[*] Target acquired. Try typing something.', 'color:#555;font-family:monospace;font-size:12px;');

  const overlay  = document.getElementById('terminal-overlay');
  const termBody = document.getElementById('terminal-body');

  // Capture keypresses globally
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    if (e.key.length !== 1) return;

    typed += e.key.toLowerCase();
    if (typed.length > TRIGGER.length) {
      typed = typed.slice(-TRIGGER.length);
    }
    if (typed === TRIGGER) {
      typed = '';
      openTerminal();
    }
  });

  overlay.addEventListener('click', closeTerminal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeTerminal();
  });

  function closeTerminal() {
    overlay.classList.remove('active');
    termBody.innerHTML = '';
  }

  function openTerminal() {
    if (overlay.classList.contains('active')) return;
    termBody.innerHTML = '';
    overlay.classList.add('active');
    runSequence();
  }

  const lines = [
    { text: 'root@didac:~# whoami',                          delay: 0,    cls: 'green' },
    { text: '',                                               delay: 350              },
    { text: '[*] Resolving identity...',                      delay: 550,  cls: 'dim'   },
    { text: '[*] Checking /etc/passwd...',                    delay: 950,  cls: 'dim'   },
    { text: '[+] Entry found.',                               delay: 1300, cls: 'green' },
    { text: '',                                               delay: 1500              },
    { text: 'uid=1337(didac) gid=1337(hackers)',              delay: 1700, cls: 'white' },
    { text: 'groups=cybersec,pentesting,infosec,deloitte',    delay: 1950, cls: 'white' },
    { text: '',                                               delay: 2150              },
    { text: '[*] Running skills audit...',                    delay: 2350, cls: 'dim'   },
    { text: '',                                               delay: 2650              },
    { text: '  ├─ Cybersecurity consulting',                  delay: 2850, cls: 'white' },
    { text: '  ├─ Threat analysis & incident response',       delay: 3100, cls: 'white' },
    { text: '  ├─ Software engineering',                      delay: 3350, cls: 'white' },
    { text: '  └─ Bash scripting & automation',               delay: 3600, cls: 'white' },
    { text: '',                                               delay: 3850              },
    { text: '[+] Audit complete. No vulnerabilities found.',  delay: 4050, cls: 'green' },
    { text: '',                                               delay: 4300              },
    { text: '# Press ESC or click anywhere to exit.',         delay: 4500, cls: 'dim'   },
  ];

  function runSequence() {
    lines.forEach(function ({ text, delay, cls }) {
      setTimeout(function () {
        if (!overlay.classList.contains('active')) return;
        const el = document.createElement('div');
        el.textContent = text;
        if (cls) el.classList.add(cls);
        termBody.appendChild(el);
        termBody.scrollTop = termBody.scrollHeight;
      }, delay);
    });
  }
})();
