const elliptic = require('elliptic');
const { sha256 } = require('js-sha256');
const ripemd160 = require('ripemd160');
const bs58 = require('bs58');

// Step 1: Generate the ECDSA key pair
const ec = new elliptic.ec('secp256k1');
const keyPair = ec.genKeyPair();
const publicKey = keyPair.getPublic('hex');

// Step 2: SHA-256 hash of the public key
const publicKeyHash = sha256(Buffer.from(publicKey, 'hex'));

// Step 3: RIPEMD-160 hash of the SHA-256 hash
const ripemd160Hash = new ripemd160().update(Buffer.from(publicKeyHash, 'hex')).digest();

// Step 4: Add network byte (0x00 for Bitcoin mainnet)
const networkByte = Buffer.from([0x00]);
const networkPrefixed = Buffer.concat([networkByte, ripemd160Hash]);

// Step 5: Double SHA-256 hash
const checksumHash1 = sha256(networkPrefixed);
const checksumHash2 = sha256(Buffer.from(checksumHash1, 'hex'));

// Step 6: Take the first 4 bytes as the checksum and add to the network-prefixed RIPEMD-160 hash
const checksum = Buffer.from(checksumHash2, 'hex').slice(0, 4);
const binaryAddress = Buffer.concat([networkPrefixed, checksum]);

// Step 7: Encode the binary address in Base58
const bitcoinAddress = bs58.encode(binaryAddress);

console.log("Bitcoin Address:", bitcoinAddress);
