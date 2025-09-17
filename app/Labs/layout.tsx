import { ReactNode } from "react";
import TOC from "./TOC";

export default function LabsLayout({ children }:
    Readonly<{ children: ReactNode }>) {
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td valign="top" width="100px">
                            <TOC />
                        </td>
                        <td valign="top">{children}</td>
                    </tr>
                </tbody>
            </table>
            <h1>Labs</h1>
        </div>
    );
}
