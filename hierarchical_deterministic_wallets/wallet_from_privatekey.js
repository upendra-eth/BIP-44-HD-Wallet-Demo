// Import necessary libraries
const { hdkey } = require("ethereumjs-wallet");
const { keccak256 } = require("js-sha3");
const { mnemonicToSeedSync } = require("bip39");

// Function to create an HD wallet from a mnemonic phrase
function getWalletFromMnemonic() {
  const mnemonic = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";
  
  // Convert mnemonic to seed
  const seed = mnemonicToSeedSync(mnemonic);
  
  // Create HD wallet from seed
  const hdwallet = hdkey.fromMasterSeed(seed);
  
  // Output the extended private key (xprv)
  const xprv = hdwallet.privateExtendedKey();
  console.log("Extended Private Key (xprv):", xprv);
  
  // Output the extended public key (xpub)
  const xpub = hdwallet.publicExtendedKey();
  console.log("Extended Public Key (xpub):", xpub);
  
  // Output the master private and public keys
  console.log("Master Private Key:", hdwallet.getWallet().getPrivateKeyString());
  console.log("Master Public Key:", hdwallet.getWallet().getPublicKeyString());
  
  return hdwallet;
}

// Function to create an HD wallet from an extended key (xprv or xpub)
function getWalletFromExtendedKey() {
  const extendedKey = "xprv9s21ZrQH143K3GJpoapnV8SFfukcVBSfeCficPSGfubmSFDxo1kuHnLisriDvSnRRuL2Qrg5ggqHKNVpxR86QEC8w35uxmGoggxtQTPvfUu";
  
  // Create HD wallet from the extended key
  const hdwallet = hdkey.fromExtendedKey(extendedKey);
  
  // Output the extended private key (xprv)
  const xprv = hdwallet.privateExtendedKey();
  console.log("Extended Private Key (xprv):", xprv);
  
  // Output the extended public key (xpub)
  const xpub = hdwallet.publicExtendedKey();
  console.log("Extended Public Key (xpub):", xpub);
  
  // Output the master private and public keys
  console.log("Master Private Key:", hdwallet.getWallet().getPrivateKeyString());
  console.log("Master Public Key:", hdwallet.getWallet().getPublicKeyString());
  
  return hdwallet;
}

// Function to generate an Ethereum address from a public key
function getEthereumAddress(publicKeyHex) {
  const publicKeyWithoutPrefix = publicKeyHex.slice(2); // Remove '04' prefix
  const publicKeyHash = keccak256(Buffer.from(publicKeyWithoutPrefix, "hex"));
  return "0x" + publicKeyHash.slice(-40);
}

// Function to generate an Ethereum address from an HD wallet and a BIP-44 path
function generateAddress(hdwallet, index) {
  const path = `m/44'/60'/0'/0/${index}`; // BIP-44 path for Ethereum addresses
  const child = hdwallet.derivePath(path);
  return getEthereumAddress(child.getWallet().getPublicKeyString());
}

// Example usage: Generate a wallet from an extended key
const hdwalletFromExtendedKey = getWalletFromExtendedKey();
const addressFromExtendedKey = generateAddress(hdwalletFromExtendedKey, 1);
console.log("Generated Address from Extended Key:", addressFromExtendedKey);

// Example usage: Generate a wallet from a mnemonic
const hdwalletFromMnemonic = getWalletFromMnemonic();
const addressFromMnemonic = generateAddress(hdwalletFromMnemonic, 1);
console.log("Generated Address from Mnemonic:", addressFromMnemonic);
