import { FaWindowMinimize } from "react-icons/fa";
import Web3 from "web3";
import axios from "axios";
import profile from '../../abi/profile.json'
import {Global} from './global'
import Router from 'next/router'
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window{
    ethereum?:MetaMaskInpageProvider
  }
}



export const init = async () => {
    
    const web3 = new Web3((window as any).ethereum);

    if(typeof window.ethereum !== "undefined"){
        // login
        let provider = window.ethereum
        let accounts : any = await provider.request({method: 'eth_accounts'});
        if (Global.loginMetaMask && accounts && accounts.length > 0) {
            Global.selectAccount = accounts[0];

            (window as any).ethereum.on('accountsChanged', async function  (accounts:any){
                Global.userInfo = {}
                Global.selectAccount = accounts[0];
                // redirect profile
                if(Global.loginMetaMask){
                    if(Global.selectAccount.toLowerCase() == Global.addressMySelf.toLowerCase()){
                        await getInfo(Global.selectAccount)
                        Router.push('/profile/' + Global.addressMySelf)
                    }else{
                        await getInfo(Global.selectAccount)
                        Router.push('/profile/'+ Global.selectAccount)
                    }
                }
                // window.location.reload()
            });
        } 
    }
   
    Global.profileContract = new web3.eth.Contract((profile as any), Global.addressContract)
    Global.isInit = true;
}



export const loginMetamask = async () => {
    const web3 = new Web3((window as any).ethereum);
    // login with metamask
    if(typeof window.ethereum !== "undefined"){
        Global.userInfo = {}
        let provider = window.ethereum;
        // get account 
        const accounts : any = await provider.send('eth_requestAccounts')
        if(accounts) Global.selectAccount = accounts.result[0];
        await getInfo(Global.selectAccount)
        Router.push('/profile/'+ Global.selectAccount)
        Global.loginMetaMask = true

    }
    Global.profileContract = new web3.eth.Contract((profile as any), Global.addressContract)
    Global.isInit = true;

    init()


}

export const logoutMetamask = async () => {
    // const web3 = new Web3((window as any).ethereum);
    // window.web3 = await web3.enable({ provider: "walletconnect" });
    await (window as any).ethereum.request({
        method: "eth_requestAccounts",
        params: [{eth_accounts: {}}]
    })
    Global.loginMetaMask = false
    Global.selectAccount = ''
    await getInfo(Global.addressMySelf)
    Router.push('/profile/' + Global.addressMySelf)
}



export const getInfo = async (address : string) => {
    // if(Global.isInit){
        return new Promise (async (resolve, reject) => {
            try {
                let url = "https://ornate-kelpie-e4aeee.netlify.app/.netlify/functions/api/profile?address=" + address
                // let url = "http://localhost:9000/.netlify/functions/api/profile?address="+ address
                let res = await axios.get(url)
                Global.userInfo = res.data
                resolve(Global.userInfo)
            } catch (error) {
                Router.push('/profile/' + Global.addressMySelf)
                reject(error)
            }
        });
        // console.log(Global.userInfo.information )
    // }
}