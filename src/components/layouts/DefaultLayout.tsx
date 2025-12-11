import type { ReactNode } from "react";

interface DefaultLayoutProps {
  children?: ReactNode;
  className?: string;
}

function DefaultLayout({ children, className = "" }: DefaultLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow w-[90%] py-8 mx-auto max-w-screen-lg">
        <div className={className}>{children}</div>
      </main>
    </div>
  );
}

export default DefaultLayout;