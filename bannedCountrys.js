const bannedCountries = [
    "China",
    "North Korea",
    "Syria",
    "Cuba",
    "Iran",
    "Tajikistan",
    "Ireland",
];

async function checkAccessWithFetch() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) throw new Error('Failed to fetch location');
        const data = await response.json();
        const userCountry = data.country_name;

        if (bannedCountries.map(c => c.toLowerCase()).includes(userCountry.toLowerCase())) {
            document.body.innerHTML = '';
            document.body.style.height = '100vh';
            document.body.style.margin = '0';
            const msg = document.createElement('div');
            msg.style.cssText = 'display:flex;justify-content:center;align-items:center;height:100vh;font-size:1.5rem;';
            msg.textContent = "GAMERYT Math is unavailable in your country or region.";
            document.body.appendChild(msg);
            return false;
        }
        return true;
    } catch (error) {
        document.body.innerHTML = `
          <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100vh;font-size:1.5rem;">
            Unable to determine your location.<br>
            <button onclick="location.reload()" style="margin-top:10px;padding:8px 16px;">Retry</button>
          </div>`;
        return false;
    }
}

if (typeof module !== "undefined") {
    module.exports = { bannedCountries, checkAccessWithFetch };
}
