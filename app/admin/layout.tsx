import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />

      <main
        className="
          w-full
          overflow-x-hidden
          px-3
          py-4
          sm:px-4
          md:ml-0
          md:px-8
          md:py-8
        "
      >
        {children}
      </main>
    </div>
  );
}
