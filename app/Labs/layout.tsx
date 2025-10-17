import { ReactNode } from "react";
import TOC from "./TOC";

export default function LabsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div>
      <h1>Labs</h1>
      <div style={{ marginBottom: "1rem" }}>
        <TOC />
      </div>
      <div>{children}</div>
    </div>
  );
}

