// ПАРАЛЛАКС

const firstBlock = document.querySelector('.first-block');
const firstBlockImg = document.querySelector('.first-block__img');

firstBlock.addEventListener('mousemove', (e) => {
  const offsetX = e.clientX / window.innerWidth;
  const offsetY = e.clientY / window.innerHeight;

  firstBlockImg.style.transform = `translate(-${offsetX * 20}px, -${offsetY * 20}px)`; // Настроьте значение для смещения
});

firstBlock.addEventListener('mouseleave', () => {
  firstBlockImg.style.transform = 'translate(0, 0)';
});
