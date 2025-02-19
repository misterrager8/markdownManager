import Button from "../atoms/Button";
import { useContext, useEffect, useState } from "react";
import Search from "./Search";
import NoteItem from "./NoteItem";
import { MultiContext } from "../../App";

export default function Nav({ className = "" }) {
  const multiCtx = useContext(MultiContext);

  const [theme, setTheme] = useState(
    localStorage.getItem("notable-theme") || "light"
  );

  useEffect(() => {
    localStorage.setItem("notable-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className={className}>
      <div className="between mb-4">
        <div>
          <Button className="me-1" border={false} icon="circle" />
          <Button className="green" text="New" icon="plus-lg" />
        </div>
        <Button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          icon={theme === "light" ? "sun-fill" : "moon-fill"}
        />
      </div>
      <Search className="mb-4" />
      <div>
        {multiCtx.notes.map((x) => (
          <NoteItem item={x} />
        ))}
      </div>
    </div>
  );
}
