document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('bookCanvas');
    const ctx = canvas.getContext('2d');

    // Load images
    let images = [];
    let imageSrcs = ['../book photos/1.jpg', '../book photos/4.jpg'];
    let currentImage = 0;
    let opacity = 1;
    let isPausing = false;
    let fadeIn = true;

    imageSrcs.forEach(src => {
        let img = new Image();
        img.src = src;
        img.onload = function() {
            images.push(img);
            if (images.length === imageSrcs.length) {
                requestAnimationFrame(draw);
            }
        };
    });

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (fadeIn) {
            opacity += 0.01;
            if (opacity >= 1) {
                fadeIn = false;
                isPausing = true;
                setTimeout(() => {
                    isPausing = false;
                }, 3000); // 3 seconds pause
            }
        } else if (!isPausing) {
            opacity -= 0.01;
            if (opacity <= 0) {
                fadeIn = true;
                currentImage = (currentImage + 1) % images.length;
            }
        }

        ctx.globalAlpha = opacity;
        ctx.drawImage(images[currentImage], 0, 0, canvas.width, canvas.height);

        requestAnimationFrame(draw);
    }
});
