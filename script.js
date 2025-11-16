const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "0f2f13ec-3da2-4bd4-9e36-d1bcef764f4d");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Success! Your message has been sent.");
            form.reset();
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

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