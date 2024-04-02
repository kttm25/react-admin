import axios, { AxiosResponse } from "axios";
import React, { Component, useEffect, useState } from "react";

const Nav = () => {
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        email: ''
    })

    useEffect(() =>{
        axios.get('user').then((res: AxiosResponse) =>{
            setUser(res.data)
        }).catch((e)=> {
            console.log(e)
        })
    }, [])

    return (
        <header className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" href="#">Company name</a>
            <input className='from-control form-control-dark w-100' type="text" placeholder='search' aria-label='Search' />
            <ul className='navbar-nav px-3'>
                <li className='="nav-item text-nowrap'>
                    <a className="p-2 text-white text-decoration-none" href='#'>{user?.first_name}</a>
                    <a className="p-2 text-white text-decoration-none" href='#'>Sign out</a>
                </li>
            </ul>
        </header>
    )
}

export default Nav; 