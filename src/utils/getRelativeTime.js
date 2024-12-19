export default function getRelativeTime(timestamp, fullTime = false) {
    const now = Date.now();
    const diffInMs = now - timestamp;
  
    const msInMinute = 60 * 1000;
    const msInHour = 60 * msInMinute;
    const msInDay = 24 * msInHour;
  
    const pastDate = new Date(timestamp);
  
    // Determine relative time
    let relativeTime;
    if (diffInMs < msInHour) {
        const minutes = Math.round(diffInMs / msInMinute);
        relativeTime = formatRelativeTime(minutes, "minute");

        if (minutes < 1) {
            relativeTime = "Just now";
        }
    } else if (diffInMs < msInDay) {
        const hours = Math.round(diffInMs / msInHour);
        relativeTime = formatRelativeTime(hours, "hour");
    } else {
        relativeTime = formatFullDate(pastDate);
    }
  
    // Return full time if requested
    if (fullTime) {
        const formattedTime = formatTime(pastDate);
        relativeTime = formatFullDate(pastDate);
        return { date: relativeTime, time: formattedTime };
    }
  
    return relativeTime;
}
  
function formatRelativeTime(value, unit) {
    const relativeFormatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    return relativeFormatter.format(-value, unit); //"4 hours ago"
}
  
function formatFullDate(date) {
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }); // "Dec 7, 2024"
}
  
function formatTime(date) {
    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    }); //  "3:24 PM"
}
  