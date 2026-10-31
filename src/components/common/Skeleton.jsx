function Skeleton({ className }) {
  return <div className={"animate-pulse bg-surfaceLight rounded " + (className || "")}></div>;
}

export default Skeleton;
