const elliptic = require('elliptic');
const keccak256 = require('js-sha3').keccak256;

// Step 1: Generate the ECDSA key pair
const ec = new elliptic.ec('secp256k1');
console.log("Step 1: Generating ECDSA key pair using the SECP256k1 curve...");

const keyPair = ec.genKeyPair();
const privateKey = keyPair.getPrivate('hex');
const publicKey = keyPair.getPublic('hex');

console.log("Private Key:", privateKey);
console.log("Public Key (full):", publicKey);

// Step 2: Keccak-256 hash of the public key
// Ethereum uses the public key without the first byte (0x04)
console.log("\nStep 2: Generating Ethereum address from the public key...");
const publicKeyWithoutPrefix = publicKey.slice(2); // Remove '04' prefix
const publicKeyHash = keccak256(Buffer.from(publicKeyWithoutPrefix, 'hex'));

console.log("Keccak-256 hash of the public key:", publicKeyHash);

// Step 3: Take the last 20 bytes of the Keccak-256 hash to form the Ethereum address
const ethereumAddress = '0x' + publicKeyHash.slice(-40);
console.log("Ethereum Address:", ethereumAddress);

// Extra Information: Total Possible Ethereum Addresses
const totalAddresses = BigInt(2) ** BigInt(160);
console.log(`\nDid you know? There are ${totalAddresses} possible Ethereum addresses.`);

// Step 4: Sign a message
console.log("\nStep 4: Signing a message using the ECDSA private key...");
const message = "Hello, Ethereum!";
const messageHash = keccak256(message);
const signature = keyPair.sign(messageHash, { canonical: true });

// Convert signature to hexadecimal format
const r = signature.r.toString('hex');
const s = signature.s.toString('hex');
const v = signature.recoveryParam.toString(16);

console.log("Message:", message);
console.log("Keccak-256 hash of the message:", messageHash);
console.log("Signature:");
console.log("r:", r);
console.log("s:", s);
console.log("v:", v);

// Step 5: Verify the signature
console.log("\nStep 5: Verifying the signature...");
const isValid = ec.verify(messageHash, signature, keyPair.getPublic());

console.log("Is the signature valid?", isValid);

console.log("\nThis process illustrates how a public key derived from an ECDSA key pair can be converted into an Ethereum address, and how messages can be signed and verified using this cryptographic system.");
