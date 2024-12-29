import './index.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Header = ()=>{

    const navigate = useNavigate();

    const logout = ()=>{

       Cookies.remove("jwtToken");

       navigate("/login");

    }


    return (

        <nav className='my-nav'>
                <Link to = "/"> 
                    <img src="https://tse1.mm.bing.net/th?id=OIP.RbMG-wqFOTBG1EMjTNWUeAHaE8&pid=Api&P=0&h=180" className='web-logo' />
                </Link>

                <ul className='nav-ul-cont'>
                    <li  className='nav-li'>
                        <Link to = "/" className='my-nav-items'>Home</Link>
                    </li>
                    <li>
                        <Link to = "/jobs" className='my-nav-items'>Jobs</Link>
                    </li>
                </ul>

                <button onClick={logout} className='btn' style={{backgroundColor:"rgba(166,80,231,255)"}}>Logout</button>

        </nav>

    )
}


export default Header;