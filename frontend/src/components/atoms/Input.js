export default function Input({
  value,
  onChange,
  placeholder,
  className = "",
  size = "sm",
  type_ = "text",
}) {
  return (
    <input
      type={type_}
      autoComplete="off"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={
        className + " form-control" + (size ? ` form-control-${size}` : "")
      }
    />
  );
}
