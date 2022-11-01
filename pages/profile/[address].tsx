/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage, GetStaticProps } from 'next'
import {Header} from "../../components/profile/Header";
import {Description} from "../../components/profile/Description";
import {Experience} from "../../components/profile/Experience";
import {Skill} from "../../components/profile/Skill";
import {Education} from "../../components/profile/Education";
import {Award} from "../../components/profile/Award";
import {Global} from '../api/global'
import { useEffect, useState } from 'react';
import SearchBar from '../../components/button/SearchBar';
import {getInfo} from '../api/web3Init'

const Profile: NextPage = ({address} : any) => {
    const [isInfo, setIsInfo] = useState(false);
    const [description, setDescription] = useState({});
    const [education, setEducation] = useState([] as any);
    const [experience, setExperience] = useState({});
    const [award, setAward] = useState({});
    const [skill, setSkill] = useState({});
    const [show, setShow] = useState(false);
    const [errorText, setErrorText] = useState('Loading data . . .');


    const setUserInfo = async() => {
        if(address){
            await getInfo(address).catch((err) => {
                setErrorText('Message: '+ err.message)
            })
            setIsInfo(true)
        }else{
            setIsInfo(false)
        }  
    }

    useEffect(() => {
        if(!isInfo){
            setUserInfo()
        }
        // set data
        if(isInfo && typeof Global.userInfo !== 'undefined' && Global.userInfo.code !== "INVALID_ARGUMENT" && Object.keys(Global.userInfo).length > 0){    
            // information
            let information = Global.userInfo.information
            let privateContract = Global.userInfo.privateContract
            let name = (information[4] == '-')? information[3] + ' ' + information[5] : information[3] + ' '+ information[4]  + ' ' + information[5] 
            
            setDescription({
                name: name, address:information[2], 
                aboutMe:information[0], 
                position:information[1], 
                profileImage:information[6],
                email: privateContract[1],
                phone: privateContract[2],
                github: privateContract[3],
                gitlab: privateContract[4],
                linkedin: privateContract[5],
            })

            // education
            let tmpEdu: any[] = []
            Global.userInfo.education.forEach((edu:any) => {
                tmpEdu.push({startDate: edu[0], endDate: edu[1], name: edu[2], degree: edu[3], research: edu[4]})
            });
            setEducation(tmpEdu.reverse())

            // company experience
            let tmpCompany: any[] = []
            Global.userInfo.companyExperience.forEach((company:any) => {
                tmpCompany.push({companyName: company[0], position: company[1], startDate: company[2], endDate: company[3], project: company[4]})
            });

            // freelance experience
            let tmpFreelance: any[] = []
            Global.userInfo.freelanceExperience.forEach((freelance:any) => {
                tmpFreelance.push({projectName: freelance[0], detail: freelance[1]})
            });

            // experience
            setExperience({companyExperience: tmpCompany.reverse(), freelanceExperience: tmpFreelance.reverse()});

            // skill
            setSkill({programmingLanguages: Global.userInfo.skill[0], framework: Global.userInfo.skill[1], databaseAndOther:Global.userInfo.skill[2] })
            // setSkill({programmingLanguages: [], framework: [], databaseAndOther: [] })

            // award
            setAward({ certification: Global.userInfo.certificateAndAward[0], award: Global.userInfo.certificateAndAward[1]});

            let show = (information[2] == "0x0000000000000000000000000000000000000000") ? false : true;
            setShow(show)
        }

        if(Global.userInfo.code === "INVALID_ARGUMENT"){
            setErrorText("INVALID ARGUMENT")
        }

    }, [Global.userInfo]);

    return (
        <div className='dark:bg-gray-700 text-gray-900 dark:text-gray-100 max-h-screen h-screen'>
            <div className='lg:max-w-7xl mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl'>
                <Header></Header>
            </div>
            <div className='lg:max-w-7xl mx-auto md:max-w-2xl min-w-0 break-words '>
                <SearchBar></SearchBar>  
            </div>
            <div id='print' className='py-16 mt-10'>
                    {address && show ? 
                    <div className='lg:px-24 flex flex-col dark:bg-gray-900 dark:border border-slate-500 text-gray-500 dark:text-white relative lg:max-w-7xl mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl' >
                        <Description data={description}></Description>
                        <Experience data={experience}></Experience>
                        <Education data={education}></Education>
                        <Skill data={skill}></Skill>
                        <Award data={award}></Award>
                    </div>: 
                    <div className='flex flex-col dark:bg-gray-900 dark:border border-slate-500 text-gray-500 dark:text-white relative max-w-md lg:max-w-7xl mx-auto  md:max-w-2xl min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl'>
                        <p className='p-24'>{errorText}</p>
                    </div>}
            </div>
        </div>
  )
}

Profile.getInitialProps = async ({query} : any) => {
    let {address} = query
    address = (address == 'siriphat_homnan') ? Global.addressMySelf: address;
    return {
        address
    }
}

export default Profile
