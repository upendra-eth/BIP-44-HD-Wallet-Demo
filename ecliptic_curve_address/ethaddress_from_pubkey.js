const { hdkey } = require('ethereumjs-wallet');
const { mnemonicToSeedSync } = require('bip39');
const { keccak256 } = require('js-sha3');
const { Wallet } = require('ethers');


// Function to generate Ethereum address from public key
function getEthereumAddress(publicKeyHex) {
    const publicKeyWithoutPrefix = publicKeyHex.slice(2); // Remove '04' prefix
    const publicKeyHash = keccak256(Buffer.from(publicKeyWithoutPrefix, 'hex'));
    return '0x' + publicKeyHash.slice(-40);
}

const ethaddress = getEthereumAddress('04dc40f8dfffb6da45ef52d00abf2dfcd59584ea3f2a3bdd4b5311368c62c03045ee3d75eb48403c11fbdccf5d6ae35e2467bd5bc4b1d8bba49289a435878ee7dd')
console.log(ethaddress);