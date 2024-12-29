import './index.css';
import Header from '../header';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaStar, FaBriefcase} from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import Cookies from 'js-cookie';

const JobItemDetails = ()=> {

    const token = Cookies.get("jwtToken");

    const [allValues,setValues] = useState({
        userDetails : []
    })

    const [allSkills,setSkills] = useState({

        Skills :[]
    })

    const [allLifeCompany,setLifeCompay] = useState({

        lifeAtCompany: {}
    })

    const [allsimilarJobs, setsimilarJobs] = useState({

        similarJobs: []
   })


    const{id} = useParams();

    useEffect(()=>{

        const fetchUserData = async()=>{

            const api = `https://apis.ccbp.in/jobs/${id}`;

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


                setValues({...allValues,userDetails : data.job_details});

                setSkills({...allSkills,Skills:data.job_details.skills})

                setLifeCompay({...allLifeCompany,lifeAtCompany:data.job_details.life_at_company})

                setsimilarJobs({...allsimilarJobs,similarJobs:data.similar_jobs})

             }

            }catch(error){

                console.log("Error");

            }


        }

        fetchUserData();

    },[]);

    return(

        <>

        <Header/>

        <div className='jobdetail-main-cont'>

        <div >
    
        <div className='logo-title-rating-cont'>

           <img className= 'mr-3'src={allValues.userDetails.company_logo_url} alt="" width={"70px"} />

          <div>
             <h3>{allValues.userDetails.title}</h3>
             <FaStar className='mr-2 text-warning'/>
             <span>{allValues.userDetails.rating}</span>
          </div>

        </div>

        <div className='location-ppa-empType-cont mt-2'>

           <div className='location-empType-cont'>

               <div>
               <FaLocationDot className='mr-1'/>
               <span className='mr-3'>{allValues.userDetails.location}</span>
               </div>

               <div>
               <FaLocationDot className='mr-1'/>
               <span>{allValues.userDetails.employment_type}</span>
               </div>

           </div>

           <h4>{allValues.userDetails.package_per_annum}</h4>

        </div>

        <hr />

        <h4>Description</h4>

        <p>{allValues.userDetails.job_description}</p> <br />

        <h4>Skills</h4>

        <div className='flex-container skills-main-cont'>
        {
            allSkills.Skills.map(each=>(


            <li key={each.id} className="flex-items skill-each-cont mr-5">

            <span className='icon-name'>
        
            <img src={each.image_url} className='skill-icon'/>
            <p className='skill-name'>{each.name}</p>
            
            </span>
            </li>
        ))
}  
        </div> <br />

        <div className='life-main-cont'>

          <div className='lifedescription-cont'>

          <h4>Life at Company</h4> <br />

          <p>{allLifeCompany.lifeAtCompany.description}</p>

          </div>

          <div className='flex-items life-image-cont'>

            <img style={{width:"100%"}} className='rounded' src={allLifeCompany.lifeAtCompany.image_url}  />

          </div>

        </div>

        <div>

        <h4>Similar Jobs</h4> <br />

        <ul className='flex-container'>

            {

            allsimilarJobs.similarJobs.map((each=>

            <li key={each.id} className='flex-item'>

            <div className='logo-title'>

            <div>
                <img src={each.company_logo_url} className='similar-image mr-3'/>
            </div>

            <div className='similar-details'>

            <h3 >{each.title}</h3>

            <div>
            <FaStar className='mr-2 text-warning'/>
            <span>{each.rating}</span>
            </div>

            </div>

            </div>
            <hr style={{backgroundColor: "white"}}/>

            <h2>Description</h2>

            <span className='each-info'>{each.job_description}</span>

            <br /><br />
            <div>
            <FaLocationDot className='mt-2' />

            <span className='m-2'>{each.location}</span>  

            <FaBriefcase className='mr-2 mt-2' />

            <span>{each.employment_type}</span>    

            </div>
            </li>
            ))

            }

            </ul>

            </div>

        </div>

        </div>

        </>


    )
}

export default JobItemDetails;