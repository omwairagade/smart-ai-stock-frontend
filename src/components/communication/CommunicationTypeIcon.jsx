import { Phone, Mail, MessageCircle, Users, FileText } from "lucide-react";

var typeMap = {
  call: { Icon: Phone, color: "text-info bg-info/10" },
  email: { Icon: Mail, color: "text-primary bg-primary/10" },
  whatsapp: { Icon: MessageCircle, color: "text-success bg-success/10" },
  meeting: { Icon: Users, color: "text-secondary bg-secondary/10" },
  note: { Icon: FileText, color: "text-textMuted bg-surfaceLight" },
};

function CommunicationTypeIcon({ type }) {
  var entry = typeMap[type] || typeMap.note;
  var Icon = entry.Icon;
  return (
    <div className={"w-10 h-10 rounded-full flex items-center justify-center shrink-0 " + entry.color}>
      <Icon size={17} />
    </div>
  );
}

export default CommunicationTypeIcon;
