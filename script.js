function toggleMenu() {
  const menu = document.querySelector(".mobile-menu");
  const burger = document.querySelector(".hamburger");

  if (!menu || !burger) return;

  menu.classList.toggle("open");
  burger.classList.toggle("open");
}

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



document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.navbar');
  if (!nav) return;

  const idleOffset = 20;
  const nearTop = 20; 
  const scrollActiveTimeout = 120; 

  let isScrolling = false;
  let scrollTimer = null;


  if ((window.scrollY || 0) <= nearTop) {
    nav.classList.remove('stuck');
    nav.style.transform = `translateY(${idleOffset}px)`;
  } else {
    nav.classList.add('stuck');
    nav.style.transform = 'translateY(0)';
  }

  function onScrollStart() {
    if (!isScrolling) {
      isScrolling = true;
      nav.classList.add('stuck');
      nav.style.transform = 'translateY(0)';
    }

    if (scrollTimer) clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      isScrolling = false;
      if ((window.scrollY || 0) <= nearTop) {
        nav.classList.remove('stuck');
        nav.style.transform = `translateY(${idleOffset}px)`;
      } else {
        nav.classList.add('stuck');
        nav.style.transform = 'translateY(0)';
      }
    }, scrollActiveTimeout);
  }

  window.addEventListener('scroll', onScrollStart, { passive: true });
});


const messages = [
    "Welcome to my website!",
    "I am a Web Developer.",
    "I create modern UI designs.",
  ];

  let msgIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentMsg = messages[msgIndex];
    const displayedText = currentMsg.substring(0, charIndex);

    document.getElementById("type").innerText = displayedText;

    if (!isDeleting && charIndex < currentMsg.length) {
      charIndex++;
      setTimeout(typeEffect, 100); 
    } 
    else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(typeEffect, 50); 
    } 
    else {
      
      if (!isDeleting) {
        isDeleting = true;
        setTimeout(typeEffect, 1000); 
      } else {
        isDeleting = false;
        msgIndex = (msgIndex + 1) % messages.length; 
        setTimeout(typeEffect, 1000); 
      }
    }
  }

  typeEffect();