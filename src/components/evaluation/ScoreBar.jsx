function ScoreBar({ label, value }) {
  var colorClass = "bg-success";
  if (value < 70) {
    colorClass = "bg-danger";
  } else if (value < 85) {
    colorClass = "bg-warning";
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-textSecondary">{label}</span>
        <span className="text-xs font-semibold text-textPrimary">{value}</span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-surfaceLight overflow-hidden">
        <div className={"h-full rounded-full " + colorClass} style={{ width: value + "%" }}></div>
      </div>
    </div>
  );
}

export default ScoreBar;
