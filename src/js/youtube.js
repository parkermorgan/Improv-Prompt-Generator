document.addEventListener("DOMContentLoaded", () => {
    const videoContainer = document.getElementById("video-container");
    const fetchVideosBtn = document.getElementById("fetch-videos");
    const filmVideosBtn = document.getElementById("film-videos");
    const guessVideosBtn = document.getElementById("guessing-videos");
    const musicVideosBtn = document.getElementById("music-videos");

    const API_KEY = 'Sent to instructor';
    const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

    const searchQueries = [
        "Whose line is it anyway",
        "Whose line is it anyway film noir",
        "Whose line is it anyway guessing games",
        "Whose line is it anyway greatest hits",
        "Whose line is it anyway bartender",
        "Whose line is it anyway improv games",
        "Whose line is it anyway scenes from a hat"
    ];

    if (fetchVideosBtn) {
        fetchVideosBtn.addEventListener("click", () => {
            const randomQuery = searchQueries[Math.floor(Math.random() * searchQueries.length)];
            fetchYouTubeVideos(randomQuery);
        });
    }

    if (filmVideosBtn) {
        filmVideosBtn.addEventListener("click", () => {
            fetchYouTubeVideos("Whose line is it anyway film noir");
        });
    }

    if (guessVideosBtn) {
        guessVideosBtn.addEventListener("click", () => {
            fetchYouTubeVideos("Whose line is it anyway guessing games");
        });
    }

    if (musicVideosBtn) {
        musicVideosBtn.addEventListener("click", () => {
            fetchYouTubeVideos("Whose line is it anyway greatest hits");
        })
    }

    async function fetchYouTubeVideos(query) {
        const url = `${BASE_URL}?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=3&key=${API_KEY}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            displayVideos(data.items);
        } catch (error) {
            console.error("Error fetching YouTube videos:", error);
        }
    }

    function displayVideos(videos) {
        videoContainer.innerHTML = "";

        videos.forEach(video => {
            const videoElement = document.createElement("iframe");
            videoElement.src = `https://www.youtube.com/embed/${video.id.videoId}`;
            videoElement.width = "100%";
            videoElement.height = "315";
            videoElement.allowFullscreen = true;
            videoContainer.appendChild(videoElement);
        });
    }
});