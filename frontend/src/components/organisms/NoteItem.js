import { useContext } from "react";
import Icon from "../atoms/Icon";
import { MultiContext } from "../../App";
import Badge from "../atoms/Badge";

export default function NoteItem({ item, className = "" }) {
  const multiCtx = useContext(MultiContext);

  return (
    <div
      onClick={() => multiCtx.setCurrentNote(item)}
      className={
        className +
        " note-item" +
        (multiCtx.currentNote === item ? " active" : "")
      }>
      <div className="between mb-1">
        <div className="name">{item.name}</div>
        {item.pinned && <Icon name="pin-angle-fill" className="orange" />}
      </div>
      <div className="between">
        <div className="timestamp">
          <Icon name="pencil" className="me-1" />
          {item.lastModified}
        </div>
        <Badge text={item.folder} />
      </div>
    </div>
  );
}
