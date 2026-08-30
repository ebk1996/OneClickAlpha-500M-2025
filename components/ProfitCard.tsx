interface Props { title: string; value: string; color: string; }

export function ProfitCard({ title, value, color }: Props) {
  return (
    <div className="p-6 bg-gray-900 rounded-xl">
      <h3 className="text-sm text-gray-400">{title}</h3>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}