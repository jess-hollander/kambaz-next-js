import Link from "next/link";
export default function Assignments() {
    return (
        <div id="wd-assignments">
            <input placeholder="Search for Assignments"
                id="wd-search-assignment" />
            <button id="wd-add-assignment-group">+ Group</button>
            <button id="wd-add-assignment">+ Assignment</button>
            <h3 id="wd-assignments-title">
                ASSIGNMENTS 40% of Total <button>+</button> </h3>
            <ul id="wd-assignment-list">
                <li className="wd-assignment-list-item">
                    <Link href="/Courses/1234/Assignments/123"
                        className="wd-assignment-link" >
                        A1 - ENV + HTML
                    </Link>
                    <p>Multiple Modules | <strong>Not Available until</strong> Monday May 6 at 12:00 am |</p>
                    <p><strong>Due</strong> May 13 at 11:59 pm | 100 pts</p>
                </li>
                <li className="wd-assignment-list-item">
                    <Link href="/Courses/1234/Assignments/2"
                        className="wd-assignment-link" >
                        A2 - CSS + BOOTSTRAP
                    </Link>
                    <p>Multiple Modules | <strong>Not Available until</strong> Monday May 13 at 12:00 am |</p>
                    <p><strong>Due</strong> May 20 at 11:59 pm | 100 pts</p>
                </li>
                <li className="wd-assignment-list-item">
                    <Link href="/Courses/1234/Assignments/3"
                        className="wd-assignment-link" >
                        A3 - JAVASCRIPT + REACT
                    </Link>
                    <p>Multiple Modules | <strong>Not Available until</strong> Monday May 20 at 12:00 am |</p>
                    <p><strong>Due</strong> May 27 at 11:59 pm | 100 pts</p>
                </li>
            </ul>

            <h3 id="wd-assignments-title">
                EXAMS 20% of Total <button>+</button> </h3>

            <h3 id="wd-assignments-title">
                QUIZZES 10% of Total <button>+</button> </h3>

            <h3 id="wd-assignments-title">
                PROJECTS 30% of Total <button>+</button> </h3>
        </div>
    );
}
