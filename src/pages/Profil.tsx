import React, { SyntheticEvent, useEffect, useState } from 'react';
import Wrapper from '../components/Wrapper';
import axios from 'axios';

import { connect } from 'react-redux'
import { User } from '../models/user';
import { Dispatch } from 'redux';
import { setUser } from '../redux/actions/setUserAction';

const Profil = (props: {user: User, setUser: (user: User) => void}) => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirm, setPasswordConfirm] = useState('');

    useEffect(() => {
        setLastName(props.user.last_name)
        setFirstName(props.user.first_name);
        setEmail(props.user.email)
    }, [props.user])

    const infoSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        const {data} = await axios.put('users/info', {
            first_name,
            last_name,
            email
        })

        props.setUser(new User(
            data.id,
            data.first_name,
            data.last_name,
            data.email,
            data.role,
        ));
    }

    const passwordSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();


        await axios.put('users/password', {
            password,
            password_confirm
        })
    }

    return (
        <Wrapper>
            <h3>Account Information</h3>
            <form onSubmit={infoSubmit}>
                <div className='mb-3'>
                    <label>First Name</label>
                    <input defaultValue={first_name} className='form-control' onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <label>Last Name</label>
                    <input defaultValue={last_name} className='form-control' onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <label>Email</label>
                    <input defaultValue={email} className='form-control' onChange={(e) => setEmail(e.target.value)} />
                </div>

                <button className='btn btn-outline-secondary'>Save</button>
            </form>

            <h3>Change password</h3>
            <form onSubmit={passwordSubmit}>
                <div className='mb-3'>
                    <label>Password</label>
                    <input type="password" className='form-control' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <label>Password Confirm</label>
                    <input type="password" className='form-control' onChange={(e) => setPasswordConfirm(e.target.value)} />
                </div>

                <button className='btn btn-outline-secondary'>Save</button>
            </form>
        </Wrapper>
    );
};

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


export default connect(mapStateToProps, mapDispatchToProps)(Profil); 