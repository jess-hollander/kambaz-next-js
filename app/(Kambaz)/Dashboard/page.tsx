import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
            <div id="wd-dashboard-courses">
                <div className="wd-dashboard-course">
                    <Link href="/Courses/1234" className="wd-dashboard-course-link">
                        <Image src="/images/reactjs.jpg" width={200} height={115} alt = "React JS Course"/>
                        <div>
                            <h5> CS1234 React JS </h5>
                            <p className="wd-dashboard-course-title">
                                Full Stack software developer</p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/2" className="wd-dashboard-course-link">
                        <Image src="/images/reactjs.jpg" width={200} height={115} alt = "React JS Course"/>
                        <div>
                            <h5> CS2 React JS </h5>
                            <p className="wd-dashboard-course-title">
                                Full Stack software developer</p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/3" className="wd-dashboard-course-link">
                        <Image src="/images/reactjs.jpg" width={200} height={115} alt = "React JS Course"/>
                        <div>
                            <h5> CS3 React JS </h5>
                            <p className="wd-dashboard-course-title">
                                Full Stack software developer</p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/4" className="wd-dashboard-course-link">
                        <Image src="/images/reactjs.jpg" width={200} height={115} alt = "React JS Course"/>
                        <div>
                            <h5> CS4 React JS </h5>
                            <p className="wd-dashboard-course-title">
                                Full Stack software developer</p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/5" className="wd-dashboard-course-link">
                        <Image src="/images/reactjs.jpg" width={200} height={115} alt = "React JS Course"/>
                        <div>
                            <h5> CS5 React JS </h5>
                            <p className="wd-dashboard-course-title">
                                Full Stack software developer</p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/6" className="wd-dashboard-course-link">
                        <Image src="/images/reactjs.jpg" width={200} height={115} alt = "React JS Course"/>
                        <div>
                            <h5> CS6 React JS </h5>
                            <p className="wd-dashboard-course-title">
                                Full Stack software developer</p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/7" className="wd-dashboard-course-link">
                        <Image src="/images/reactjs.jpg" width={200} height={115} alt = "React JS Course"/>
                        <div>
                            <h5> CS7 React JS </h5>
                            <p className="wd-dashboard-course-title">
                                Full Stack software developer</p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
