const elliptic = require('elliptic');
const keccak256 = require('js-sha3').keccak256;

// Initialize elliptic curve
const ec = new elliptic.ec('secp256k1');

// Example signature and message
const message = "Hello, Ethereum!";
const messageHash = keccak256(message);

// Example signature components (replace with actual values)
const r = 'your-signature-r-here';  // Replace with actual r value
const s = 'your-signature-s-here';  // Replace with actual s value
const v = 'your-signature-v-here';  // Replace with actual v value

// Convert the signature components from hex
const rHex = Buffer.from(r, 'hex');
const sHex = Buffer.from(s, 'hex');

// Create a signature object
const signature = {
    r: rHex,
    s: sHex,
    recoveryParam: parseInt(v, 16) // Recovery parameter as integer
};

// Recover the public key
const recoveredPublicKey = ec.recoverPubKey(messageHash, signature, signature.recoveryParam);

console.log("Recovered Public Key:", recoveredPublicKey.encode('hex'));
