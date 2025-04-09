document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("favorites-list");
    const favorites = JSON.parse(localStorage.getItem("favoritePrompts")) || [];

    if (favorites.length === 0) {
        list.innerHTML = "<li>No favorites yet!</li>";
    } else {
        favorites.forEach(fav => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${fav.prompt}</strong> <em>(${fav.type})</em>`;
            list.appendChild(li);
        });
    }
});


const clearFavoritesBtn = document.getElementById('clear-favorites-btn');
const favoritesList = document.getElementById('favorites-list');

clearFavoritesBtn.addEventListener('click', function() {
    favoritesList.innerHTML = '';

    localStorage.removeItem('favoritePrompts');
});