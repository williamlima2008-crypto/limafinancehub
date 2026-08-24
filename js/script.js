// Mobile menu toggle, smooth CTA scroll, and newsletter visual feedback
document.addEventListener('DOMContentLoaded', function(){
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navList = document.getElementById('nav-list');
  const exploreBtn = document.getElementById('explore-guides');
  const yearEl = document.getElementById('year');
  const subscribeBtn = document.getElementById('subscribe-btn');
  const emailInput = document.getElementById('email');
  const header = document.querySelector('.site-header');
  // Live region for accessible messages
  let live = document.getElementById('a11y-live');
  if(!live){
    live = document.createElement('div');
    live.id = 'a11y-live';
    live.setAttribute('aria-live','polite');
    live.className = 'sr-only';
    document.body.appendChild(live);
  }

  // Set current year in footer
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Toggle mobile nav
  mobileBtn.addEventListener('click', function(){
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    if(navList.classList.contains('expanded')){
      navList.classList.remove('expanded');
      navList.classList.add('collapsed');
      live.textContent = 'Menu closed';
    } else {
      navList.classList.remove('collapsed');
      navList.classList.add('expanded');
      live.textContent = 'Menu opened';
      // focus first link
      const firstLink = navList.querySelector('a');
      if(firstLink) firstLink.focus();
    }
  });

  // Add small header effect on scroll
  window.addEventListener('scroll', function(){
    if(window.scrollY > 8){
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, {passive:true});

  // Smooth scroll for CTA
  if(exploreBtn){
    exploreBtn.addEventListener('click', function(e){
      e.preventDefault();
      const target = document.getElementById('guides');
      if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
    });
  }

  // Newsletter visual: simulate success (no backend)
  if(subscribeBtn){
    subscribeBtn.addEventListener('click', function(e){
      e.preventDefault();
      if(!emailInput.checkValidity()){
        emailInput.focus();
        return;
      }
      // Accessible visual confirmation (no backend)
      const original = this.textContent;
      this.textContent = 'Subscribed';
      this.disabled = true;
      live.textContent = 'Subscription simulated';
      setTimeout(()=>{
        this.textContent = original;
        this.disabled = false;
        emailInput.value = '';
        live.textContent = '';
      },2500);
    });
  }

  // Close mobile nav on resize to wide screens
  window.addEventListener('resize', function(){
    if(window.innerWidth > 720){
      navList.classList.remove('expanded');
      navList.classList.remove('collapsed');
      mobileBtn.setAttribute('aria-expanded','false');
    }
  });
  
  // Close mobile nav when clicking links inside it (mobile)
  navList.addEventListener('click', function(e){
    if(e.target.tagName === 'A' && window.innerWidth < 720){
      navList.classList.remove('expanded');
      mobileBtn.setAttribute('aria-expanded','false');
    }
  });
});

/*
  Ad placement guidance: insert ad containers with role="complementary" and aria-hidden when testing.
  Example (HTML):
  <div class="ad-slot" role="complementary" aria-hidden="true" data-ad="leaderboard"></div>
  Add responsive styles in CSS and lazy-load ad scripts server-side to preserve CLS and performance.
*/
