"use client";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaCheck, FaPencil } from "react-icons/fa6";
import * as client from "../../../../Account/client";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  loginId: string;
  section: string;
  totalActivity: string;
}

export default function PeopleDetails({ uid, onClose }: { uid: string | null; onClose: () => void; }) {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");                           // to edit the user's first and last name
  const [editing, setEditing] = useState(false);                  // whether we are editing or not
  
  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
  };
  
  useEffect(() => {
    if (uid) fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);
  
  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    onClose();
  };
  
  const saveUser = async () => {                                  // to save updates to user's name
    if (!user) return;
    const nameParts = name.trim().split(" ");                     // split the name into parts
    const firstName = nameParts[0] || "";                         // first word is firstName
    const lastName = nameParts.slice(1).join(" ") || "";          // rest is lastName
    const updatedUser = { ...user, firstName, lastName };         // create new version of user
    await client.updateUser(updatedUser);                         // send update to server
    setUser(updatedUser);                                         // update local copy of the user
    setEditing(false);                                            // turn off editing
    onClose();
  };
  
  if (!uid || !user) return null;
  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button onClick={onClose} className="btn btn-light float-end">
        <i className="fa fa-times"></i>
      </button>
      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <div className="text-danger fs-4 wd-name">
        {!editing && (
          <FaPencil onClick={() => setEditing(true)}
            className="float-end fs-5 mt-2 wd-edit" />
        )}
        {editing && (
          <FaCheck onClick={() => saveUser()}
            className="float-end fs-5 mt-2 me-2 wd-save" />
        )}
        {!editing && (
          <div className="wd-name"
            onClick={() => setEditing(true)}>
            {user.firstName} {user.lastName}
          </div>
        )}
        {user && editing && (
          <input className="form-control w-50 wd-edit-name"
            defaultValue={`${user.firstName} ${user.lastName}`}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { saveUser(); }
            }} />
        )}
      </div>
      <b>Roles:</b> {user.role}<br />
      <b>Login ID:</b> {user.loginId}<br />
      <b>Section:</b> {user.section}<br />
      <b>Total Activity:</b> {user.totalActivity}<br />
      <hr />
      <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete">
        Delete
      </button>
      <button onClick={onClose} className="btn btn-secondary float-end me-2 wd-cancel">
        Cancel
      </button>
    </div>
  );
}
