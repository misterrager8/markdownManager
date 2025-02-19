export default function InputGroup({ children, className = "" }) {
  return <div className={className + " input-group"}>{children}</div>;
}
