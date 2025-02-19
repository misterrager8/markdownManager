export default function Dropdown({
  text,
  icon,
  classNameBtn = "",
  classNameMenu = "",
  target,
  size = "sm",
  children,
}) {
  return (
    <>
      <a
        data-bs-target={"#" + target}
        className={
          classNameBtn + " btn dropdown-toggle" + (size ? ` btn-${size}` : "")
        }
        data-bs-toggle="dropdown">
        {icon && <i className={"me-1 bi bi-" + icon}></i>}
        {text}
      </a>
      <div id={target} className={classNameMenu + " dropdown-menu"}>
        {children}
      </div>
    </>
  );
}
