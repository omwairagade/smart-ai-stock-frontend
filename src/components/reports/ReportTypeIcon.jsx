import { FileText, FileSpreadsheet } from "lucide-react";

function ReportTypeIcon({ type }) {
  if (type === "Excel") {
    return (
      <div className="w-10 h-10 rounded-lg bg-success/10 text-success flex items-center justify-center shrink-0">
        <FileSpreadsheet size={18} />
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-lg bg-danger/10 text-danger flex items-center justify-center shrink-0">
      <FileText size={18} />
    </div>
  );
}

export default ReportTypeIcon;
