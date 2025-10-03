"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TOC() {
  const pathname = usePathname() ?? '';

  const active = (segment: string) => (pathname.includes(segment) ? 'active' : '');

  return (
    <ul className="nav nav-pills">
      <li className="nav-item">
        <Link href="/Labs" className={`nav-link ${pathname === '/Labs' ? 'active' : ''}`}>
          Labs
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/Labs/Lab1" className={`nav-link ${active('Lab1')}`}>
          Lab 1
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/Labs/Lab2" className={`nav-link ${active('Lab2')}`}>
          Lab 2
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/Labs/Lab3" className={`nav-link ${active('Lab3')}`}>
          Lab 3
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/Account/Signin" className="nav-link">
          Kambaz
        </Link>
      </li>
      <li className="nav-item">
        <a id="wd-github" href="https://github.com/jess-hollander" className="nav-link" target="_blank" rel="noopener noreferrer">
          My GitHub
        </a>
      </li>
    </ul>
  );
}



