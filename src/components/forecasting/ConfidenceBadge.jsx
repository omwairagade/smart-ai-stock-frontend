function ConfidenceBadge({ value }) {
  var colorClass = "bg-success/10 text-success";
  if (value < 75) {
    colorClass = "bg-danger/10 text-danger";
  } else if (value < 88) {
    colorClass = "bg-warning/10 text-warning";
  }
  return (
    <span className={"px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap " + colorClass}>
      {value}% confidence
    </span>
  );
}

export default ConfidenceBadge;
