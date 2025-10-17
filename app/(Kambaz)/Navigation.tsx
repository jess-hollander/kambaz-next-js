"use client";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function KambazNavigation() {
    const pathname = usePathname();

    const links = [
        { label: "Account", path: "/Account", icon: FaRegCircleUser, id: "wd-account-link" },
        { label: "Dashboard", path: "/Dashboard", icon: AiOutlineDashboard, id: "wd-dashboard-link" },
        { label: "Courses", path: "/Dashboard", icon: LiaBookSolid, id: "wd-course-link" },
        { label: "Calendar", path: "/Calendar", icon: IoCalendarOutline, id: "wd-calendar-link" },
        { label: "Inbox", path: "/Inbox", icon: FaInbox, id: "wd-inbox-link" },
        { label: "Labs", path: "/Labs/Lab1", icon: LiaCogSolid, id: "wd-labs-link" },
    ];

    return (
        <ListGroup
            className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
            style={{ width: 120 }}
        >
            <ListGroupItem
                className="bg-black border-0 text-center"
                as="a"
                target="_blank"
                href="https://www.northeastern.edu/"
            >
                <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
            </ListGroupItem>

            {links.map((link) => {
                let isActive;
                if (pathname === "/Dashboard") {
                    isActive = link.label === "Dashboard";
                } else {
                    isActive = pathname.startsWith(link.path) && link.path !== "/Dashboard";
                }

                const Icon = link.icon;

                // 👇 White normally for Account, red when active (same as others)
                const iconColorClass =
                    link.label === "Account"
                        ? isActive
                            ? "text-danger"
                            : "text-white"
                        : "text-danger";

                return (
                    <ListGroupItem
                        key={`${link.path}-${link.label}`}
                        className={`border-0 text-center p-0 ${
                            isActive ? "bg-white" : "bg-black"
                        }`}
                    >
                        <Link
                            href={link.path}
                            id={link.id}
                            className={`d-block text-decoration-none py-3 px-2 ${
                                isActive ? "text-danger" : "text-white"
                            }`}
                        >
                            <Icon className={`fs-4 ${iconColorClass}`} />
                            <br />
                            {link.label}
                        </Link>
                    </ListGroupItem>
                );
            })}
        </ListGroup>
    );
}
