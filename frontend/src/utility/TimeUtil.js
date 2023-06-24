export const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - (hours * 3600)) / 60);
    
    const hoursStr = hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : "";
    const minutesStr = minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''}` : "";

    return `${hoursStr} ${minutesStr}`;
}