document.addEventListener("DOMContentLoaded", () => {
    const promptText = document.getElementById("prompt-text");
    const generateBtn = document.getElementById("generate-prompt");

    let scenePrompts = [];

    fetch("json/prompts.json")
        .then(response => response.json())
        .then(data => {
            scenePrompts = data.scenes || [];
        })
        .catch(error => console.error("Error loading prompts:", error));

    generateBtn.addEventListener("click", () => {
        if (scenePrompts.length > 0) {
            const randomIndex = Math.floor(Math.random() * scenePrompts.length);
            promptText.textContent = scenePrompts[randomIndex];
        } else {
            promptText.textContent = "Error: No prompts available.";
        }
    });
});