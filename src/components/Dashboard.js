import React, { useState, useEffect, ChangeEventHandler, MouseEventHandler } from 'react'
import { ethers } from 'ethers';
import './Dashboard.css'
import Ethereum from './ethereum.png';
;

const defaultExternalAddress = "0x52F8217743F06eEcadf0DE8A1A1209F90aab2ca2";

function Dashboard() {

    const [externalAddressEthAmount, setExternalAddressEthAmount] = useState();
    const [externalAddress, setExternalAddress] = useState();

      //provider rpc json with infura
      const INFURA_ID = '';
      const provider = new ethers.providers.JsonRpcProvider(
        'https://goerli.infura.io/v3/9b6edbd0f8914762a799ea3177cb9cc2'
    );

    const loadData = async() => {
        //automatic request for connection with wallet
        await provider.send('eth_requestAccounts', []);
        // access to private key of provider as your metamask account and details
        const signer = provider.getSigner();
    }


    useEffect(() => {
        loadData();
    }, []);


    const handleChangeAddress = (event) => {
            const extAddress = event.target.value;
            setExternalAddress(extAddress);
    }


    const handleCheckExternalAddress = async () => {
            const isAddress = ethers.utils.isAddress(externalAddress);
            if(isAddress) {
                    const balance = await provider.getBalance(externalAddress);
                    setExternalAddressEthAmount(ethers.utils.formatEther(balance));
                }
    }


    return (
        <div className="app_wrapper">
            <img src={Ethereum} />
            <h2>Wallet Balance</h2>


            <div className="ext_account">
                <div className="my_account_address">
            
                    <h4> Check external wallet</h4>
                    <input placeholder={externalAddress} onChange={handleChangeAddress} />
                    <button onClick={handleCheckExternalAddress}>Check</button>
                    <p>Wallet value: {externalAddressEthAmount} ETH</p>
                </div>
            </div>

        </div>
    );
}

export { Dashboard };