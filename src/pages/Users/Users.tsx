import React, { Component, useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import { User } from "../../models/user";
import { Link } from "react-router-dom";
import Paginator from "../../components/paginator";

const Users = () => {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1);
  const [lastpage, setLastPage] = useState(0);

  useEffect(() => {
    (
      async () => {
        const { data } = await axios.get(`users?page=${page}`);

        setUsers(data.data)
        setLastPage(data.meta.last_page)
      }
    )()
  }, [page])

  const del = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      await axios.delete(`users/${id}`);

      setUsers(users.filter((u: User) => (u.id !== id)))
    }
  }

  return (
    <Wrapper>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <Link to={"/users/create"} className="btn btn-sm btn-outline-secondary">Add</Link>
      </div>
      <div className="table-responsive small">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user: User, key) => (
                <tr key={key}>
                  <td scope="col">{user.id}</td>
                  <td scope="col">{user.first_name} {user.first_name}</td>
                  <td scope="col">{user.email}</td>
                  <td scope="col">{user.role.name}</td>
                  <td scope="col">
                    <div className="btn-group mr-2">
                      <Link to={{pathname : `/users/edit`, search: `?id=${user.id}` }} className="btn btn-sm btn-outline-secondary">Edit</Link>
                      <a href="#" className="btn btn-sm btn-outline-secondary" onClick={() => del(user.id)} >Delete</a>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <Paginator lastPage={lastpage} pageChanged={setPage} />
    </Wrapper>
  );
}

export default Users;