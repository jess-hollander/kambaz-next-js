import Link from "next/link";

export default function TOC() {
  return (
    <nav aria-label="Labs table of contents" id="wd-toc">
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <li id="wd-intro"><Link href="/Labs">Labs Home</Link></li>
        <li id="wd-a1"><Link href="/Labs/Lab1">Lab 1</Link></li>
        <li id="wd-a2"><Link href="/Labs/Lab2">Lab 2</Link></li>
        <li id="wd-a3"><Link href="/Labs/Lab3">Lab 3</Link></li>
        <li id="wd-kambaz"><Link href="/Account/Signin">Kambaz</Link></li>
        <li id="wd-github"><a href="https://github.com/jess-hollander" target="_blank" rel="noreferrer">My GitHub</a></li>
      </ul>
    </nav>
  );
}



