import CommunicationTypeIcon from "./CommunicationTypeIcon";
import { Clock, AlertCircle } from "lucide-react";

function formatDate(isoString) {
  var d = new Date(isoString);
  var options = { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" };
  return d.toLocaleString("en-IN", options);
}

function LogItem({ log, isLast }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <CommunicationTypeIcon type={log.type} />
        {!isLast && <div className="w-px flex-1 bg-border mt-2"></div>}
      </div>
      <div className={"flex-1 min-w-0 " + (isLast ? "" : "pb-6")}>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-textPrimary">{log.subject}</p>
            <p className="text-xs text-textMuted mt-0.5">
              {log.supplierName}
              {log.poId ? " · " + log.poId : ""}
            </p>
          </div>
          {log.followUpRequired && log.status === "pending" && (
            <span className="flex items-center gap-1 text-xs font-medium text-warning bg-warning/10 px-2 py-1 rounded-full whitespace-nowrap">
              <AlertCircle size={12} />
              Follow-up {log.followUpDate}
            </span>
          )}
        </div>
        <p className="text-sm text-textSecondary mt-2 leading-relaxed">{log.notes}</p>
        <div className="flex items-center gap-1.5 text-xs text-textMuted mt-2">
          <Clock size={12} />
          {formatDate(log.date)} · Logged by {log.loggedBy}
        </div>
      </div>
    </div>
  );
}

export default LogItem;
