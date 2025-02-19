export default function Button({
  text,
  onClick,
  type_ = "button",
  size = "sm",
  className = "",
  icon,
  border = true,
  active = false,
}) {
  return (
    <button
      onClick={onClick}
      type={type_}
      className={
        className +
        " btn" +
        (size ? ` btn-${size}` : "") +
        (active ? " active" : "") +
        (border ? "" : " border-0")
      }>
      {icon && <i className={(text ? "me-1" : "") + (" bi bi-" + icon)}></i>}
      {text}
    </button>
  );
}
