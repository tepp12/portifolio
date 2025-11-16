window.addEventListener('DOMContentLoaded', () => {

    const bgElement = document.getElementById('animatedBackground');

    // OBSPEED set for a noticeable, but not frantic, zoom (adjust as needed)
    const OBSPEED = 0.001; 

    let siner = 0;
    let xstretch = 1;
    let ystretch = 1;
    let alpha = 1;
    let b_insurance = -1;
    let o_insurance = 0;

    function gameLoop() {
        siner++; 
        
        // --- GML Logic ---
        if (OBSPEED > 0) {
            // Opacity pulse (90% to 100%)
            alpha = 0.95 + (0.05 * Math.sin(siner / 34));

            // Continuous outward scaling
            ystretch += OBSPEED;
            xstretch += OBSPEED;
        }

        if (b_insurance < 0) {
            b_insurance += 0.01;
        }
        
        // --- NEW LOOPING LOGIC ---
        // We no longer destroy the element. 
        // When the scale exceeds 2 (200%), we reset it to 1 (100%).
        if (ystretch > 2) { 
            // Reset scale variables for seamless loop
            xstretch = 1;
            ystretch = 1;
            
            // The 'o_insurance' logic is now unused, but kept for GML parity
            o_insurance += 0.01;
            
            // We ignore the instance_destroy() logic entirely
        }
        
        // --- Apply Styles ---
        bgElement.style.opacity = alpha;
        bgElement.style.transform = `scale(${xstretch}, ${ystretch})`;
        
        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
});