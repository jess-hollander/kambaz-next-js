import Link from "next/link";
import Image from "next/image";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from "react-bootstrap";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                <Col className="wd-dashboard-course">
                    <Card>
                        <Link className="wd-dashboard-course-link
                           text-decoration-none text-dark"
                            href="/Courses/1234">
                            <CardImg variant="top" width="100%"
                                src="/images/reactjs.jpg" height={160} />
                            <CardBody>
                                <CardTitle className="wd-dashboard-course-title
                                    text-nowrap overflow-hidden">
                                    CS1234 React JS</CardTitle>
                                <CardText className="wd-dashboard-course-description
                                    overflow-hidden" style={{ height: "100px" }}>
                                    Full Stack software developer</CardText>
                                <Button variant="primary">Go</Button>
                            </CardBody>
                        </Link>
                    </Card>
                </Col>

                <Col className="wd-dashboard-course">
                    <Card>
                        <Link className="wd-dashboard-course-link
                           text-decoration-none text-dark"
                            href="/Courses/2">
                            <CardImg variant="top" width="100%"
                                src="/images/reactjs.jpg" height={160} />
                            <CardBody>
                                <CardTitle className="wd-dashboard-course-title
                                    text-nowrap overflow-hidden">
                                    CS2 React JS</CardTitle>
                                <CardText className="wd-dashboard-course-description
                                    overflow-hidden" style={{ height: "100px" }}>
                                    Full Stack software developer</CardText>
                                <Button variant="primary">Go</Button>
                            </CardBody>
                        </Link>
                    </Card>
                </Col>
                <Col className="wd-dashboard-course">
                    <Card>
                        <Link className="wd-dashboard-course-link
                           text-decoration-none text-dark"
                            href="/Courses/3">
                            <CardImg variant="top" width="100%"
                                src="/images/reactjs.jpg" height={160} />
                            <CardBody>
                                <CardTitle className="wd-dashboard-course-title
                                    text-nowrap overflow-hidden">
                                    CS3 React JS</CardTitle>
                                <CardText className="wd-dashboard-course-description
                                    overflow-hidden" style={{ height: "100px" }}>
                                    Full Stack software developer</CardText>
                                <Button variant="primary">Go</Button>
                            </CardBody>
                        </Link>
                    </Card>
                </Col>
                <Col className="wd-dashboard-course">
                    <Card>
                        <Link className="wd-dashboard-course-link
                           text-decoration-none text-dark"
                            href="/Courses/4">
                            <CardImg variant="top" width="100%"
                                src="/images/reactjs.jpg" height={160} />
                            <CardBody>
                                <CardTitle className="wd-dashboard-course-title
                                    text-nowrap overflow-hidden">
                                    CS4 React JS</CardTitle>
                                <CardText className="wd-dashboard-course-description
                                    overflow-hidden" style={{ height: "100px" }}>
                                    Full Stack software developer</CardText>
                                <Button variant="primary">Go</Button>
                            </CardBody>
                        </Link>
                    </Card>
                </Col>
                <Col className="wd-dashboard-course">
                    <Card>
                        <Link className="wd-dashboard-course-link
                           text-decoration-none text-dark"
                            href="/Courses/5">
                            <CardImg variant="top" width="100%"
                                src="/images/reactjs.jpg" height={160} />
                            <CardBody>
                                <CardTitle className="wd-dashboard-course-title
                                    text-nowrap overflow-hidden">
                                    CS5 React JS</CardTitle>
                                <CardText className="wd-dashboard-course-description
                                    overflow-hidden" style={{ height: "100px" }}>
                                    Full Stack software developer</CardText>
                                <Button variant="primary">Go</Button>
                            </CardBody>
                        </Link>
                    </Card>
                </Col>
                <Col className="wd-dashboard-course">
                    <Card>
                        <Link className="wd-dashboard-course-link
                           text-decoration-none text-dark"
                            href="/Courses/6">
                            <CardImg variant="top" width="100%"
                                src="/images/reactjs.jpg" height={160} />
                            <CardBody>
                                <CardTitle className="wd-dashboard-course-title
                                    text-nowrap overflow-hidden">
                                    CS6 React JS</CardTitle>
                                <CardText className="wd-dashboard-course-description
                                    overflow-hidden" style={{ height: "100px" }}>
                                    Full Stack software developer</CardText>
                                <Button variant="primary">Go</Button>
                            </CardBody>
                        </Link>
                    </Card>
                </Col>
                <Col className="wd-dashboard-course">
                    <Card>
                        <Link className="wd-dashboard-course-link
                           text-decoration-none text-dark"
                            href="/Courses/7">
                            <CardImg variant="top" width="100%"
                                src="/images/reactjs.jpg" height={160} />
                            <CardBody>
                                <CardTitle className="wd-dashboard-course-title
                                    text-nowrap overflow-hidden">
                                    CS7 React JS</CardTitle>
                                <CardText className="wd-dashboard-course-description
                                    overflow-hidden" style={{ height: "100px" }}>
                                    Full Stack software developer</CardText>
                                <Button variant="primary">Go</Button>
                            </CardBody>
                        </Link>
                    </Card>
                </Col>
                </Row>
            </div>
        </div>
    );
}
