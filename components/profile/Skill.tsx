/* eslint-disable react/jsx-key */

import React, { useEffect, useState } from "react";

export const Skill = (props: { data: any; }) => {
    let [show, setShow] = useState(false)
    const programmingLanguages : any = props.data.programmingLanguages;
    const framework : any = props.data.framework;
    const databaseAndOther : any = props.data.databaseAndOther;

    useEffect(() => {
        if(programmingLanguages && databaseAndOther && framework && (programmingLanguages.length > 0 || framework.length > 0  || databaseAndOther.length > 0)){
            setShow(true);
        };
    }, [programmingLanguages, databaseAndOther, framework]);

    let showPl = []
    if(programmingLanguages) showPl = programmingLanguages;

    let showFw = []
    if(framework) showFw = framework;

    let showDb = []
    if(databaseAndOther) showDb = databaseAndOther;


   
    return(
        <div className="px-6">
            { show ? <>
                <div className="flex flex-wrap justify-center">
                <div className="w-full text-left mt-10">
                    <h3 className="text-2xl text-slate-700 dark:text-white font-bold leading-normal mb-1">SKILLS</h3>
                </div>
            </div>
            <div className="mt-6 py-6 border-t border-slate-200 text-left">
                <div className="flex flex-col md:flex-row justify-center">
                    <div className="w-full px-4 py-4">
                        <h3 className=" text-1xl text-slate-700 dark:text-white font-bold leading-normal mb-1 mb-2">Programmer Languages</h3>
                        <div className="pl-4">
                            {showPl.map((el: any, i: any) => {     
                                return (
                                    <p className="font-light leading-relaxed text-xs dark:text-gray-200 text-slate-600 " key={'pl-' + i}>- {el}</p>
                                )
                            })}
                        </div>
                    </div>
                    <div className="w-full px-4 py-4">
                        <h3 className=" text-1xl text-slate-700 dark:text-white font-bold leading-normal mb-1 mb-2">Development Frameworks</h3>
                        <div className="pl-4">
                                {showFw.map((el: any, i: any) => {     
                                    return (
                                        <p className="font-light leading-relaxed text-xs dark:text-gray-200 text-slate-600 " key={'fw-' + i}>- {el}</p>
                                    )
                                })}
                        </div>
                    </div>

                    <div className="w-full px-4 py-4">
                        <h3 className=" text-1xl text-slate-700 dark:text-white font-bold leading-normal mb-1 mb-2">Database and Others</h3>
                        <div className="pl-4">
                                {showDb.map((el: any, i: any) => {     
                                    return (
                                        <p className="font-light leading-relaxed text-xs dark:text-gray-200 text-slate-600" key={'db-' + i}>- {el}</p>
                                    )
                                })}
                        </div>
                    </div>
                </div>
            </div>
            
            </> :  <></> }

           
        </div>
    );
}

