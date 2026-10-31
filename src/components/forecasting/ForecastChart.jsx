import { ResponsiveContainer, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";

function ForecastChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--color-border))" />
        <XAxis dataKey="period" stroke="rgb(var(--color-textMuted))" fontSize={12} />
        <YAxis stroke="rgb(var(--color-textMuted))" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgb(var(--color-surface))",
            border: "1px solid rgb(var(--color-border))",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />
        <Legend wrapperStyle={{ fontSize: "12px" }} />
        <Line type="monotone" dataKey="actual" name="Actual" stroke="rgb(var(--color-primary))" strokeWidth={2.5} dot={{ r: 3 }} connectNulls />
        <Line type="monotone" dataKey="predicted" name="Predicted" stroke="rgb(var(--color-secondary))" strokeWidth={2.5} strokeDasharray="6 4" dot={{ r: 3 }} connectNulls />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default ForecastChart;
