document.addEventListener("DOMContentLoaded", () => {
    const promptText = document.getElementById("prompt-text");
    const generateBtn = document.getElementById("select-page-type");
    const loadingContainer = document.getElementById("loading-container");
    const loadingBar = document.getElementById("loading-bar");
    const favoriteBtn = document.getElementById("favorite-prompt");

    let prompts = [];

    let pageType = window.location.pathname.split("/").pop().split(".")[0];  
    const validPageTypes = ["music", "guessing", "film"];

    if (!validPageTypes.includes(pageType)) {
        console.error("Invalid page type, defaulting to 'music'");
        pageType = "music";  
    }

    console.log("Page type detected:", pageType);

  
    fetch("json/prompts.json")
        .then(response => response.json())
        .then(data => {
            prompts = data[pageType] || [];
        })
        .catch(error => console.error("Error loading prompts:", error));

   
    generateBtn.addEventListener("click", () => {
        if (prompts.length > 0) {
            promptText.textContent = "Generating Prompt..."
           
            loadingContainer.style.display = "block";
            
            loadingBar.style.width = "0%";

            setTimeout(() => {
                loadingBar.style.width = "100%"; 

                setTimeout(() => {
                    const randomIndex = Math.floor(Math.random() * prompts.length);
                    promptText.textContent = prompts[randomIndex];
                    loadingContainer.style.display = "none";
                }, 2000); 
            }, 50);
        } else {
            promptText.textContent = "Error loading prompts.";
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