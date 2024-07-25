import React, { useState, useEffect } from 'react';
import { useGarden, useMetaMaskStore } from '../store';
import { Assets } from '@gardenfi/orderbook';

const SwapComponent: React.FC = () => {
  const { garden, bitcoin } = useGarden();
  const { metaMaskIsConnected, connectMetaMask } = useMetaMaskStore();
  const [amount, setAmount] = useState({ wbtcAmount: '', btcAmount: '' });
  const [btcAddress, setBtcAddress] = useState('');

  useEffect(() => {
    if (bitcoin) {
      bitcoin.getAddress().then(setBtcAddress);
    }
  }, [bitcoin]);

  const handleAmountChange = (value: string) => {
    const wbtcAmount = value;
    const btcAmount = value ? (Number(value) * 0.997).toFixed(8) : '';
    setAmount({ wbtcAmount, btcAmount });
  };

  const handleSwap = async () => {
    if (!garden || !amount.wbtcAmount || !amount.btcAmount) return;

    const sendAmount = Math.floor(Number(amount.wbtcAmount) * 1e8);
    const receiveAmount = Math.floor(Number(amount.btcAmount) * 1e8);

    try {
      await garden.swap(
        Assets.ethereum_localnet.WBTC,
        Assets.bitcoin_regtest.BTC,
        sendAmount,
        receiveAmount
      );
      setAmount({ wbtcAmount: '', btcAmount: '' });
    } catch (error) {
      console.error('Swap failed:', error);
    }
  };

  return (
    <div className="swap-component">
      {!metaMaskIsConnected ? (
        <button onClick={connectMetaMask}>Connect MetaMask</button>
      ) : (
        <>
          <input
            type="number"
            value={amount.wbtcAmount}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder="WBTC Amount"
          />
          <p>You will receive approximately: {amount.btcAmount} BTC</p>
          <input
            type="text"
            value={btcAddress}
            onChange={(e) => setBtcAddress(e.target.value)}
            placeholder="BTC Address"
          />
          <button onClick={handleSwap} disabled={!amount.wbtcAmount}>Swap</button>
        </>
      )}
    </div>
  );
};

export default SwapComponent;
