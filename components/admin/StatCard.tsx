"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: any;
  color: string;
  description?: string;
  trend?: "up" | "down";
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  description,
  trend,
}: StatCardProps) {
  return (
    <div
      className="
        rounded-2xl
        bg-white
        p-3
        shadow-sm
        sm:p-5
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div
          className={`
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            sm:h-11
            sm:w-11
            ${color}
          `}
        >
          <Icon size={20} className="sm:h-6 sm:w-6" />
        </div>

        {trend &&
          (trend === "up" ? (
            <TrendingUp size={16} className="text-green-600" />
          ) : (
            <TrendingDown size={16} className="text-red-600" />
          ))}
      </div>

      <div className="mt-3">
        <p
          className="
            text-xs
            text-gray-500
            sm:text-sm
          "
        >
          {title}
        </p>

        <h3
          className="
            mt-1
            text-lg
            font-bold
            text-gray-900
            sm:text-2xl
          "
        >
          {value}
        </h3>

        {description && (
          <p
            className="
              mt-1
              truncate
              text-xs
              text-gray-400
            "
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
