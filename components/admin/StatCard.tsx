"use client";

import { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  value: string | number;
  desc: string;
  icon: LucideIcon;
  color: string;
};

export default function StatCard({
  title,
  value,
  desc,
  icon: Icon,
  color,
}: Props) {
  const colors: any = {
    blue: "bg-blue-50 text-blue-700",

    indigo: "bg-indigo-50 text-indigo-700",

    purple: "bg-purple-50 text-purple-700",

    green: "bg-green-50 text-green-700",

    cyan: "bg-cyan-50 text-cyan-700",

    yellow: "bg-yellow-50 text-yellow-700",

    orange: "bg-orange-50 text-orange-700",

    emerald: "bg-emerald-50 text-emerald-700",

    red: "bg-red-50 text-red-700",
  };

  return (
    <div
      className="
rounded-2xl
border
bg-white
p-3

shadow-sm

transition
hover:shadow-md

md:p-4
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

${colors[color]}
`}
        >
          <Icon size={19} />
        </div>
      </div>

      <p
        className="
mt-3
text-xs
font-medium
text-gray-500
"
      >
        {title}
      </p>

      <h2
        className="
mt-1

text-lg
font-bold
text-gray-800

md:text-xl
"
      >
        {value}
      </h2>

      <p
        className="
mt-1
text-[11px]
text-gray-400
"
      >
        {desc}
      </p>
    </div>
  );
}
