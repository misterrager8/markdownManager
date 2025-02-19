export default function Icon({ name, className = "" }) {
  return <i className={className + " bi bi-" + name}></i>;
}
