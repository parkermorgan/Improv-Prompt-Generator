document.addEventListener("DOMContentLoaded", () => {
    const promptText = document.getElementById("prompt-text");
    const generateBtn = document.getElementById("select-page-type");
    let prompts = [];
    
    // Determine the page type based on the current page URL
    let pageType = window.location.pathname.split("/").pop().split(".")[0];  // music, guessing, or film
    const validPageTypes = ["music", "guessing", "film"];

    // Check if the pageType is valid, if not, default to "music"
    if (!validPageTypes.includes(pageType)) {
        console.error("Invalid page type, defaulting to 'music'");
        pageType = "music";  // Default to 'music' if the pageType is invalid
    }

    console.log("Page type detected:", pageType);

    // Fetch prompts from the JSON file
    fetch("json/prompts.json")
        .then(response => response.json())
        .then(data => {
            prompts = data[pageType] || [];
        })
        .catch(error => console.error("Error loading prompts:", error));

    // Event listener for generating a prompt when the button is clicked
    generateBtn.addEventListener("click", () => {
        if (prompts.length > 0) {
            const randomIndex = Math.floor(Math.random() * prompts.length);
            promptText.textContent = prompts[randomIndex];
        } else {
            promptText.textContent = "Error loading prompts.";
        }
    });
});