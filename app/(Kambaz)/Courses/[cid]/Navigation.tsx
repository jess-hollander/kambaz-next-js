"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation() {
    const pathname = usePathname();
    
    const links = [
        { label: "Home", path: "/Courses/1234/Home" },
        { label: "Modules", path: "/Courses/1234/Modules" },
        { label: "Piazza", path: "/Courses/1234/Piazza" },
        { label: "Zoom", path: "/Courses/1234/Zoom" },
        { label: "Assignments", path: "/Courses/1234/Assignments" },
        { label: "Quizzes", path: "/Courses/1234/Quizzes" },
        { label: "Grades", path: "/Courses/1234/Grades" },
        { label: "People", path: "/Courses/1234/People/Table" },
    ];

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
                    const isActive =
                        pathname === "/Courses/1234" && link.label === "Home"
                            ? true
                            : pathname.startsWith(link.path);

                    return (
                        <Link
                            key={link.path}
                            href={link.path}
                            className={`list-group-item border-0 course-nav-link text-decoration-none ${
                                isActive ? "text-dark" : "text-danger"
                            }`}
                            style={{
                                backgroundColor: "transparent",
                            }}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>
        </>
    );
}
