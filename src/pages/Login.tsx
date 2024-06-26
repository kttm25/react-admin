import axios from "axios";
import React, { SyntheticEvent, useState } from "react"
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Login = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)

    const submit = async (e: SyntheticEvent) =>{
        e.preventDefault();

        try{
            const {data} = await axios.post('login', {
                email: email,
                password: password 
            })
            
            setRedirect(true);
        }catch(e){
            console.log(e)
        }
    }

    if(redirect){
        return <Navigate to={'/'}/>
    }else{
        return (
            <main className="form-signin w-100 m-auto">
                        <form onSubmit={submit}>
                            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        
                            <input type="email" className="form-control" placeholder="Email" required
                                onChange={e => setEmail(e.target.value)}
                            />
        
                            <input type="password" className="form-control" placeholder="Password" required
                                onChange={e => setPassword(e.target.value)}
                            />
                            <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
                            <Link to={'/register'} >Create a new account</Link>
                        </form>
                    </main>
        )
    }

    
}

export default Login;