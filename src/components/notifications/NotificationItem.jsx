import NotificationIcon from "./NotificationIcon";

function NotificationItem({ notification, compact, onClick }) {
  var n = notification;
  var messageClass = compact ? "text-xs text-textSecondary truncate" : "text-sm text-textSecondary";

  return (
    <div
      onClick={onClick}
      className={"flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-surfaceLight border-b border-border last:border-0 " + (n.read ? "" : "bg-primary/5")}
    >
      <NotificationIcon type={n.type} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className={"text-sm font-medium truncate " + (n.read ? "text-textSecondary" : "text-textPrimary")}>
            {n.title}
          </p>
          {!n.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>}
        </div>
        <p className={messageClass}>{n.message}</p>
        <p className="text-xs text-textMuted mt-1">{n.time}</p>
      </div>
    </div>
  );
}

export default NotificationItem;
