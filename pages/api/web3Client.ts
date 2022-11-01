
import Web3 from "web3";
import profile from '../../abi/profile.json'
import {Global} from './global'

export class getWeb3 {
    async init () {
        const web3 = new Web3((window as any).ethereum);
            // login
            // if(provider !== 'undefined'){
            //   // login with metamask
            //   // get account 
            //   const accounts = await provider.send('eth_requestAccounts')
            //   if(accounts) Global.selectAccount = accounts.result[0];
            //   // change account
            // //   (window as any).ethereum.on('accountsChanged', function (accounts:any){
            // //     Global.selectAccount = accounts[0];
            // //   });
            // }
            Global.profileContract = new web3.eth.Contract((profile as any), Global.addressContract)
            Global.isInit = true;
        }

    // async getInfo (address : string) : Promise< any > {
    //     if(Global.isInit){
    //         // console.log(Global.isInit, Global.profileContract.methods.profile(address))
    //         return new Promise (async (resolve, reject) => {
    //             try {
    //                 Global.userInfo = await Global.profileContract.methods.profile(address).call({from : address});
    //                 resolve(Global.userInfo)
    //             } catch (error) {
    //                 return error
    //             }
    //         });
    //         // console.log(Global.userInfo.information )
    //     }
    // }
}

// export const init = async () => {
//     const web3 = new Web3((window as any).ethereum);
//     // login
//     // if(provider !== 'undefined'){
//     //   // login with metamask
//     //   // get account 
//     //   const accounts = await provider.send('eth_requestAccounts')
//     //   if(accounts) Global.selectAccount = accounts.result[0];
//     //   // change account
//     // //   (window as any).ethereum.on('accountsChanged', function (accounts:any){
//     // //     Global.selectAccount = accounts[0];
//     // //   });
//     // }
//     Global.profileContract = new web3.eth.Contract((profile as any), Global.addressContract)
//     Global.isInit = true;
// }

// export const getInfo = async (address : string) => {
//     if(Global.isInit){
//         // await init()
//         // console.log(Global.isInit, Global.profileContract.methods.profile(address))
//         Global.userInfo = await Global.profileContract.methods.profile(address).call({from : address});
//         console.log(">>>>", Global.userInfo)
//         return Global.userInfo;
//         // console.log(Global.userInfo.information )
//     }
// }