function timeSince(date) {
    if (!date) {
        return "Invalid date";
    }
    
    const seconds = Math.floor((new Date() - date.toDate()) / 1000);
    let interval = Math.floor(seconds / 31536000);
  
    if (interval > 1) {
        return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return interval + " hour(s) ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return interval + " minute(s) ago";
    }
    return Math.floor(seconds) + " seconds ago";
}

export default timeSince;