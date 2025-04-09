document.addEventListener("DOMContentLoaded", () => {
    const promptText = document.getElementById("prompt-text");
    const generateBtn = document.getElementById("generate-prompt");
    const loadingContainer = document.getElementById("loading-container");
    const loadingBar = document.getElementById("loading-bar");
    const favoriteBtn = document.getElementById("favorite-prompt");

    let scenePrompts = [];

    fetch("json/prompts.json")
        .then(response => response.json())
        .then(data => {
            scenePrompts = data.scenes || [];
        })
        .catch(error => console.error("Error loading prompts:", error));
    
    generateBtn.addEventListener("click", () => {
        if (scenePrompts.length > 0) {
            loadingContainer.style.display = "block";
            loadingBar.style.width = "0%";

            setTimeout(() => {
                loadingBar.style.width = "100%"; 
                promptText.textContent = "Generating Prompt...";

                setTimeout(() => {
                    const randomIndex = Math.floor(Math.random() * scenePrompts.length);
                    const randomPrompt = scenePrompts[randomIndex];
                    promptText.textContent = randomPrompt;
                    loadingContainer.style.display = "none";
                }, 2000); 
            }, 50); 
        } else {
            promptText.textContent = "Error: No prompts available.";
        }
    });

    favoriteBtn.addEventListener("click", () => {
        const currentPrompt = promptText.textContent;

        if (
            !currentPrompt ||
            currentPrompt.includes("Click the button") ||
            currentPrompt.includes("Generating") ||
            currentPrompt.includes("Error")
        ) {
            return;
        }

        let pageType = window.location.pathname.split("/").pop().split(".")[0];
        if (pageType === "index") pageType = "scenes";

        let favorites = JSON.parse(localStorage.getItem("favoritePrompts")) || [];

        if (!favorites.some(fav => fav.prompt === currentPrompt && fav.type === pageType)) {
            favorites.push({ prompt: currentPrompt, type: pageType });
            localStorage.setItem("favoritePrompts", JSON.stringify(favorites));
            alert("Prompt favorited!");
        } else {
            alert("This prompt is already in your favorites.");
        }
    });

    
});