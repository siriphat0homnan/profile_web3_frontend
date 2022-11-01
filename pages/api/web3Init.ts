import { FaWindowMinimize } from "react-icons/fa";
import Web3 from "web3";
import axios from "axios";
import profile from '../../abi/profile.json'
import {Global} from './global'
import Router from 'next/router'


export const init = async () => {
    const web3 = new Web3((window as any).ethereum);

    if(typeof window.ethereum !== "undefined"){
        // login
        let provider = window.ethereum
        let accounts = await provider.request({method: 'eth_accounts'});
        if (Global.loginMetaMask && accounts && accounts.length > 0) {
            Global.selectAccount = accounts[0];

            (window as any).ethereum.on('accountsChanged', function (accounts:any){
                Global.selectAccount = accounts[0];
                // redirect profile

                if(Global.loginMetaMask){
                    if(Global.selectAccount.toLowerCase() == Global.addressMySelf.toLowerCase()){
                        Router.push('/profile/siriphat_homnan')
                        getInfo(Global.selectAccount)
                    }else{
                        Router.push('/profile/'+ Global.selectAccount)
                        getInfo(Global.selectAccount)
                    }
                }
    window.location.reload()
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
        let provider = window.ethereum;
        // get account 
        const accounts = await provider.send('eth_requestAccounts')
        if(accounts) Global.selectAccount = accounts.result[0];
        Router.push('/profile/'+ Global.selectAccount)

        getInfo(Global.selectAccount)

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
    Router.push('/profile/siriphat_homnan')
    getInfo(Global.addressMySelf)
}



export const getInfo = async (address : string) => {
    if(Global.isInit){
        return new Promise (async (resolve, reject) => {
            try {
                let url = "https://ornate-kelpie-e4aeee.netlify.app/.netlify/functions/api/profile?address=" + address
                let res = await axios.get(url)
                Global.userInfo = res.data
                // Global.userInfo = await Global.profileContract.methods.profile(address).call({from : address});
                // let educationCount = await Global.profileContract.methods.getEducationCount().call({from : address});
                // let education = []
                // for (let index = 0; index < educationCount; index++) {
                //     education.push(await Global.profileContract.methods.getEducation(index).call({from : address}));
                // }
                // Global.userInfo.educationCount = educationCount;
                // Global.userInfo.education = education;
                resolve(Global.userInfo)
            } catch (error) {
                Router.push('/profile/siriphat_homnan')
            }
        });
        // console.log(Global.userInfo.information )
    }
}