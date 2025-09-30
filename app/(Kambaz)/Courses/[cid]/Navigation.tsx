import Link from "next/link";
export default function CourseNavigation() {
    return (
        <div className="wd list-group fs-5 rounded-0">
            <Link href="/Courses/1234/Home"
            className="list-group-item active border-0">Home
            </Link><br />
            <Link href="/Courses/1234/Modules"
            className="list-group-item text-danger border-0">Modules
            </Link><br />
            <Link href="/Courses/1234/Piazza"
            className="list-group-item text-danger border-0">Piazza
            </Link><br />
            <Link href="/Courses/1234/Zoom"
            className="list-group-item text-danger border-0">Zoom
            </Link><br />
            <Link href="/Courses/1234/Assignments"
            className="list-group-item text-danger border-0">Assignments
            </Link><br />
            <Link href="/Courses/1234/Quizzes"
            className="list-group-item text-danger border-0">Quizzes
            </Link><br />
            <Link href="/Courses/1234/Grades"
            className="list-group-item text-danger border-0">Grades
            </Link><br />
            <Link href="/Courses/1234/People"
            className="list-group-item text-danger border-0">People
            </Link><br />
        </div>
    );
}
