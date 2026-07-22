import { redirect } from "next/navigation";

import DashboardHeader from "@/components/admin/DashboardHeader";
import DashboardRight from "@/components/admin/DashboardRight";
import DashboardStats from "@/components/admin/DashboardStats";
import LatestOrders from "@/components/admin/LatestOrders";

import { getAdminUser } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

const COMPLETED_STATUS = ["completed", "selesai"];
const PENDING_STATUS = "pending";
const PROCESSING_STATUS = "diproses";
const CANCELLED_STATUS = "cancelled";

export default async function AdminDashboard() {
  // ==========================
  // AUTH
  // ==========================

  const user = await getAdminUser();

  if (!user) {
    redirect("/login");
  }

  // ==========================
  // FETCH DATA
  // ==========================

  const [productsResult, ordersResult] = await Promise.all([
    supabaseAdmin
      .from("products")
      .select("id,name,price,image,stock,created_at")
      .order("created_at", { ascending: false }),

    supabaseAdmin
      .from("orders")
      .select(
        "id,customer_name,customer_phone,customer_address,note,total_price,status,created_at",
      )
      .order("created_at", { ascending: false }),
  ]);

  if (productsResult.error) {
    console.error("Products Error:", productsResult.error);
  }

  if (ordersResult.error) {
    console.error("Orders Error:", JSON.stringify(ordersResult.error, null, 2));
  }

  const products = productsResult.data ?? [];
  const orders = ordersResult.data ?? [];

  // ==========================
  // HELPERS
  // ==========================

  const countByStatus = (status: string) =>
    orders.filter((order) => order.status === status).length;

  const isCompleted = (status: string | null) =>
    status ? COMPLETED_STATUS.includes(status) : false;

  // ==========================
  // DASHBOARD DATA
  // ==========================

  const totalProducts = products.length;
  const totalOrders = orders.length;

  const pendingOrders = countByStatus(PENDING_STATUS);
  const processingOrders = countByStatus(PROCESSING_STATUS);
  const cancelledOrders = countByStatus(CANCELLED_STATUS);

  const completedOrders = orders.filter((order) =>
    isCompleted(order.status),
  ).length;

  const totalRevenue = orders
    .filter((order) => isCompleted(order.status))
    .reduce((sum, order) => sum + Number(order.total_price ?? 0), 0);

  const totalCustomers = new Set(
    orders.map((order) => order.customer_phone).filter(Boolean),
  ).size;

  const today = new Date().toISOString().split("T")[0];

  const todayOrders = orders.filter((order) =>
    order.created_at?.startsWith(today),
  );

  const todayRevenue = todayOrders
    .filter((order) => isCompleted(order.status))
    .reduce((sum, order) => sum + Number(order.total_price ?? 0), 0);

  const lowStockProducts = products.filter(
    (product) => Number(product.stock) <= 5,
  );

  // ==========================
  // PAGE
  // ==========================

  return (
    <main className="space-y-6">
      <DashboardHeader
        adminName={
          user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "Admin"
        }
      />

      <DashboardStats
        totalProducts={totalProducts}
        totalOrders={totalOrders}
        totalCustomers={totalCustomers}
        totalRevenue={totalRevenue}
        todayOrders={todayOrders.length}
        todayRevenue={todayRevenue}
        pendingOrders={pendingOrders}
        processingOrders={processingOrders}
        completedOrders={completedOrders}
        cancelledOrders={cancelledOrders}
      />

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <LatestOrders orders={orders.slice(0, 10)} />
        </div>

        <DashboardRight products={lowStockProducts} />
      </section>
    </main>
  );
}
