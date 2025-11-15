import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
function WorkingWithObjects() {

  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });
  const ASSIGNMENT_URL = `${API_BASE}/lab5/assignment`;

  const [module, setModule] = useState({
    id: 1,
    name: "NodeJS",
    description: "NodeJS uses JavaScript to write server-side code",
    course: "Web Development",
  });

  const fetchAssignment = useCallback(async () => {
    const response = await axios.get(`${ASSIGNMENT_URL}`);
    setAssignment(response.data);
  }, [ASSIGNMENT_URL]);
  const updateTitle = async () => {
    const response = await axios
      .get(`${ASSIGNMENT_URL}/title/${assignment.title}`);
    setAssignment(response.data);
  };
  useEffect(() => {
    fetchAssignment();
  }, [fetchAssignment]);

  return (
    <div>
      <h3>Working With Objects</h3>
      <h3>Modifying Properties</h3>
      <input onChange={(e) => setAssignment({
            ...assignment, title: e.target.value })}
        value={assignment.title} type="text" />
      <button onClick={updateTitle} >
        Update Title to: {assignment.title}
      </button>
      <button onClick={fetchAssignment} >
        Fetch Assignment
      </button>
      <h4>Retrieving Objects</h4>
      <a className="btn btn-primary" href={`${API_BASE}/lab5/assignment`}>
        Get Assignment
      </a>
      <h4>Retrieving Properties</h4>
      <a
        className="btn btn-primary"
        href={`${API_BASE}/lab5/assignment/title`}
      >
        Get Title
      </a>
      <h4>Modifying Properties</h4>
      <a
        className="btn btn-primary"
        href={`${ASSIGNMENT_URL}/title/${assignment.title}`}
      >
        Update Title
      </a>
      <input
        type="text"
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
        value={assignment.title}
      />
      <h4>Retrieving Module</h4>
      <a className="btn btn-primary" href={`${API_BASE}/lab5/module`}>
        Get Module
      </a>
      <h4>Get Module Name</h4>
      <a
        className="btn btn-primary"
        href={`${API_BASE}/lab5/module/name`}
      >
        Get Module Name
      </a>
      <h4>Update Module Name</h4>
      <input
        type="text"
        value={module.name}
        onChange={(e) => setModule({ ...module, name: e.target.value })}
      />
      <a
        className="btn btn-primary"
        href={`${API_BASE}/lab5/module/name/${module.name}`}
      >
        Update Module Name
      </a>
      <h4>Update Assignment</h4>
      <input type="checkbox" checked={assignment.completed} onChange={(e) => setAssignment({...assignment, completed: (e.target.checked)})}/>
        <a
            className="btn btn-primary"
            href={`${API_BASE}/lab5/assignment/completed/${assignment.completed}`}
        >
            Update Assignment Status
        </a>
        <h4>Update Assignment Score</h4>
        <input
            type="number"
            value={assignment.score}
            onChange={(e) =>
                setAssignment({ ...assignment, score: parseInt(e.target.value) })
            }
        />
        <a
            className="btn btn-primary"
            href={`${API_BASE}/lab5/assignment/score/${assignment.score}`}
        >
            Update Assignment Score
        </a>
        <h4>Update Module Description</h4>
        <input
            type="text"
            value={module.description}
            onChange={(e) =>
                setModule({ ...module, description: e.target.value })
            }
        />
        <a
            className="btn btn-primary"
            href={`${API_BASE}/lab5/module/description/${module.description}`}
        >
            Update Module Description
        </a>
    </div>
  );
}
export default WorkingWithObjects;