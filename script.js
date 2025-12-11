function toggleMenu() {
  const menu = document.querySelector(".mobile-menu");
  const burger = document.querySelector(".hamburger");

  if (!menu || !burger) return;

  menu.classList.toggle("open");
  burger.classList.toggle("open");
}

// Minimal client-side validation and fake submit (replace with real endpoint)
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contentFrom');
  if (!form) return;

  const status = document.getElementById('formStatus');
  const btn = form.querySelector('.sub-btn');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();


    if (status) { status.textContent = ''; status.style.color = '#444'; }


    const name = (form.querySelector('[name="name"]')?.value || '').trim();
    const email = (form.querySelector('[name="email"]')?.value || '').trim();
    const message = (form.querySelector('[name="message"]')?.value || '').trim();

    if (!name || !email || !message) {
      if (status) { status.textContent = 'Please fill all fields before submitting.'; status.style.color = 'crimson'; }
      return;
    }


    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      if (status) { status.textContent = 'Please enter a valid email.'; status.style.color = 'crimson'; }
      return;
    }


    if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }

    try {
      await new Promise((r) => setTimeout(r, 800));

      form.reset();
      if (status) { status.textContent = 'Message sent — thanks! We will reply soon.'; status.style.color = '#0a7f3b'; }
    } catch (err) {
      if (status) { status.textContent = 'Something went wrong. Try again later.'; status.style.color = 'crimson'; }
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = 'Submit'; }
    }
  });
});


// Stick navbar to top while user is scrolling (both directions).
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.navbar');
  if (!nav) return;

  const idleOffset = 20;   // offset at very top of page
  const nearTop = 20;      // within this px treat as "top"
  const scrollActiveTimeout = 120; // ms after last scroll to consider scrolling "stopped"

  let isScrolling = false;
  let scrollTimer = null;

  // ensure initial state
  if ((window.scrollY || 0) <= nearTop) {
    nav.classList.remove('stuck');
    nav.style.transform = `translateY(${idleOffset}px)`;
  } else {
    nav.classList.add('stuck');
    nav.style.transform = 'translateY(0)';
  }

  function onScrollStart() {
    // as soon as user scrolls -> stick navbar to top
    if (!isScrolling) {
      isScrolling = true;
      nav.classList.add('stuck');
      nav.style.transform = 'translateY(0)';
    }

    // clear previous timer
    if (scrollTimer) clearTimeout(scrollTimer);

    // set a timer to consider scroll "stopped"
    scrollTimer = setTimeout(() => {
      isScrolling = false;
      // if user ended scrolling and we are near top, restore idle offset
      if ((window.scrollY || 0) <= nearTop) {
        nav.classList.remove('stuck');
        nav.style.transform = `translateY(${idleOffset}px)`;
      } else {
        // keep stuck at top after stop if not near top
        nav.classList.add('stuck');
        nav.style.transform = 'translateY(0)';
      }
    }, scrollActiveTimeout);
  }

  // use passive listener for smoothness
  window.addEventListener('scroll', onScrollStart, { passive: true });
});
