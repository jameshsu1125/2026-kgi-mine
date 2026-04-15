export const printCSSAnimation = (radius: number = 20, isBlank: boolean = false) => {
  let i = 0;
  if (isBlank) {
    let s = setInterval(() => {
      console.log(`${i * 5}%{ opacity:${0.2 + Math.random() * 0.8}; }`);
      if (i === 10) clearInterval(s);
      else i++;
    }, 30);
  }

  let index = 0;
  const r = radius;
  let out = '';
  const render = () => {
    const x = Math.cos((Math.PI / 180) * index) * r;
    const y = Math.sin((Math.PI / 180) * index * 2) * r;
    const currentX = x + r;
    const rotate = index;

    out += `${Math.round((index / 360) * 100)}%{transform: translateX(${currentX.toFixed(
      2,
    )}px) translateY(${y.toFixed(2)}px) rotate(${rotate}deg)}\n`;

    index += 5;
    if (index <= 360) requestAnimationFrame(render);
    else console.log(out);
  };
  render();
};

export const checkElementInViewport = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

export const checkElementInViewportWithThreshold = (el: HTMLElement, threshold: number) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= -threshold &&
    rect.left >= -threshold &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + threshold &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) + threshold
  );
};

export const checkElementCenterOfScreenWithOffset = (el: HTMLElement, offset: number) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.left >= (window.innerWidth - offset) / 2 && rect.left <= (window.innerWidth + offset) / 2
  );
};
