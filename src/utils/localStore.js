export function setItemWithExpiry(key, value, expiryInDays = 3) {
    const now = new Date();

    const item = {
        value: value,
        expiry: now.getTime() + expiryInDays * 24 * 60 * 60 * 1000, // Convert days to milliseconds
    };


    localStorage.setItem(key, JSON.stringify(item));
}

export function getItemFromStorage(key) {
    const itemStr = localStorage.getItem(key);

    if (!itemStr) {
        return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();
    
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }

    return item.value;
}
