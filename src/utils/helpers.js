// Don't do searching if query is too short
export const shouldPerformSearch = searchQuery => searchQuery.trim().length > 1;

// Don't update weather too often, input is in seconds
export const shouldUpdateWeather = (lastTime, currentTime) => {
    const timeDiff = currentTime - lastTime;
    const diffInMinutes = Math.floor(Math.floor(timeDiff / 60) % 60);

    return diffInMinutes >= 20;
};

