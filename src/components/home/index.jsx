import './index.css';
import Header from '../header';
import { Link } from 'react-router-dom';

const Home = ()=>{



     return(

          <div className='home-cont'>

          <Header/>

          <div className='home-content-cont'>

           <h1 className='home-heading'>Find the Job that Fits your Life.</h1>

           <p>Millions of people are searching for jobs, sallry, information, company reviews.
           Find the jobs that firts your ability and your potential</p>

           <Link to = "/jobs"><button className='btn' style={{backgroundColor:"rgba(166,80,231,255)"}}>Find Jobs</button></Link>

          </div>

          </div>
     )

}

export default Home;