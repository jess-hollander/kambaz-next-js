import { useRouter } from 'next/router';
export default function AssignmentEditor() {
    const router = useRouter();
    const { aid } = router.query;

    const assignments: Record<number, string> = {
        123: "A1 - ENV + HTML",
        2: "A2 - CSS + BOOTSTRAP",
        3: "A3 - JAVASCRIPT + REACT"
    };

    const assignmentName = assignments[Number(aid)];

    
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label>
            <input id="wd-name" value={assignmentName} /><br /><br />
            <textarea id="wd-description">
                The assignment is available online Submit a link to the landing page of your web application running on Netlify.
            </textarea>
            <br />
            <table>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <input id="wd-points" value={100} />
                    </td>
                </tr>
            </table>
            <label htmlFor="wd-group">
                Assignment Group </label><br />
            <select id="wd-group">
                <option value="ASSIGNMENTS">Assignments</option>
                <option value="QUIZZES">Quizzes</option>
                <option selected value="EXAMS">Exams</option>
                <option value="PROJECT">Project</option>
            </select>
            <label htmlFor="wd-submission-type">
                Submission Type </label><br />
            <select id="wd-submission-type">
                <option value="ONLINE">Online</option><br />
                <label>Online Entry Options</label><br />

                <input type="checkbox" name="check-online" id="wd-chkbox-text-entry" />
                <label htmlFor="wd-chkbox-text-entry">Text Entry</label><br />

                <input type="checkbox" name="check-online" id="wd-chkbox-website-url" />
                <label htmlFor="wd-chkbox-website-url">Website URL</label><br />

                <input type="checkbox" name="check-online" id="wd-chkbox-media-recordings" />
                <label htmlFor="wd-chkbox-media-recordings">Media Recordings</label><br />

                <input type="checkbox" name="check-online" id="wd-chkbox-student-annotation" />
                <label htmlFor="wd-chkbox-student-annotation">Student Annotation</label><br />

                <input type="checkbox" name="check-online" id="wd-chkbox-file-uploads" />
                <label htmlFor="wd-chkbox-file-uploads">File Uploads</label>
            </select>
            <label htmlFor="wd-text-fields-assign-to">Assign to</label>
            <input type="text" id="wd-text-fields-assign-to" /> <br />
            <label htmlFor="wd-text-due-date">
                Due </label>
            <input type="date"
                id="wd-text-fields-date"
                value="2024-13-05" /><br />
            <label htmlFor="wd-text-available-from-date">
                Available from </label>
            <input type="date"
                id="wd-text-fields-available-from-date"
                value="2024-06-05" />
            <label htmlFor="wd-text-until-date">
                Until </label>
            <input type="date"
                id="wd-text-fields-until-date"
                value="2024-20-05" /><br />
            <hr></hr>
            <button id="wd-cancel-button"
                type="button"
                style={{ float: 'right' }}>
                Cancel
            </button>
            <button id="wd-save-button"
                type="button"
                style={{ float: 'right' }}>
                Save
            </button>
        </div>
    );
}
