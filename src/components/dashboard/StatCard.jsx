export default function StatCard({ label, value, change, trend, icon: Icon, color }) {
  const trendColor = trend === "up" ? "text-success" : "text-danger";
  const trendIcon = trend === "up" ? "↗" : "↘";
  const iconBg = "bg-" + color + "/10";
  const iconColor = "text-" + color;
  const barColor = "bg-" + color + "/30";

  return (
    <div className="bg-surface border border-border rounded-2xl p-5 hover:border-primary/30 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs text-textMuted">{label}</p>
        <div className={"w-8 h-8 rounded-lg flex items-center justify-center " + iconBg}>
          <Icon className={"w-4 h-4 " + iconColor} />
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-1 text-textPrimary">{value}</h3>
      <p className={"text-xs flex items-center gap-1 " + trendColor}>
        {trendIcon} {change}
      </p>
      <div className="flex gap-1 mt-3 h-6 items-end">
        {[40, 60, 45, 70, 55, 80, 65].map((h, i) => (
          <div key={i} className={"flex-1 rounded-sm " + barColor} style={{ height: h + "%" }}></div>
        ))}
      </div>
    </div>
  );
}
