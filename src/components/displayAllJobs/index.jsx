import './index.css';
import { FaStar , FaBriefcase} from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { Link } from 'react-router-dom';


const DisplayAllJobs = (props)=>{

   const {userDetails} = props;


    return (

        <Link className='details-link' to={`/jobs/${userDetails.id}`} style={{color: "black", textDecoration:"none"}}>
          
          <li className='jobs-card'>
           
          <div className='logo-title-rating-cont'>

                <img className= 'mr-3'src={userDetails.company_logo_url} alt="" width={"70px"} />

                <div>
                    <h3>{userDetails.title}</h3>
                    <FaStar className='mr-2 text-warning'/>
                    <span>{userDetails.rating}</span>
                </div>

          </div>

          <div className='location-ppa-empType-cont mt-2'>
 
             <div className='location-empType-cont'>
              <div>
                <FaLocationDot className='mr-1'/>
                <span className='mr-3'>{userDetails.location}</span>
                </div>
                <div>
                <FaLocationDot className='mr-1'/>
                <span>{userDetails.employment_type}</span>
                </div>

             </div>

             <h4>{userDetails.package_per_annum}</h4>

          </div>

          <hr />

          <h4>Description</h4>

          <p>{userDetails.job_description}</p>

          </li>

          </Link>

    )
}

export default DisplayAllJobs;