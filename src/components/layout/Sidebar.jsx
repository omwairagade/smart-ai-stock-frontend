import { NavLink } from 'react-router-dom';
import {
  LayoutGrid,
  Users,
  Package,
  ShoppingCart,
  Cpu,
  Star,
  RefreshCw,
  FileText,
  Bell,
  BarChart3,
  Settings,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

function Sidebar({ open, collapsed, setCollapsed }) {
  const { unreadCount } = useNotifications();
  var widthClass = 'w-64 ' + (collapsed ? 'md:w-20' : 'md:w-64');
  var translateClass = open ? 'translate-x-0' : '-translate-x-full';
  var labelHide = collapsed ? ' md:hidden' : '';
  var centerIcon = collapsed ? ' md:justify-center' : '';

  function linkClass(isActive) {
    var base = 'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors' + centerIcon + ' ';
    if (isActive) {
      return base + 'bg-primary/10 text-primary';
    }
    return base + 'text-textSecondary hover:bg-surfaceLight hover:text-textPrimary';
  }

  var modules = [
    { to: '/suppliers', label: 'Suppliers', icon: Users },
    { to: '/communication-log', label: 'Communication Log', icon: MessageSquare },
    { to: '/inventory', label: 'Inventory', icon: Package },
    { to: '/purchases', label: 'Purchases', icon: ShoppingCart },
    { to: '/forecasting', label: 'AI Forecasting', icon: Cpu },
    { to: '/evaluation', label: 'Evaluation', icon: Star },
    { to: '/reorder', label: 'Smart Reorder', icon: RefreshCw },
  ];

  var insights = [
    { to: '/reports', label: 'Reports', icon: FileText, badge: null },
    { to: '/notifications', label: 'Notifications', icon: Bell, badge: unreadCount > 0 ? unreadCount : null },
    { to: '/settings', label: 'Settings', icon: Settings, badge: null },
  ];

  return (
    <aside
      className={
        'fixed inset-y-0 left-0 z-40 flex flex-col bg-surface border-r border-border transition-all duration-200 transform md:translate-x-0 ' +
        widthClass +
        ' ' +
        translateClass
      }
    >
      <div className="flex items-center justify-between gap-2 px-4 py-5 border-b border-border">
        <div className={'flex items-center gap-2 overflow-hidden' + centerIcon}>
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary shrink-0">
            <BarChart3 size={20} />
          </div>
          <div className={'min-w-0' + labelHide}>
            <p className="text-sm font-bold text-textPrimary tracking-wide truncate">STOCKSYNC AI</p>
            <p className="text-xs text-textMuted truncate">Supply Coordination</p>
          </div>
        </div>
        <button
          onClick={function () { setCollapsed(!collapsed); }}
          className="hidden md:flex items-center justify-center w-6 h-6 rounded-md border border-border text-textMuted hover:text-textPrimary hover:bg-surfaceLight shrink-0"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>

      <div className="px-4 pt-4">
        <div className={'flex items-center gap-2 px-3 py-2.5 rounded-lg bg-surfaceLight' + centerIcon}>
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-white text-xs font-bold shrink-0">
            TE
          </div>
          <div className={'min-w-0' + labelHide}>
            <p className="text-sm font-semibold text-textPrimary truncate">Tejas Enterprises</p>
            <p className="text-xs text-textMuted truncate">Operations workspace</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div>
          <p className={'px-3 mb-2 text-xs font-semibold text-textMuted uppercase tracking-wider' + labelHide}>
            Workspace
          </p>
          <NavLink to="/" end className={function (a) { return linkClass(a.isActive); }} title={collapsed ? 'Overview' : undefined}>
            <LayoutGrid size={18} className="shrink-0" />
            <span className={labelHide}>Overview</span>
          </NavLink>
        </div>

        <div>
          <p className={'px-3 mb-2 text-xs font-semibold text-textMuted uppercase tracking-wider' + labelHide}>
            Modules
          </p>
          <div className="space-y-1">
            {modules.map(function (item) {
              var Icon = item.icon;
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={function (a) { return linkClass(a.isActive); }}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon size={18} className="shrink-0" />
                  <span className={labelHide}>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        <div>
          <p className={'px-3 mb-2 text-xs font-semibold text-textMuted uppercase tracking-wider' + labelHide}>
            Insights
          </p>
          <div className="space-y-1">
            {insights.map(function (item) {
              var Icon = item.icon;
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={function (a) { return linkClass(a.isActive); }}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon size={18} className="shrink-0" />
                  <span className={'flex-1' + labelHide}>{item.label}</span>
                  {item.badge ? (
                    <span className={'flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-danger text-white text-[10px] font-bold' + labelHide}>
                      {item.badge}
                    </span>
                  ) : null}
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>

      <div className={'px-4 py-4 border-t border-border flex items-center gap-2' + centerIcon}>
        <span className="w-2 h-2 rounded-full bg-success animate-pulse shrink-0"></span>
        <span className={'text-xs text-textSecondary truncate' + labelHide}>AI engine active</span>
      </div>
    </aside>
  );
}

export default Sidebar;
