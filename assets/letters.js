// Handles per-letter hover/tap to show an image
(function(){
  const chars = document.querySelectorAll('.big-name .char');
  if(!chars.length) return;

  // create viewer element
  const viewer = document.createElement('div');
  viewer.className = 'letter-viewer';
  viewer.innerHTML = '<img alt="letter photo" src="" />';
  document.body.appendChild(viewer);
  const img = viewer.querySelector('img');

  let active = null;
  let hideTimeout = null;

  function showFor(el, clientX, clientY){
    const src = el.getAttribute('data-image');
    if(!src) return;
    img.src = src;
    // position viewer near the letter (offset up)
    const offsetX = 20;
    const offsetY = -40;
    viewer.style.left = (clientX + offsetX) + 'px';
    viewer.style.top = (clientY + offsetY) + 'px';
    viewer.classList.add('visible');
    active = el;
    // clear any pending hide
    if(hideTimeout){ clearTimeout(hideTimeout); hideTimeout = null }
  }

  function hide(){
    viewer.classList.remove('visible');
    active = null;
    if(hideTimeout){ clearTimeout(hideTimeout); hideTimeout = null }
  }

  // Desktop: hover
  chars.forEach(ch => {
    ch.addEventListener('mouseenter', (e)=>{
      const rect = e.target.getBoundingClientRect();
      // show near center of letter
      const clientX = rect.left + rect.width/2;
      const clientY = rect.top + rect.height/2;
      showFor(e.target, clientX, clientY);
    });
    ch.addEventListener('mousemove', (e)=>{
      // follow cursor a little
      showFor(e.target, e.clientX, e.clientY);
    })
    ch.addEventListener('mouseleave', ()=>{
      // slight delay before hiding to make it feel smooth
      hideTimeout = setTimeout(hide, 160);
    });

    // Accessibility: focus/blur to show via keyboard
    ch.addEventListener('focus', (e)=>{
      const rect = e.target.getBoundingClientRect();
      showFor(e.target, rect.left + rect.width/2, rect.top + rect.height/2);
    });
    ch.addEventListener('blur', ()=>{
      hide();
    });

    // Touch / tap: toggle on tap
    ch.addEventListener('touchstart', (e)=>{
      e.preventDefault();
      const rect = e.target.getBoundingClientRect();
      const clientX = rect.left + rect.width/2;
      const clientY = rect.top + rect.height/2;
      if(active === e.target){ hide(); }
      else { showFor(e.target, clientX, clientY); }
    }, {passive:false});
  });

  // Hide when tapping outside viewer on touch devices
  document.addEventListener('touchstart', (e)=>{
    if(!viewer.contains(e.target) && !Array.from(chars).some(c=>c.contains(e.target))){ hide(); }
  }, {passive:true});

  // Hide on escape
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') hide();
  });

  // reposition viewer on scroll to keep it near the letter
  window.addEventListener('scroll', ()=>{
    if(!active) return;
    const rect = active.getBoundingClientRect();
    showFor(active, rect.left + rect.width/2, rect.top + rect.height/2);
  }, {passive:true});
})();
