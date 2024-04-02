import React, { useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import { Role } from "../../models/role";
import { Link } from "react-router-dom";

const Roles = () => {
    const [roles, setRoles] = useState([])

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get('/roles')
                setRoles(data)
            }
        )()
    })

    const del = async (id: number) =>{
        if(window.confirm('Are you sure you want to delete this record?')){
            await axios.delete(`roles/${id}`);

            setRoles(roles.filter((r: Role) => r.id !== id))
        }
    }

    return (
        <Wrapper>
            <div className="table-responsive small">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            roles.map((r: Role) => {
                                return (
                                    <tr key={r.id} >
                                        <td>{r.id}</td>
                                        <td>{r.name}</td>
                                        <td>
                                            <div className="btn-group mr-2">
                                                <Link to={{ pathname: `/roles/edit`, search: `?id=${r.id}` }} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                                <a href="#" className="btn btn-sm btn-outline-secondary" onClick={() => del(r.id)} >Delete</a>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </Wrapper>
    )
}

export default Roles;