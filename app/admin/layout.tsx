import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 md:flex">
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* CONTENT */}
      <main
        className="
          flex-1
          overflow-hidden
          px-3
          py-3

          sm:px-5
          sm:py-5

          lg:px-6
          lg:py-5
        "
      >
        {children}
      </main>
    </div>
  );
}
