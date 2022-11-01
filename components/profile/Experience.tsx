
import React, { useEffect, useState } from "react";


export const Experience = (props: { data: any; }) => {

    let [showCompanyExperience, setShowCompanyExperience] = useState(false)
    let [showFreelanceExperience, setShowFreelanceExperience] = useState(false)

    let companyExperience : any = props.data.companyExperience;
    const freelanceExperience : any = props.data.freelanceExperience;


    useEffect(() => {
        if(companyExperience  && companyExperience.length > 0){
            setShowCompanyExperience(true);
        };
        if(freelanceExperience && freelanceExperience.length > 0){
            setShowFreelanceExperience(true);
        };
    }, [companyExperience, freelanceExperience]);

    return(
        <div className="px-6">
            {showCompanyExperience || showFreelanceExperience? 
            <>
                <div className="flex flex-wrap justify-center">
                    <div className="w-full text-left mt-10">
                        <h3 className="text-2xl text-slate-700 dark:text-white font-bold leading-normal mb-1">WORK EXPERIENCE</h3>
                    </div>
                </div>
                <div className="mt-6 py-6 border-t border-slate-200 text-left">
                <div className="flex flex-wrap justify-center">
                    {
                        showCompanyExperience ? 
                        <>
                            <div className="w-full text-left px-4">
                                <h3 className="text-1xl text-slate-700 dark:text-white font-bold leading-normal mb-2">Company Employee</h3>
                            </div>
                            {companyExperience.reverse().map((company: any, i:any) => {     
                            return (
                                    <div className="w-full px-12 py-2" key={'company-' + i}>
                                        <h3 className="text-1xl text-slate-700 dark:text-white leading-normal">{company.companyName}</h3>
                                        <p className="font-medium leading-relaxed text-xs dark:text-gray-200 text-slate-600 ">{company.position} </p>
                                        <p className="font-medium leading-relaxed text-xs dark:text-gray-200 text-slate-600 ">{company.startDate} - {company.endDate}</p>
                                            {company.project.map((project: any, j:any) => {
                                                return(
                                                    <div key={'project-' + j}>
                                                        <p className="font-light leading-relaxed text-xs dark:text-gray-200 text-slate-600 " >- {project}</p>
                                                    </div>
                                                )
                                            })}
                                    </div>
                                )
                            })}
                        </>
                    : <></>
                    }

                    {
                        showFreelanceExperience ? 
                        <>
                            <div className="w-full text-left px-4 pt-4">
                                <h3 className="text-1xl text-slate-700 dark:text-white font-bold leading-normal mb-2">Freelance Jobs</h3>
                            </div>
                            {freelanceExperience.map((freelance: any, i:any) => {     
                            return (
                                    <div className="w-full px-12 py-2" key={'freelance-' + i}>
                                        <h3 className="text-1xl text-slate-700 dark:text-white leading-normal ">{freelance.projectName}</h3>
                                            <p className="font-light leading-relaxed text-xs dark:text-gray-200 text-slate-600 ">{freelance.detail}</p>
                                    </div>
                                )
                            })}
                        </>
                    : <></>
                    }
                </div>
            </div>
            </>
            :
            <></>
            }
            
        </div>
    );
}

