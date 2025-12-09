"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { Table } from "react-bootstrap";
import * as db from "../../../../Database";
import PeopleDetails from "../Details/PeopleDetails";

interface User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  role: string;
  loginId: string;
  section: string;
  lastActivity: string;
  totalActivity: string;
}

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface PeopleTableUser {
  _id: string;
  firstName: string;
  lastName: string;
  loginId: string;
  section: string;
  role: string;
  lastActivity: string;
  totalActivity: string;
}

export default function PeopleTable({ users = [], fetchUsers = () => {} }: { users?: PeopleTableUser[]; fetchUsers?: () => void }) {
    const { cid } = useParams();
    const { users: dbUsers, enrollments } = db;
    const [showDetails, setShowDetails] = useState(false);
    const [showUserId, setShowUserId] = useState<string | null>(null);
    
    return (
        <div id="wd-people-table">
            {showDetails && (
                <PeopleDetails
                    uid={showUserId}
                    onClose={() => {
                        setShowDetails(false);
                        fetchUsers();
                    }} />
            )}
            <Table striped>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Login ID</th>
                        <th>Section</th>
                        <th>Role</th>
                        <th>Last Activity</th>
                        <th>Total Activity</th>
                    </tr>
                </thead>
                <tbody>
                    {(users.length > 0 ? users : dbUsers
                        .filter((user: User) => 
                            enrollments.some((enrollment: Enrollment) => 
                                enrollment.user === user._id && enrollment.course === cid
                            )
                        ))
                        .map((user: PeopleTableUser) => (
                            <tr key={user._id}
                                onClick={() => {
                                    setShowDetails(true);
                                    setShowUserId(user._id);
                                }}
                                style={{ cursor: 'pointer' }}>
                                <td className="wd-full-name text-nowrap">
                                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                                    <span className="wd-first-name">{user.firstName}</span>{" "}
                                    <span className="wd-last-name">{user.lastName}</span>
                                </td>
                                <td className="wd-login-id">{user.loginId}</td>
                                <td className="wd-section">{user.section}</td>
                                <td className="wd-role">{user.role}</td>
                                <td className="wd-last-activity">{user.lastActivity}</td>
                                <td className="wd-total-activity">{user.totalActivity}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>
    );
}

