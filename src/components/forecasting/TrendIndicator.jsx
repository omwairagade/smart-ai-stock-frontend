import { TrendingUp, TrendingDown, Minus } from "lucide-react";

function TrendIndicator({ trend, percent }) {
  if (trend === "up") {
    return (
      <span className="inline-flex items-center gap-1 text-success text-xs font-semibold">
        <TrendingUp size={14} />+{percent}%
      </span>
    );
  }
  if (trend === "down") {
    return (
      <span className="inline-flex items-center gap-1 text-danger text-xs font-semibold">
        <TrendingDown size={14} />-{percent}%
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-textMuted text-xs font-semibold">
      <Minus size={14} />{percent}%
    </span>
  );
}

export default TrendIndicator;
