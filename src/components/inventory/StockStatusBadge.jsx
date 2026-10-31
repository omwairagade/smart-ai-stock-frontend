export default function StockStatusBadge({ status }) {
  const config = {
    healthy: { label: "Healthy", color: "success" },
    low: { label: "Low Stock", color: "warning" },
    out: { label: "Out of Stock", color: "danger" },
  };

  const item = config[status] || config.healthy;
  const classes = "text-[10px] font-medium px-2 py-1 rounded-full bg-" + item.color + "/10 text-" + item.color;

  return <span className={classes}>{item.label}</span>;
}
