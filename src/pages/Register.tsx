import React, { Component, SyntheticEvent } from "react"
import '../Login.css'
import axios from "axios";
import { Navigate } from "react-router-dom";

class Register extends Component {
    first_name = '';
    last_name = '';
    email = '';
    password = '';
    password_confirm = '';
    state = {
        redirect: false
    }

    submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('register', {
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                password: this.password,
                password_confirm: this.password_confirm
            })

            this.setState({
                redirect: true
            })
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
                        <h1 className="h3 mb-3 fw-normal">Please signup</h1>
    
                        <input type="text" className="form-control" placeholder="First Name" required
                            onChange={e => this.first_name = e.target.value}
                        />
    
                        <input type="text" className="form-control" placeholder="LAst Name" required
                            onChange={e => this.last_name = e.target.value}
                        />
    
                        <input type="email" className="form-control" placeholder="Email" required
                            onChange={e => this.email = e.target.value}
                        />
    
                        <input type="password" className="form-control" placeholder="Password" required
                            onChange={e => this.password = e.target.value}
                        />
    
                        <input type="password" className="form-control" placeholder="Password Confirm" required
                            onChange={e => this.password_confirm = e.target.value}
                        />
    
                        <button className="btn btn-primary w-100 py-2" type="submit">Submit</button>
                    </form>
                </main>
            )
        }
        
    }
}

export default Register;