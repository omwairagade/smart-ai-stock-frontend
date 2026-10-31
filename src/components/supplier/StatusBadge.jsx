export default function StatusBadge({ status }) {
  const config = {
    active: { label: "Active", color: "success" },
    "at-risk": { label: "At Risk", color: "warning" },
    inactive: { label: "Inactive", color: "danger" },
  };

  const item = config[status] || config.active;
  const classes = "text-[10px] font-medium px-2 py-1 rounded-full bg-" + item.color + "/10 text-" + item.color;

  return <span className={classes}>{item.label}</span>;
}
