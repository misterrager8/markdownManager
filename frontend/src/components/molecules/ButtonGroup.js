export default function ButtonGroup({ children, className = "" }) {
  return <div className={className + " btn-group"}>{children}</div>;
}
