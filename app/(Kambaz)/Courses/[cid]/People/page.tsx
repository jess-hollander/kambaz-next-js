"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./Table/PeopleTable";
import * as coursesClient from "../../client";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  loginId: string;
  section: string;
  role: string;
  lastActivity: string;
  totalActivity: string;
}

export default function People() {
    const { cid } = useParams();
    const [users, setUsers] = useState<User[]>([]);
    
    const fetchUsers = async () => {
        const enrolledUsers = await coursesClient.findUsersForCourse(cid as string);
        setUsers(enrolledUsers);
    };
    
    useEffect(() => {
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cid]);
    
    return (
        <div>
            <h2>People</h2>
            <PeopleTable users={users} fetchUsers={fetchUsers} />
        </div>
    );
}