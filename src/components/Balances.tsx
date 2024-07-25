const Balances: React.FC = () => {
    const { bitcoin } = useGarden();
    const { evmProvider } = useMetaMaskStore();
    const [bitcoinBalance, setBitcoinBalance] = useState('0');
    const [wbtcBalance, setWBTCBalance] = useState('0');
    const { isMMPopupOpen, isSigned, setIsSigned, setIsMMPopupOpen } =
      useSignStore();
  
    const fetchBalance = useCallback(async () => {
      /*
    `fetchBalance` logic discussed later 
    */
    }, [bitcoin, evmProvider, isMMPopupOpen]);
  
    // Updates the balances every 10sec
    useEffect(() => {
      const id = setInterval(() => {
        fetchBalance();
      }, 10000);
  
      return () => {
        clearInterval(id);
      };
    }, [fetchBalance]);
  
    // Updates the balances on the first render
    useEffect(() => {
      fetchBalance();
    }, [fetchBalance]);
  
    return (
      <div className="balances">
        <p>Bitcoin: {bitcoinBalance}</p>
        <p>WBTC: {wbtcBalance}</p>
      </div>
    );
  };