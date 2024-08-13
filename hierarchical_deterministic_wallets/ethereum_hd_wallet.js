const { hdkey } = require('ethereumjs-wallet');
const { mnemonicToSeedSync } = require('bip39');
const { keccak256 } = require('js-sha3');
const { Wallet } = require('ethers');

// Define mnemonic phrase
const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';

// Convert mnemonic to seed
const seed = mnemonicToSeedSync(mnemonic);

// Create HD wallet from seed
const hdwallet = hdkey.fromMasterSeed(seed);

// Function to generate Ethereum address from public key
function getEthereumAddress(publicKeyHex) {
    const publicKeyWithoutPrefix = publicKeyHex.slice(2); // Remove '04' prefix
    const publicKeyHash = keccak256(Buffer.from(publicKeyWithoutPrefix, 'hex'));
    return '0x' + publicKeyHash.slice(-40);
}

// Generate multiple addresses from HD wallet
function generateAddresses(hdwallet, count) {
    const addresses = [];
    for (let i = 0; i < count; i++) {
        const path = `m/44'/60'/0'/0/${i}`; // BIP-44 path for Ethereum addresses
        const child = hdwallet.derivePath(path);
        const privateKey = child.getWallet().getPrivateKeyString();
        const publicKey = child.getWallet().getPublicKeyString();
        const address = getEthereumAddress(publicKey);
        addresses.push({
            path,
            privateKey,
            publicKey,
            address
        });
    }
    return addresses;
}

// Example usage
const numAddresses = 5;  // Number of addresses to generate
const addresses = generateAddresses(hdwallet, numAddresses);

// Output the master keys
console.log("Master Private Key:", hdwallet.getWallet().getPrivateKeyString());
console.log("Master Public Key:", hdwallet.getWallet().getPublicKeyString());
console.log();

// Output the generated addresses with their keys
addresses.forEach((entry, index) => {
    console.log(`Address ${index + 1}:`);
    console.log("Path:", entry.path);
    console.log("Private Key:", entry.privateKey);
    console.log("Public Key:", entry.publicKey);
    console.log("Ethereum Address:", entry.address);
    console.log();
});
