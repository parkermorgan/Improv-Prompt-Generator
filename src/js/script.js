document.addEventListener("DOMContentLoaded", () => {
    const promptText = document.getElementById("prompt-text");
    const generateBtn = document.getElementById("generate-prompt");

    let allPrompts = [];

    fetch("json/prompts.json")
        .then(response => response.json())
        .then(data => {
            allPrompts = Object.values(data).flat();
        })
        .catch(error => console.error("Error loading prompts:", error));

    generateBtn.addEventListener("click", () => {
        if (allPrompts.length > 0) {
            const randomIndex = Math.floor(Math.random() * allPrompts.length);
            promptText.textContent = allPrompts[randomIndex];
        } else {
            promptText.textContent = "Error: No prompts available.";
        }
    });


});