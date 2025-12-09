"use client";
import { useState, useEffect } from "react";
import PeopleTable from "../../Courses/[cid]/People/Table/PeopleTable";
import * as client from "../client";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
  loginId: string;
  section: string;
  lastActivity: string;
  totalActivity: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const createUser = async () => {
    const user = await client.createUser({
      firstName: "New",
      lastName: "User" + (users.length + 1),
      username: "newuser" + Date.now(),
      password: "password123",
      email: "newuser" + (users.length + 1) + "@neu.edu",
      section: "S101",
      role: "STUDENT",
    });
    setUsers([...users, user]);
  };
  const filterUsersByRole = async (role: string) => {
    setRole(role);
    if (role) {
      const users = await client.findUsersByRole(role);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };
  const filterUsersByName = async (name: string) => {
    setName(name);
    if (name) {
      const users = await client.findUsersByPartialName(name);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };
  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      <h3>Users</h3>
      <input value={name} onChange={(e) => filterUsersByName(e.target.value)} placeholder="Search people"
        className="form-control float-start w-25 me-2 wd-filter-by-name" />
      <select value={role} onChange={(e) => filterUsersByRole(e.target.value)}
        className="form-select float-start w-25 wd-select-role">
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>
      <button onClick={createUser} className="float-end btn btn-danger wd-add-people">
        <i className="me-2" />
        Users
      </button>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
