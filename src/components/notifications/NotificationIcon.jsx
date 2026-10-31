import { ShoppingCart, AlertTriangle, Users, Sparkles, Bell } from "lucide-react";

var iconMap = {
  order: { Icon: ShoppingCart, color: "text-info bg-info/10" },
  stock: { Icon: AlertTriangle, color: "text-warning bg-warning/10" },
  supplier: { Icon: Users, color: "text-secondary bg-secondary/10" },
  ai: { Icon: Sparkles, color: "text-primary bg-primary/10" },
  system: { Icon: Bell, color: "text-textMuted bg-surfaceLight" },
};

function NotificationIcon({ type }) {
  var entry = iconMap[type] || iconMap.system;
  var Icon = entry.Icon;
  return (
    <div className={"w-9 h-9 rounded-lg flex items-center justify-center shrink-0 " + entry.color}>
      <Icon size={16} />
    </div>
  );
}

export default NotificationIcon;
