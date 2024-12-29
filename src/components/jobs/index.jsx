import './index.css';
import Header from '../header';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import DisplayAllJobs from '../displayAllJobs';
import FilterSec from '../filterSec';

const Jobs = ()=>{

    const token = Cookies.get("jwtToken");

    const [allValues,setValues] = useState({
        userList : [],
        userInput : "",
        emptyList : [],
        minPackage : ""
    });

    useEffect(()=>{

        const fetchUserData = async()=>{

            const api = `https://apis.ccbp.in/jobs?employment_type=${allValues.emptyList}&minimum_package=${allValues.minPackage}&search=${allValues.userInput}`;

            const options = {
                method: "Get",
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }

            try{

            const response = await fetch(api,options);

            const data = await response.json();

            if(response.ok === true){

               setValues({...allValues,userList:data.jobs});

            }

            }catch(error){

                console.log("Error");

            }


        }

        fetchUserData();

    },[allValues.userInput, allValues.emptyList,allValues.minPackage]);

    const OnGetUserIn = (e)=> {

          if(e.key == "Enter"){

            setValues({...allValues,userInput:e.target.value});

          }

    }

    const changeEmpList = (value,isChecked)=> {

        if(isChecked === true){

            setValues({...allValues,emptyList : [...allValues.emptyList,value]});

        }else{

            setValues({...allValues,emptyList : [...allValues.emptyList.filter(each => each !== value)]});

        }

    }

    const changeRange = (range)=>{

        setValues({...allValues,minPackage : range});

    }

    return(

         <>

             {/* <Header/>

             <div className="container">

               <div className='row'>

                   <div className='col-5 filter-cont p-4'>
                    <FilterSec anonymousFunc = {changeEmpList} anonFunc = {changeRange}/>
                    </div>

                    <div className='col-7 all-jobs-cont p-4 d-flex flex-column align-items-center'>
                        <input onKeyUp={OnGetUserIn} type="search" className='form-control w-75 border-primary'/>
                   <ul className='p-4'>
                   
                      {
                           
                           allValues.userList.map(each => <DisplayAllJobs userDetails = {each} key = {each.id}/>)

                      }

                   </ul>
                   
                   </div>

               </div>

             </div> */}

            <Header/>

            <div className='job-bg-first'>
                <div className='three-cont-div'>
                    <div>
                        <h1>Jobs</h1>
                    </div>
                    <div>
                        <p style={{alignItems:"center", padding:"10px"}}>Search your career opportunity through 12,800 jobs</p>
                    </div>
                    <div className='search-main-bg'>
                        <div className='search-form'>
                        <input onKeyUp={OnGetUserIn} type="search"  className="form-control mr-sm-2 inputsearch" style={{width:"60vw"}}placeholder="Search"/>
                        </div>
                    </div>
                </div>
            </div> 

            <div className='main-f-d-cont'>
                <div className='filter-disply-cont'>
                    <div className='filter-cont'>
                        <div className='fil-color-box'>
                        <FilterSec anonymousFunc = {changeEmpList} anonFunc = {changeRange}/>
                        </div>
                    </div>
                    <div className='all-jobs-cont p-4 d-flex flex-column align-items-center displayalljobs'>
                    <ul className='p-4'>
                     {
                        
                        allValues.userList.map(each => <DisplayAllJobs userDetails = {each} key = {each.id}/>)

                     }
                     </ul>
                    </div>
                </div>
            </div>


         </>

    )

}

export default Jobs;