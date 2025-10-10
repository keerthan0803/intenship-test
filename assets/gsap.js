document.addEventListener('DOMContentLoaded', function(){
  if(typeof gsap === 'undefined') return;
  // gentle float for all flower icons
  gsap.utils.toArray('.flower-icon').forEach((el, i)=>{
    gsap.to(el, {
      y: (i % 2 === 0) ? -4 : -6,
      duration: 2 + (i % 3) * 0.3,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });

    // hover scale + rotate
    el.addEventListener('mouseenter', ()=>{
      gsap.to(el, {scale:1.12, rotation:6, duration:0.22, ease:'power2.out'});
    });
    el.addEventListener('mouseleave', ()=>{
      gsap.to(el, {scale:1, rotation:0, duration:0.3, ease:'power2.out'});
    });
  });

  // pulsing glow for the big connect button (idle) and intensify on hover/touch
  const connect = document.querySelector('.big-connect-btn');
  if (connect) {
    // use an object so GSAP can tween a numeric value and we write it to the CSS var
    const glow = { v: 0.04 };

    // idle gentle pulse: v oscillates slightly
    const idleTween = gsap.to(glow, {
      v: 0.12,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      onUpdate() {
        connect.style.setProperty('--glow', glow.v.toFixed(3));
      }
    });

    // intensify the glow on hover/touch
    function intensify() {
      // stop any reset tweens
      gsap.killTweensOf(glow);
      // quickly ramp to a strong glow
      gsap.to(glow, {
        v: 0.9,
        duration: 0.22,
        ease: 'power2.out',
        onUpdate() { connect.style.setProperty('--glow', glow.v.toFixed(3)); }
      });
    }

    function resetGlow() {
      // smoothly go back to idle range and resume idle tween
      gsap.to(glow, {
        v: 0.06,
        duration: 0.6,
        ease: 'power2.out',
        onUpdate() { connect.style.setProperty('--glow', glow.v.toFixed(3)); },
        onComplete() {
          // restart idle after reset
          idleTween.restart(true);
        }
      });
    }

    connect.addEventListener('mouseenter', () => {
      idleTween.pause();
      intensify();
    });
    connect.addEventListener('mouseleave', () => {
      resetGlow();
    });

    // Touch: intensify on touchstart, reset on end/cancel
    connect.addEventListener('touchstart', function (e) {
      e.preventDefault();
      idleTween.pause();
      intensify();
    }, { passive: false });
    connect.addEventListener('touchend', () => resetGlow());
    connect.addEventListener('touchcancel', () => resetGlow());
  }
});
