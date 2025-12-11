import { SidebarTrigger } from "@/components/ui/sidebar";

import useUser from "@/hooks/useUser";
import AvatarUser from "./AvatarUser";

function AdminHeader() {
  const { user, logout, isSuperAdmin, isValidator } = useUser();

  // Cualquier rol con acceso al panel (ajusta la lógica si luego hay más)
  const userHasPanelAccess = isSuperAdmin || isValidator;

  return (
    <header className="h-16 px-4 bg-primary w-full text-primary-foreground flex items-center justify-between">
      <SidebarTrigger />

      <AvatarUser
        user={user}
        logout={logout}
        userIsAdminOrSales={userHasPanelAccess}
      />
    </header>
  );
}

export default AdminHeader;
