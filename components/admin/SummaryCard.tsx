import { ReactNode } from "react";

type Props = {
  title: string;
  value: string | number;
  icon: ReactNode;
};

export default function SummaryCard({ title, value, icon }: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h3 className="mt-2 text-3xl font-bold text-sky-700">{value}</h3>
        </div>

        <div className="rounded-xl bg-sky-100 p-4 text-sky-700">{icon}</div>
      </div>
    </div>
  );
}
