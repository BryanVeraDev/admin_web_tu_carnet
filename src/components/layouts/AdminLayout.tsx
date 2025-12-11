import { Navigate, Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";

import AdminSidebar from "../sidebar"; // <- tu nuevo sidebar
import useUser from "@/hooks/useUser";
import NotAuthPage from "@/pages/NoAuth";
import AdminHeader from "../AdminHeader"; // asumiendo que ya existe

interface DefaultLayoutProps {
  className?: string;
}

function DefaultLayout({ className = "" }: DefaultLayoutProps) {
  const { isAuthenticated, isSuperAdmin, isValidator } = useUser();

  // 1. No autenticado → fuera
  if (!isAuthenticated) {
    //return <NotAuthPage />;
    // o, si prefieres:
    return <Navigate to="/login" replace />;
  }

  // 2. Usuario autenticado pero sin rol permitido → fuera
  if (!isSuperAdmin && !isValidator) {
    return <NotAuthPage />;
  }

  // 3. Layout principal
  return (
    <SidebarProvider>
      <AdminSidebar />
      <div className="w-full flex flex-col min-h-screen">
        <AdminHeader />
        <main className={`p-4 md:p-8 ${className}`}>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}

export default DefaultLayout;