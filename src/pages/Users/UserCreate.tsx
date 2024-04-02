import { useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import { Role } from "../../models/role";

const UserCreate = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [roleId, setRoleId] = useState(0)
    const [roles, setRoles] = useState([])

    
    useEffect(() =>{
        (
            async () =>{
                const {data} = await axios.get('roles')
                setRoles(data)
            }   
        )()
    }, [])

    const submit = () => {

    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label> First Name</label>
                    <input type="text" className="form-control" onChange={(e) => setFirstName(e.target.value)}/>
                </div>

                
                <div className="mb-3">
                    <label> Last Name</label>
                    <input type="text" className="form-control" onChange={(e) => setLastName(e.target.value)}/>
                </div>

                
                <div className="mb-3">
                    <label> Email</label>
                    <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)}/>
                </div>

                
                <div className="mb-3">
                    <label> Role</label>
                    <select className="form-control" onChange={(e) => setRoleId(parseInt(e.target.value))}>
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

export default UserCreate;