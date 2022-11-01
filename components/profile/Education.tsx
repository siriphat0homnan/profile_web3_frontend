/* eslint-disable react/jsx-key */

import React from "react";

export const Education = (props: { data: any; }) => {

    // console.log(props.data)
    let educations = props.data
    return(
        <div className="px-6">
            <div className="flex flex-wrap justify-center">
                <div className="w-full text-left mt-10">
                    <h3 className="text-2xl text-slate-700 dark:text-white font-bold leading-normal mb-1">EDUCATION</h3>
                </div>
            </div>
            <div className="mt-6 py-6 border-t border-slate-200 text-left">
                <div className="flex flex-wrap justify-center">
                    {educations.map((education: any, i:any) => {     
                        return (
                            <div className="w-full px-4 py-4" key={'education-' + i}>
                                <h3 className="text-1xl text-slate-700 dark:text-white font-bold leading-normal mb-1 mb-2">{education.name}</h3>
                                <div className="pl-4">
                                    <p className="font-medium leading-relaxed text-xs dark:text-gray-200 text-slate-600 ">{education.startDate} - {education.endDate}</p>
                                    <p className="font-light leading-relaxed text-xs dark:text-gray-200 text-slate-600 ">{education.degree}</p>
                                    <p className="font-light leading-relaxed text-xs dark:text-gray-200 text-slate-600 ">Research: {education.research}</p>
                                </div>
                            </div>
                        )
                    })}
                    
                </div>
            </div>
        </div>
    );
}

