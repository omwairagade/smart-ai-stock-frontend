function PriorityBadge({ priority }) {
  var colorClass = "bg-textMuted/10 text-textMuted";
  if (priority === "high") {
    colorClass = "bg-danger/10 text-danger";
  } else if (priority === "medium") {
    colorClass = "bg-warning/10 text-warning";
  } else if (priority === "low") {
    colorClass = "bg-info/10 text-info";
  }
  return (
    <span className={"px-2 py-1 rounded-full text-xs font-semibold capitalize whitespace-nowrap " + colorClass}>
      {priority}
    </span>
  );
}

export default PriorityBadge;
