import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

type Props = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  description?: string;
  trend?: "up" | "down";
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "bg-sky-100 text-sky-700",
  description,
  trend,
}: Props) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">{value}</h2>

          {description && (
            <p className="mt-2 text-sm text-gray-500">{description}</p>
          )}

          {trend && (
            <div className="mt-3 flex items-center gap-1">
              {trend === "up" ? (
                <>
                  <TrendingUp size={16} className="text-green-600" />
                  <span className="text-sm font-medium text-green-600">
                    Meningkat
                  </span>
                </>
              ) : (
                <>
                  <TrendingDown size={16} className="text-red-600" />
                  <span className="text-sm font-medium text-red-600">
                    Menurun
                  </span>
                </>
              )}
            </div>
          )}
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl ${color}`}
        >
          <Icon size={28} />
        </div>
      </div>
    </div>
  );
}
