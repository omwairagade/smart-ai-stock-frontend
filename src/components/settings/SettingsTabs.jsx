function SettingsTabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 overflow-x-auto border-b border-border -mx-4 px-4 md:mx-0 md:px-0">
      {tabs.map(function (tab) {
        var isActive = active === tab.key;
        return (
          <button
            key={tab.key}
            onClick={function () { onChange(tab.key); }}
            className={"flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors " + (isActive ? "border-primary text-primary" : "border-transparent text-textSecondary hover:text-textPrimary")}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default SettingsTabs;
