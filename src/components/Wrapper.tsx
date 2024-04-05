import React, { Component, useEffect, useState } from 'react';
import Nav from './Nav';
import Menu from './Menu';
import axios, { AxiosResponse } from 'axios';
import { Navigate } from 'react-router-dom';

import { connect } from 'react-redux'
import { User } from '../models/user';
import { Dispatch } from 'redux';
import { setUser } from '../redux/actions/setUserAction';

const Wrapper = (props: any) => {
    const [redirect, setRedirect] = useState(false)
    useEffect(() => {
        axios.get('user').then((res: AxiosResponse) => {

            props.setUer(new User(
                res.data.id,
                res.data.first_name,
                res.data.last_name,
                res.data.email,
                res.data.role,
            ))
        }).catch((e) => {
            setRedirect(true);
        })
    }, [])

    if (redirect) {
        return <Navigate to={'/login'} />
    }
    return (
        <>
            <Nav />

            <div className="container-fluid">
                <div className="row">
                    <Menu />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        {props.children}
                    </main>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state: { user: User }) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        setUser: (user: User) => dispatch(setUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);