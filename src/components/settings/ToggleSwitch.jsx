function ToggleSwitch({ enabled, onChange }) {
  return (
    <button
      onClick={onChange}
      className={"relative inline-flex items-center h-6 w-11 rounded-full transition-colors shrink-0 " + (enabled ? "bg-primary" : "bg-border")}
    >
      <span
        className={"inline-block w-4 h-4 transform rounded-full bg-white transition-transform " + (enabled ? "translate-x-6" : "translate-x-1")}
      ></span>
    </button>
  );
}

export default ToggleSwitch;
