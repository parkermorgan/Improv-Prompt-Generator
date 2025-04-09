document.addEventListener("DOMContentLoaded", () => {
    const videoContainer = document.getElementById("video-container");
    const fetchVideosBtn = document.getElementById("fetch-videos");
    const filmVideosBtn = document.getElementById("film-videos");
    const guessVideosBtn = document.getElementById("guessing-videos");
    const musicVideosBtn = document.getElementById("music-videos");

    const API_KEY = 'AIzaSyCVTBA1X8H-eeGsJ79LMMMxT2nS9616SnQ';
    const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

    if (fetchVideosBtn) {
        fetchVideosBtn.addEventListener("click", () => {
            fetchYouTubeVideos("whose line is it anyway");
        });
    }

    if (filmVideosBtn) {
        filmVideosBtn.addEventListener("click", () => {
            fetchYouTubeVideos("Whose line is it anyway film noir", "whose line is it anyway director");
        });
    }

    if (guessVideosBtn) {
        guessVideosBtn.addEventListener("click", () => {
            fetchYouTubeVideos("Whose line is it anyway guessing games");
        });
    }

    if (musicVideosBtn) {
        musicVideosBtn.addEventListener("click", () => {
            fetchYouTubeVideos("Whose line is it anyway greatest hits", "Whose line is it anyway bartender");
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