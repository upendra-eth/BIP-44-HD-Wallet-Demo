const elliptic = require('elliptic');

// Step 1: Initialize the elliptic curve
const ec = new elliptic.ec('secp256k1');

// Step 2: Define your private key (in hexadecimal format)
const privateKeyHex = '0x9ffce93c14680776a0c319c76b4c25e7ad03bd780bf47f27ae9153324dcac585';  // Replace with your actual private key

// Step 3: Generate the public key from the private key
const keyPair = ec.keyFromPrivate(privateKeyHex);
const publicKey = keyPair.getPublic('hex');

// Step 4: Output the public key
console.log("Private Key:", privateKeyHex);
console.log("Public Key:", publicKey);

// Private Key: 0xbd443149113127d73c350d0baeceedd2c83be3f10e3d57613a730649ddfaf0c0
// Public Key: 045df909dc0a3deea25b4549a4612026f9637eb6853099641e69e0ddc715c67014f2eb4a42ec808fbb9b283976fdfa756e92a04d061eb4dd2f4819fba741a68921

// Private Key: 0xbd443149113127d73c350d0baeceedd2c83be3f10e3d57613a730649ddfaf0c0
// Public Key: 0xb1692ae0dfea1c15ba4250f4feb903a6633a3458acffa46a5380ef55645d16958c441ff4c78f565837a06c22d9574b29c743cb39a39c035a82028227a16bdece
// Ethereum Address: 0x51ca8ff9f1c0a99f88e86b8112ea3237f55374ca
// 0x51cA8ff9f1C0a99f88E86B8112eA3237F55374cA