document.addEventListener('DOMContentLoaded', function(){
  const btn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  if(!btn || !menu) return;

  btn.addEventListener('click', ()=>{
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    if(open){
      menu.hidden = true;
    } else {
      menu.hidden = false;
    }
    // toggle icon
    const icon = btn.querySelector('.mobile-icon');
    if(icon) icon.textContent = open ? '≡' : '✕';
  });

  // close when clicking outside
  document.addEventListener('click', (e)=>{
    if(!menu.hidden){
      // if click was on the toggle button we handled it already
      if(!menu.contains(e.target) && !btn.contains(e.target)){
        menu.hidden = true; btn.setAttribute('aria-expanded','false');
        const icon = btn.querySelector('.mobile-icon'); if(icon) icon.textContent = '≡';
      }
    }
  });
});
