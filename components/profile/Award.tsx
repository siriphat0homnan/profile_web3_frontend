/* eslint-disable react/jsx-key */

import React from "react";

export const Award = (props: { data: any; }) => {

    // console.log(props.data)
    let awards = props.data.award
    let certifications = props.data.certification

    return(
        <div className="px-6">
            <div className="flex flex-wrap justify-center">
                <div className="w-full text-left mt-10">
                    <h3 className="text-2xl text-slate-700 dark:text-white font-bold leading-normal mb-1">AWARDS & CERTIFICATIONS</h3>
                </div>
            </div>
            <div className="mt-6 py-6 border-t border-slate-200 text-left">
                <div className="flex flex-wrap justify-center">
                    <div className="w-full text-left px-4">
                        <h3 className="text-1xl text-slate-700 dark:text-white font-bold leading-normal ">Awards</h3>
                    </div>
                    {awards.map((award: any, i:any) => {     
                        return (
                            <div className="w-full px-4 py-4" key={'award-' + i}>
                                <div className="pl-4">
                                    <p className="font-light leading-relaxed text-xs dark:text-gray-200 text-slate-600 ">- {award}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="flex flex-wrap justify-center mt-2">
                    <div className="w-full text-left px-4">
                        <h3 className="text-1xl text-slate-700 dark:text-white font-bold leading-normal ">Certifications</h3>
                    </div>
                    {certifications.map((certification: any, i:any) => {     
                        return (
                            <div className="w-full px-4 py-4" key={'certification-' + i}>
                                <div className="pl-4">
                                    <p className="font-light leading-relaxed text-xs dark:text-gray-200 text-slate-600 ">- {certification}</p>
                                </div>
                            </div>
                        )
                    })}
                    
                </div>
            </div>
        </div>
    );
}

