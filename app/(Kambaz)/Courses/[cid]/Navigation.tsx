"use client";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

export default function CourseNavigation() {
    const pathname = usePathname();
    const { cid } = useParams();
    
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                    .list-group .course-nav-link:hover {
                        text-decoration: underline !important;
                        border-bottom: 1px solid currentColor;
                    }
                `
            }} />
            <div className="list-group fs-5 rounded-0" style={{ minWidth: "200px" }}>
                {links.map((link) => {
                    const linkPath = `/Courses/${cid}/${link}`;
                    const isActive = pathname.includes(link);
                    return (
                        <Link 
                            key={link}
                            href={linkPath}
                            className={`list-group-item border-0 course-nav-link text-decoration-none ${
                                isActive ? "text-dark" : "text-danger"
                            }`}
                            style={{ 
                                backgroundColor: "transparent"
                            }}
                        >
                            {link}
                        </Link>
                    );
                })}
            </div>
        </>
    );
}
