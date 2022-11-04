
import React from "react";
import { FaGitlab, FaGithub, FaLinkedin, FaPhoneAlt } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';




export const Description = (props: { data: any; }) => {
    const name : string = props.data.name
    const address : string = props.data.userAddress;
    const aboutMe : string = props.data.aboutMe;
    const position : string = props.data.position;
    const img : string = props.data.profileImage;
    const email : string = props.data.email;
    const phone : string = props.data.phone;
    const github : string = props.data.github;
    const gitlab : string = props.data.gitlab;
    const linkedin : string = props.data.linkedin;

    return(
        <div>
            <div className="px-6">
                <div className="flex flex-wrap justify-center">
                    <div className="w-full flex justify-center">
                        <div className="relative">
                            <img src={img} className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"/>
                        </div>
                    </div>
                    <div className="w-full text-center mt-24">
                        <h3 className="text-2xl text-slate-700 dark:text-white font-bold leading-normal mb-1">{name}</h3>
                        <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                            <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>{position}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row mt-6 py-2 border-t border-slate-200 text-left">
                    <div className="mt-6 py-6  text-center">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full px-4">
                                <p className="font-medium leading-relaxed text-base dark:text-gray-200 text-slate-600 mb-4">{aboutMe}</p>
                            </div>
                        </div>
                    </div>
                    <div className="justify-center border-l border-slate-200 mx-4 pl-2">
                        <div className="w-full p-2 flex flex-row ">
                            <div className="w-5">
                                <FaPhoneAlt className="inline w-5 h-5"/> 
                            </div>
                            <p className="font-light leading-relaxed text-xs dark:text-gray-200 text-slate-600 pl-4"><a className="hover:text-black dark:hover:text-white"  href={"tel:"+ phone} target="_blank" rel="noreferrer"> {phone}</a></p>
                        </div>
                        <div className="w-full p-2 flex flex-row ">
                            <div className="w-5">
                                <FiMail className="inline w-5 h-5"/>
                            </div>
                            <p className="font-light leading-relaxed text-xs dark:text-gray-200 text-slate-600 pl-4" ><a className="hover:text-black dark:hover:text-white"  href={"mailto:"+ email} target="_blank" rel="noreferrer">{email}</a></p>
                        </div>
                        <div className="w-full p-2 flex flex-row ">
                            <div className="w-5">
                                <FaGithub className="inline w-5 h-5"/>
                            </div>
                            <p className="font-light leading-relaxed text-xs dark:text-gray-200 text-slate-600 pl-4" ><a className="hover:text-black dark:hover:text-white"  href={github} target="_blank" rel="noreferrer"> {github} </a></p>
                        </div>
                        <div className="w-full p-2 flex flex-row ">
                            <div className="w-5">
                                <FaGitlab className="inline w-5 h-5"/>
                            </div>
                            <p className="font-light leading-relaxed text-xs dark:text-gray-200 text-slate-600 pl-4" > <a className="hover:text-black dark:hover:text-white"  href={gitlab} target="_blank" rel="noreferrer"> {gitlab}</a></p>
                        </div>
                        <div className="w-full p-2 flex flex-row ">
                            <div className="w-5">
                                <FaLinkedin className="inline w-5 h-5"/>
                            </div>
                            <p className="font-light leading-relaxed text-xs dark:text-gray-200 text-slate-600 pl-4" > <a className="hover:text-black dark:hover:text-white"  href={linkedin} target="_blank" rel="noreferrer">{linkedin}</a></p>
                        </div>
                    </div>
                </div>
          
            </div>
        </div>
    );
}

