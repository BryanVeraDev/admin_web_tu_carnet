function DefaultLayout({ children, className = "" }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow w-[90%] py-8 mx-auto max-w-screen-lg">
        <div className={className}>{children}</div>
      </main>
    </div>
  );
}

export default DefaultLayout;