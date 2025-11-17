window.addEventListener('DOMContentLoaded', () => {
    const bgElement = document.getElementById('animatedBackground');
    const OBSPEED = 0.001; 

    let siner = 0;
    let xstretch = 1;
    let ystretch = 1;
    let alpha = 1;
    let b_insurance = -1;
    let o_insurance = 0;

    function gameLoop() {
        siner++; 
        
        if (OBSPEED > 0) {
            alpha = 0.95 + (0.05 * Math.sin(siner / 34));
            ystretch += OBSPEED;
            xstretch += OBSPEED;
        }

        if (b_insurance < 0) {
            b_insurance += 0.01;
        }

        // depois mexer nisso daqui pro reset ser menos tosco, efeito reverso

        if (ystretch > 2) { 
            xstretch = 1;
            ystretch = 1;
            o_insurance += 0.01;
        }
        bgElement.style.opacity = alpha;
        bgElement.style.transform = `scale(${xstretch}, ${ystretch})`;
        requestAnimationFrame(gameLoop);
    }
    requestAnimationFrame(gameLoop);
});