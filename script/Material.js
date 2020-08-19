/** @this {Material} */
  export function drawRipple({x, y}) { // Material design ripple animation.
    const div = document.createElement('div');
    div.classList.add('ripple');
    this.insertBefore(div, this.firstChild);
    div.style.top  = `${y - div.clientHeight / 2}px`;
    div.style.left = `${x - div.clientWidth / 2}px`;
    const width  = Math.floor(parseFloat(window.getComputedStyle(this).width));
    const height = Math.floor(parseFloat(window.getComputedStyle(this).height));
    const size = Math.max(width, height) * 2;
    div.style.setProperty('--size', size + 'px');
    const duration = parseFloat(window.getComputedStyle(div).transitionDuration) * 1000;
    // div.addEventListener('transitionrun', _ => {
    //   console.log('run', _);
    // });
    // div.addEventListener('transitionstart', _ => {
    //   console.log('start', _);
    // });
    // div.addEventListener('transitioncancel', _ => {
    //   console.log('cancel', _);
    // });
    div.addEventListener('transitionend', _ => {
      // console.log('end', _);
      div.remove();
    });
    div.classList.add('run');
    setTimeout(() => div.remove(), duration + 100);
  }
