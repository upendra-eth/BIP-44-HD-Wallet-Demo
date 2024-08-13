const elliptic = require('elliptic');
const { randomBytes } = require('crypto');

// Use the SECP256k1 curve
const ec = new elliptic.ec('secp256k1');

// Generate a key pair
const keyPair = ec.genKeyPair();


// Get the private and public keys in hexadecimal format
const privateKey = keyPair.getPrivate('hex');
const publicKey = keyPair.getPublic('hex');

console.log("Private Key:", privateKey);
console.log("Public Key:", publicKey);

// Message to be signed
const message = "Hello, ECDSA!";

// Hash the message (using SHA-256)
const messageHash = ec.hash().update(message).digest('hex');

// Sign the message hash
const signature = keyPair.sign(messageHash);

console.log("Signature:", {
    r: signature.r.toString(16),
    s: signature.s.toString(16),
});

// Verify the signature
const isValid = ec.verify(messageHash, signature, keyPair.getPublic());

console.log("Is the signature valid?", isValid);
