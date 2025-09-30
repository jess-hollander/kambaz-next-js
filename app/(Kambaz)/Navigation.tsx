import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
export default function KambazNavigation() {
    return (
        <ListGroup className="rounded-0 position-fixed bottom-0 top-0
                         d-none d-md-block bg-black z-2" style={{ width: 120 }} >
            <ListGroupItem className="bg-black border-0 text-center" as="a"
                target="_blank" href="https://www.northeastern.edu/">
                <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
            </ListGroupItem>
            <ListGroupItem className="border-0 bg-black text-center">
                <Link href="/Account" id="wd-account-link" className="text-white text-decoration-none">
                    <FaRegCircleUser className="fs-1 text-white" /><br />

                    Account
                </Link>
                <Link href="/Dashboard" id="wd-dashboard-link" className="text-white text-decoration-none">
                    <AiOutlineDashboard className="fs-1 text-white" /><br />
                    Dashboard
                </Link><br />
                <Link href="/Dashboard" id="wd-course-link" className="text-white text-decoration-none">
                    <LiaBookSolid className="fs-1 text-white" /><br />
                    Courses
                </Link><br />
                <Link href="/Calendar" id="wd-calendar-link" className="text-white text-decoration-none">
                    <IoCalendarOutline className="fs-1 text-white" /><br />
                    Calendar
                </Link><br />
                <Link href="/Inbox" id="wd-inbox-link" className="text-white text-decoration-none">
                    <FaInbox className="fs-1 text-white" /><br />
                    Inbox
                </Link><br />
                <Link href="/Labs/Lab1" id="wd-labs-link" className="text-white text-decoration-none">
                    <LiaCogSolid className="fs-1 text-white" /><br />
                    Labs
                </Link><br />
            </ListGroupItem>
        </ListGroup>
    );
}


