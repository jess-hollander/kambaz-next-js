"use client";
import { ReactNode, useState, useEffect } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "../../store";

export default function CoursesLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { cid } = useParams();
  const router = useRouter();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const course = courses.find((course) => course._id === cid);
  const [showNavigation, setShowNavigation] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const isEnrolled = enrollments.some(
        (enrollment) =>
          enrollment.user === currentUser._id && enrollment.course === cid
      );
      if (!isEnrolled) {
        router.push("/Dashboard");
      }
    }
  }, [currentUser, enrollments, cid, router]);
  
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify 
          className="me-4 fs-4 mb-1 text-danger" 
          onClick={() => setShowNavigation(!showNavigation)}
          style={{ cursor: 'pointer' }}
        />
        {course?.name}
      </h2>
      <hr />
      <div className="d-flex">
        {showNavigation && (
          <div>
            <CourseNavigation />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
