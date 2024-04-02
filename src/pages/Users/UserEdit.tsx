import { SyntheticEvent, useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import { Role } from "../../models/role";
import { Navigate, useSearchParams } from "react-router-dom";

const UserEdit = (props: any) => {
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [role_id, setRoleId] = useState(0)
    const [roles, setRoles] = useState([])
    const [redirect, setRedirect] = useState(false);
    //Get request parameters
    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get('roles')
                setRoles(data)

                const response = await axios.get(`users/${parseInt(searchParams.get('id')|| "0")}`)

                setFirstName(response.data.first_name);
                setLastName(response.data.last_name);
                setEmail(response.data.email);
                setRoleId(response.data.role.id)
            }
        )()
    }, [])

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        //Get id in param request
        await axios.put(`users/${parseInt(searchParams.get('id')|| "")}`, {
            first_name,
            last_name,
            email,
            role_id
        }).then((res) => {
            console.log(res)
        })

        setRedirect(true)
    }

    if (redirect)
        return <Navigate to={'/users'} />

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label> First Name</label>
                    <input type="text" defaultValue={first_name} className="form-control" onChange={(e) => setFirstName(e.target.value)} />
                </div>


                <div className="mb-3">
                    <label> Last Name</label>
                    <input type="text" defaultValue={last_name} className="form-control" onChange={(e) => setLastName(e.target.value)} />
                </div>


                <div className="mb-3">
                    <label> Email</label>
                    <input type="email" defaultValue={email} className="form-control" onChange={(e) => setEmail(e.target.value)} />
                </div>


                <div className="mb-3">
                    <label> Role</label>
                    <select className="form-control" value={role_id} onChange={(e) => setRoleId(parseInt(e.target.value))}>
                        {roles.map((r: Role) => (
                            <option key={r.id} value={r.id}>{r.name}</option>
                        ))}
                    </select>
                </div>

                <button className="btn btn-outline-secondary" type="submit">Save</button>
            </form>
        </Wrapper>
    )
}

export default UserEdit;