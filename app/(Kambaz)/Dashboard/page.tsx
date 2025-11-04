"use client"
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, FormControl } from "react-bootstrap";
import { RootState } from "../store";
import { addNewCourse, deleteCourse, updateCourse } from "./Courses/reducer";
import { enroll, unenroll } from "./enrollmentReducer";

interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description: string;
  author?: string;
  image?: string;
}

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const [course, setCourse] = useState<Course>({
    _id: "0", 
    name: "New Course", 
    number: "New Number",
    startDate: "2023-09-10", 
    endDate: "2023-12-15",
    department: "D123",
    credits: 4,
    description: "New Description",
    image: "/images/reactjs.jpg"
  });
  const [showAllCourses, setShowAllCourses] = useState(false);
  const dispatch = useDispatch();

  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment: Enrollment) =>
        enrollment.user === currentUser?._id && enrollment.course === courseId
    );
  };

  const handleEnroll = (courseId: string) => {
    if (currentUser) {
      dispatch(enroll({ userId: currentUser._id, courseId }));
    }
  };

  const handleUnenroll = (courseId: string) => {
    if (currentUser) {
      dispatch(unenroll({ userId: currentUser._id, courseId }));
    }
  };

  const isFaculty = currentUser?.role === "FACULTY";
  
  const displayedCourses = showAllCourses
    ? courses
    : courses.filter((course) => isEnrolled(course._id));
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {isFaculty && (
        <>
          <h5>New Course
            <button className="btn btn-primary float-end"
                    id="wd-add-new-course-click"
                    onClick={() => dispatch(addNewCourse(course))} > Add </button>
            <button className="btn btn-warning float-end me-2"
                    onClick={() => dispatch(updateCourse(course))} id="wd-update-course-click">
              Update
            </button>
          </h5><hr />
          <FormControl value={course.name} className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          <FormControl as="textarea" value={course.description} rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })} />
          <hr />
        </>
      )}
      <h2 id="wd-dashboard-published">
        Published Courses ({displayedCourses.length})
        <button 
          className="btn btn-primary float-end"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          Enrollments
        </button>
      </h2> 
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((course) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link href={`/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <CardImg src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                </Link>
                <CardBody className="card-body">
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    {course.name} </CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    {course.description} </CardText>
                  <div className="d-flex gap-2 flex-wrap">
                    <Link href={`/Courses/${course._id}/Home`}>
                      <Button variant="primary" size="sm"> Go </Button>
                    </Link>
                    {isFaculty && (
                      <>
                        <button id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }} className="btn btn-warning btn-sm">
                          Edit
                        </button>
                        <button onClick={(event) => {
                          event.preventDefault();
                          dispatch(deleteCourse(course._id));
                        }} className="btn btn-danger btn-sm"
                        id="wd-delete-course-click">
                          Delete
                        </button>
                      </>
                    )}
                    {!isFaculty && (
                      <>
                        {isEnrolled(course._id) ? (
                          <button 
                            onClick={() => handleUnenroll(course._id)}
                            className="btn btn-danger btn-sm"
                          >
                            Unenroll
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleEnroll(course._id)}
                            className="btn btn-success btn-sm"
                          >
                            Enroll
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>);
}
