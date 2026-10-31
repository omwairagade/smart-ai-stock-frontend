export default function POStatusBadge({ status }) {
  const config = {
    pending: { label: "Pending", color: "warning" },
    confirmed: { label: "Confirmed", color: "info" },
    shipped: { label: "Shipped", color: "secondary" },
    delivered: { label: "Delivered", color: "success" },
    cancelled: { label: "Cancelled", color: "danger" },
  };

  const item = config[status] || config.pending;
  const classes = "text-[10px] font-medium px-2 py-1 rounded-full bg-" + item.color + "/10 text-" + item.color;

  return <span className={classes}>{item.label}</span>;
}
