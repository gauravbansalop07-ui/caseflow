import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppHeader } from "@/components/layout/header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { CommandSearch } from "@/components/search/command-search";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 pb-20 md:pb-8">
          {children}
        </main>
      </SidebarInset>
      <MobileNav />
      <CommandSearch />
    </SidebarProvider>
  );
}
