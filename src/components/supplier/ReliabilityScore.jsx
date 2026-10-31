export default function ReliabilityScore({ score }) {
  let color = "success";
  if (score < 70) color = "danger";
  else if (score < 85) color = "warning";

  const barColor = "bg-" + color;
  const textColor = "text-" + color;

  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-surfaceLight rounded-full overflow-hidden">
        <div className={barColor + " h-full rounded-full"} style={{ width: score + "%" }}></div>
      </div>
      <span className={"text-xs font-semibold " + textColor}>{score}%</span>
    </div>
  );
}
