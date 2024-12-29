import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import Cookies from 'js-cookie';

const Login = ()=>{

    const[allvalues,setValues] = useState({
        username : "",
        password: "",
        errorMsg: "",
    });

    const navigate = useNavigate();

    const token = Cookies.get("jwtToken");

    const onsubmituserdata = async(e)=>{

        e.preventDefault();

        const api = "https://apis.ccbp.in/login";

        const userDetails = {
            username : allvalues.username,
            password: allvalues.password
        }

        const options = {
            method: "Post",
            body: JSON.stringify(userDetails)
        }

        try{

        const response = await fetch(api,options);

        const data = await response.json();

        if(response.ok === true){

            setValues({...allvalues,errorMsg: ""});

            Cookies.set("jwtToken" , data.jwt_token);

            navigate("/");

        }else{

            setValues({...allvalues,errorMsg: data.error_msg});

        }

        }
        catch(error){

            console.log("Error");

        }
    }

    useEffect(()=>{

        if(token !== undefined){

            navigate("/");

        }

    },[])

    return(

        <>

        <div className='main-cont'></div>

        <div className='container'>

            <div className='modal'>

            <div class="login-right">
                <img className='img' src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dfd2ec5a01006fd8c4d7592a381d3776&auto=format&fit=crop&w=1000&q=80" alt="" />
            </div>

            <div className="login-left">

                <h3 style={{textAlign:"center"}} className='login-title'>Login</h3> <br />

                <form onSubmit={onsubmituserdata}>
                <div className="form-group">
                <label htmlFor="exampleInputEmail1">UserName</label>
                <input onChange={(e)=>{setValues({...allvalues,username: e.target.value})}} type="text" className="form-control form-rounded" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your user details with anyone else.</small>
                </div>
                <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input onChange={(e)=>{setValues({...allvalues,password: e.target.value})}} type="password" className="form-control form-rounded" id="exampleInputPassword1"/>
                </div>
                <button type="submit" className="button">Submit</button>
                </form>
                <br />
                <p className='text-danger'>{allvalues.errorMsg}</p>

                </div>

            </div>

            </div>

            </>

    )

}

export default Login;