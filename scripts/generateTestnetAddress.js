const bitcoin = require('bitcoinjs-lib');

// Set the Bitcoin testnet network
const network = bitcoin.networks.testnet;

// Generate a new key pair
const keyPair = bitcoin.ECPair.makeRandom({ network });

// Get the address
const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network });

// Get the private key in WIF (Wallet Import Format)
const privateKeyWIF = keyPair.toWIF();

// Print the results
console.log(`Testnet Address: ${address}`);
console.log(`Private Key (WIF): ${privateKeyWIF}`);
