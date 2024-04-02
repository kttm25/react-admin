import React, { Component, SyntheticEvent } from "react"
import '../Login.css'
import axios from "axios";
import { Navigate } from "react-router-dom";

class Login extends Component {
    email = '';
    password = '';
    state = {
        redirect: false
    }

    submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        console.log({
            email: this.email,
            password: this.password,
        })

        try {
            const response = await axios.post('http://localhost:8000/api/login', {
                email: this.email,
                password: this.password
            })

            this.setState({
                redirect: true
            })
            console.log(this.state.redirect)
        } catch (e) {
            console.log(e)
        }


    }

    render() {
        if(this.state.redirect){
            return <Navigate to={'/login'}/>
        }else{
            return (
                <main className="form-signin w-100 m-auto">
                    <form onSubmit={this.submit}>
                        <h1 className="h3 mb-3 fw-normal">Please Login</h1>

                        <input type="email" className="form-control" placeholder="Email" required
                            onChange={e => this.email = e.target.value}
                        />
    
                        <input type="password" className="form-control" placeholder="Password" required
                            onChange={e => this.password = e.target.value}
                        />
    
                        <button className="btn btn-primary w-100 py-2" type="submit">Submit</button>
                    </form>
                </main>
            )
        }
        
    }
}

export default Login;