# BIP44 HD Wallet Demo

This repository provides a demonstration of creating and managing Hierarchical Deterministic (HD) wallets using the BIP44 standard. The demo includes generating wallets from both mnemonic phrases and extended keys, deriving Ethereum addresses from the wallet, and working with master and derived keys.

## Features

- **Mnemonic Phrase to Wallet:** Generate an HD wallet from a BIP39 mnemonic phrase.
- **Extended Key to Wallet:** Create an HD wallet from an extended private or public key.
- **Ethereum Address Generation:** Derive Ethereum addresses from the HD wallet using the BIP44 standard.
- **Master Key Management:** Retrieve and manage master private and public keys.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/upendra-eth/BIP-44-HD-Wallet-Demo.git
   cd BIP-44-HD-Wallet-Demo
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

## Usage

This repository provides a script `ethereum_hd_wallet.js` that demonstrates the functionality of the BIP44 HD wallet. You can run the script using Node.js.

### Running the Demo

To run the demo and generate an Ethereum address:

```bash
node ethereum_hd_wallet.js
```

### Example Output

When you run the script, you will see outputs such as:

- Extended Private Key (xprv)
- Extended Public Key (xpub)
- Master Private Key
- Master Public Key
- Generated Ethereum Address

### Switching Between Mnemonic and Extended Key

The script includes two functions:

- `getWalletfromMnemonic()`: Generates an HD wallet from a mnemonic phrase.
- `getWalletfromExtendedKey()`: Generates an HD wallet from an extended private or public key.

You can uncomment the desired function to use it in the demo.

## BIP44 Path for Ethereum

The BIP44 path used to derive Ethereum addresses is:

```
m/44'/60'/0'/0/i
```

Where `i` is the index of the desired address.

## Dependencies

- [ethereumjs-wallet](https://github.com/ethereumjs/ethereumjs-wallet) - For HD wallet creation and management.
- [bip39](https://github.com/bitcoinjs/bip39) - For converting mnemonic phrases to seeds.
- [js-sha3](https://github.com/emn178/js-sha3) - For keccak256 hashing.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributions

Contributions are welcome! Please feel free to submit issues or pull requests.

## Acknowledgments

- [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) and [BIP44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) for the standards that make HD wallets possible.
