import React, { Component } from "react";

class Nav extends Component {
    render(): React.ReactNode {
        return (
            <header className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">
                <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" href="#">Company name</a>
                <input className='from-control form-control-dark w-100' type="text" placeholder='search' aria-label='Search' />
                <ul className='navbar-nav px-3'>
                    <li className='="nav-item text-nowrap'>
                        <a className="nav-link" href='a'>Sign out</a>
                    </li>
                </ul>

                <div id="navbarSearch" className="navbar-search w-100 collapse">
                    <input className="form-control w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search" />
                </div>
            </header>
        )
    }
}

export default Nav; 