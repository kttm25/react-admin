import React, { SyntheticEvent, useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import { Permission } from "../../models/permission";
import { Navigate, useSearchParams } from "react-router-dom";

const RolesEdit = () => {

    const [name, setName] = useState('');
    const [permissions, setPermissions] = useState([]);
    const [selected, setSelected] = useState([] as number[]);
    const [redirect, setRedirect] = useState(false)
    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get('permissions');

                setPermissions(data);

                const response = await axios.get(`roles/${parseInt(searchParams.get('id') || "0")}`);
                setName(response.data.name)
                setSelected(response.data.permissions.map((p: Permission) => (p.id)))
            })()
    }, [])

    const check = (id: number) => {
        if (selected.some((per_id) => (per_id === id))) {
            selected.filter((per_id) => (per_id !== id))
        } else {
            setSelected([...selected, id])
        }
    }

    const submit = (e: SyntheticEvent) => {
        e.preventDefault();

        (
            async () => {
                await axios.put(`roles/${parseInt(searchParams.get('id') || "0")}`, {
                    name,
                    permissions: selected
                })
            }
        )()
        setRedirect(true)
    }

    if (redirect)
        return <Navigate to={'/roles'} />

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3 mt-3 row">
                    <label> Name</label>
                    <input type="text" className="form-control" defaultValue={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label"> Permissions</label>
                    <div className="col-sm-10">
                        {permissions.map((per: Permission) => {
                            return (
                                <div className="form-check form-check-inline col-3" key={per.id}>
                                    <input className="form-check-input" type="checkbox"
                                        checked={selected.some(s => s === per.id)}
                                        value={per.id} 
                                        onChange={() => check(per.id)} />
                                    <label className="form-check-label">{per.name}</label>
                                </div>
                            )
                        })}
                    </div>

                </div>

                <button className="btn btn-outline-secondary" type="submit">Save</button>
            </form>
        </Wrapper>
    )
}

export default RolesEdit