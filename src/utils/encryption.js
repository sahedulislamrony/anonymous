export async function generateKeyPair() {
    const keyPair = await window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256",
        },
        true, // whether the keys are extractable
        ["encrypt", "decrypt"],
    );

    // Export keys as Base64 strings 
    const publicKey = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
    const privateKey = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

    return {
        
        publicKey: btoa(String.fromCharCode(...new Uint8Array(publicKey))), 
        privateKey: btoa(String.fromCharCode(...new Uint8Array(privateKey))), 
    };
};

export async function encryptMessage(publicKeyBase64, message) {
    // Convert Base64 public key to CryptoKey
    const publicKeyBinary = Uint8Array.from(atob(publicKeyBase64), (c) => c.charCodeAt(0));
    const publicKey = await window.crypto.subtle.importKey(
        "spki",
        publicKeyBinary.buffer,
        {
            name: "RSA-OAEP",
            hash: "SHA-256",
        },
        true,
        ["encrypt"],
    );

    const encodedMessage = new TextEncoder().encode(message); // Encode message to Uint8Array
    const encryptedMessage = await window.crypto.subtle.encrypt(
        {
            name: "RSA-OAEP",
        },
        publicKey,
        encodedMessage,
    );

    return btoa(String.fromCharCode(...new Uint8Array(encryptedMessage))); // Return Base64 encoded encrypted message
};

export async function decryptMessage(privateKeyBase64, encryptedMessageBase64) {
    // Convert Base64 private key to CryptoKey
    const privateKeyBinary = Uint8Array.from(atob(privateKeyBase64), (c) => c.charCodeAt(0));
    const privateKey = await window.crypto.subtle.importKey(
        "pkcs8",
        privateKeyBinary.buffer,
        {
            name: "RSA-OAEP",
            hash: "SHA-256",
        },
        true,
        ["decrypt"],
    );

    // Convert Base64 encrypted message to Uint8Array
    const encryptedMessageBinary = Uint8Array.from(atob(encryptedMessageBase64), (c) => c.charCodeAt(0));
    const decryptedMessage = await window.crypto.subtle.decrypt(
        {
            name: "RSA-OAEP",
        },
        privateKey,
        encryptedMessageBinary.buffer,
    );

    return new TextDecoder().decode(decryptedMessage); // Decode and return the decrypted message
};
