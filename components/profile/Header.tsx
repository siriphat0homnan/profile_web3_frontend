
import React, { useEffect, useState } from "react";
import ThemeSwitch from '../../components/button/ThemeSwitch';
import {Global} from '../../pages/api/global'
import {loginMetamask, logoutMetamask} from '../../pages/api/web3Init'
import { AiOutlineSetting, AiOutlineCloseCircle, AiOutlineDisconnect, AiOutlineSelect } from "react-icons/ai";



export const Header = () => {
    const [navbar, setNavbar] = useState(false);
    const [showModalSetting, setShowModalSetting] = useState(false);
    const [showModalAddress, setShowModalAddress] = useState(false);


    let frontAddress = ''
    let lastAddress = ''
    let urlExplorer = ''
    let addressContract = "https://testnet.bscscan.com/address/"+ Global.addressContract +"#writeContract"
    let contract = "https://testnet.bscscan.com/address/"+ Global.addressContract +"#code"




    if(Boolean(Global.loginMetaMask)){
        frontAddress = Global.selectAccount[0] + Global.selectAccount[1] + Global.selectAccount[2] + Global.selectAccount[3]
        lastAddress = Global.selectAccount[Global.selectAccount.length - 4] + Global.selectAccount[Global.selectAccount.length - 3] + Global.selectAccount[Global.selectAccount.length - 2] + Global.selectAccount[Global.selectAccount.length - 1]
        urlExplorer = "https://testnet.bscscan.com/address/" + Global.selectAccount
    }
    
    return (
        <nav className="w-full dark:bg-gray-900  border  rounded-xl bg-white shadow mb-5">
            <div className=" justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8 md:py-5">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                            navbar ? "block" : "hidden"
                        }`}
                    >
                        <ul className="items-center justify-center text-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            <li className="dark:text-white text-gray-600 hover:text-blue-600 max-w-md w-20">
                                <a href="/profile">Home</a>
                            </li>
                            <li className="dark:text-white text-gray-600 hover:text-blue-600 max-w-md w-auto">
                                <a href={addressContract} target="_blank" rel="noreferrer">Build Resume</a>
                            </li>
                            <li className="dark:text-white text-gray-600 hover:text-blue-600 max-w-md w-auto">
                                <a href={contract} target="_blank" rel="noreferrer"><span>Smart Contract</span></a>
                            </li>
                            <li className="dark:text-white text-gray-600 hover:text-blue-600 max-w-md w-auto">
                                {
                                    Global.loginMetaMask ? 
                                    <button className="font-semibold truncate block" onClick={() => setShowModalAddress(true)}>{frontAddress}...{lastAddress}</button>  
                                    : <button onClick={loginMetamask} ><span>Connect Metamask</span></button>
                                }
                                {showModalAddress ? (
                                    <>
                                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                        <div className="dark:bg-gray-900 dark:text-white border  rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                            <div className="flex inline-flex justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                                                <h2 className="text-xl font=semibold p-4">Your Account</h2>
                                                <AiOutlineCloseCircle className="text-xl mr-5" onClick={() => setShowModalAddress(false)}/>
                                            </div>
                                            <div className="relative p-6 flex-auto">
                                                <ul>
                                                    <li className="flex-inline">
                                                        <p className="px-6 text-sm">address: {Global.selectAccount}</p>
                                                        <p className="px-6 text-sm">network: BSC(Testnet)</p>
                                                    </li>

                                                    <li className="flex space-2 items-center justify-center f-full mt-5">
                                                        <a href={urlExplorer} target="_blank" rel="noreferrer">
                                                            <button onClick={logoutMetamask} className="flex-col align-center justify-center text-center-custom ">
                                                                <AiOutlineSelect className="text-4xl "></AiOutlineSelect>
                                                                <span className="px-6 text-sm">View in Explorer</span>
                                                            </button>
                                                        </a>
                                                        <button onClick={() => {setShowModalAddress(false); logoutMetamask(); }} className="flex-col align-center justify-center text-center-custom ">
                                                            <AiOutlineDisconnect className="text-4xl "></AiOutlineDisconnect>
                                                            <span className="px-6 text-sm">Logout</span>
                                                        </button>
                                                    </li>
                                                 
                                                </ul>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </>
                                ) : null}
                            </li>
                            <li className="dark:text-white  text-gray-600 hover:text-blue-600 max-w-md w-20">
                                
                                <AiOutlineSetting className="text-xl" onClick={() => setShowModalSetting(true)} />
                                {showModalSetting ? (
                                    <>
                                    <div className="flex justify-center text-gray-600 items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                        <div className="dark:bg-gray-900 dark:text-white border  rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                            <div className="flex inline-flex justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                                                <h2 className="text-xl font-semibold p-4">Setting</h2>
                                                <AiOutlineCloseCircle className="text-xl" onClick={() => setShowModalSetting(false)}/>
                                            </div>
                                            <div className="relative p-6 flex-auto">
                                                <ul>
                                                    <li className="inline-flex">
                                                        <span className="px-6 text-sm">Change Theme Color Dark and Light</span> <ThemeSwitch></ThemeSwitch>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </>
                                ) : null}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}




