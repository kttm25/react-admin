import React, { Component, useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import { User } from "../../models/user";

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

  const prev = () => {
    if (page > 1 )
      setPage(page - 1)
  }

  const next = () => {
    if (page < lastpage)
      setPage(page + 1)
  }

  const del = (id: number) => {

  }

  return (
    <Wrapper>
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
                      <a href="#" className="btn btn-sm btn-outline-secondary" onClick={() => del(user.id)} >Delete</a>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <a href="#" className="page-link" onClick={prev}>Previous</a>
          </li>
          <li className="page-item">
            <a href="#" className="page-link" onClick={next}>Next</a>
          </li>
        </ul>
      </nav>
    </Wrapper>
  );
}

export default Users;