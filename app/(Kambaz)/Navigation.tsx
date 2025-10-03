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
                <Link href="/Account" id="wd-account-link"
                    className="list-group-item text-center border-0 bg-black text-white">
                    <FaRegCircleUser className="fs-3 text-white" />
                    <br />Account
                </Link>
                <Link href="/Dashboard" id="wd-dashboard-link"
                    className="list-group-item text-center border-0 bg-white text-danger">
                    <AiOutlineDashboard className="fs-3 text-danger" />
                    <br />Dashboard
                </Link>
                <Link href="/Dashboard" id="wd-course-link"
                    className="list-group-item text-center border-0 bg-black text-white">
                    <LiaBookSolid className="fs-3 text-danger" />
                    <br />Courses
                </Link>
                <Link href="/Calendar" id="wd-calendar-link"
                    className="list-group-item text-center border-0 bg-black text-white">
                    <IoCalendarOutline className="fs-3 text-danger" />
                    <br />Calendar
                </Link>
                <Link href="/Inbox" id="wd-inbox-link"
                    className="list-group-item text-center border-0 bg-black text-white">
                    <FaInbox className="fs-3 text-danger" />
                    <br />Inbox
                </Link>
                <Link href="/Labs/Lab1" id="wd-labs-link"
                    className="list-group-item text-center border-0 bg-black text-white">
                    <LiaCogSolid className="fs-3 text-danger" /><br />
                    Labs
                </Link><br />
            </ListGroupItem>
        </ListGroup>
    );
}



