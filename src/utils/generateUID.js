export default function generateUID(length){
    const array = new Uint8Array(length); 
    window.crypto.getRandomValues(array); 
    return btoa(String.fromCharCode(...array)) // Convert to Base64
        .replace(/\+/g, "A") // Replace "+" with "A" for URL-safe encoding
        .replace(/\//g, "B") // Replace "/" with "B" for URL-safe encoding
        .replace(/=+$/, ""); // Remove "=" padding characters
};