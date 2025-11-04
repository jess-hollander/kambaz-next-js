import ReduxProvider from "./ReduxProvider";

export default function Lab4Layout({ children }: { children: React.ReactNode }) {
  // The ReduxProvider is a client component, so this makes all children
  // under /Labs/Lab4/ run with Redux context on the client.
  return <ReduxProvider>{children}</ReduxProvider>;
}
