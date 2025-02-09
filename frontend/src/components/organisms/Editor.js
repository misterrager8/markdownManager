import { useContext, useEffect, useState } from "react";
import { MultiContext } from "../../App";
import Button from "../atoms/Button";

import markdownit from "markdown-it";
import Toolbar from "./Toolbar";

export default function Editor({ className }) {
  const multiCtx = useContext(MultiContext);

  const onChangeContent = (e) => multiCtx.setContent(e.target.value);
  const [saved, setSaved] = useState(false);

  const [selection, setSelection] = useState({
    start: 0,
    end: 0,
    selected: "",
  });

  const getSelection = () => {
    let elem = document.getElementById("editor");

    let start = elem.selectionStart;
    let end = elem.selectionEnd;
    let selected = multiCtx.content.substring(start, end);

    setSelection({ start: start, end: end, selected: selected });
  };

  useEffect(() => {
    multiCtx.setContent(
      multiCtx.currentNote.length !== 0 ? multiCtx.currentNote.content : ""
    );
    multiCtx.setSettings({
      ...multiCtx.settings,
      lastOpened:
        multiCtx.currentNote.length !== 0 ? { ...multiCtx.currentNote } : "",
    });
  }, [multiCtx.currentNote]);

  return (
    <div className={className}>
      {multiCtx.settings.mode !== "read" && (
        <Toolbar selection={selection} className="mb-3" />
      )}
      <div id="save-sm">
        <Button
          className="mb-1 w-100"
          onClick={() => {
            multiCtx.editNote(multiCtx.currentNote.path, multiCtx.content);
            setSaved(true);
            setTimeout(() => setSaved(false), 1500);
          }}
          // text={saved ? "Saved." : "Save"}
          icon={saved ? "check-lg" : "floppy2-fill"}
        />
      </div>
      <div className="row h-100 overflow-auto">
        {["split", "write"].includes(multiCtx.settings.mode) && (
          <div
            id="editor-parent"
            className={
              "px-3 border-end col-" +
              (multiCtx.settings.mode === "write" ? "12" : "6")
            }>
            <textarea
              onMouseUp={() => getSelection()}
              id="editor"
              className="form-control my-1 h-100"
              value={multiCtx.content}
              onChange={onChangeContent}
              placeholder="..."></textarea>
          </div>
        )}
        {["split", "read"].includes(multiCtx.settings.mode) && (
          <div
            className={
              "px-5 col-" + (multiCtx.settings.mode === "read" ? "12" : "6")
            }>
            <div
              id="reader"
              dangerouslySetInnerHTML={{
                __html: markdownit().render(multiCtx.content),
              }}></div>
          </div>
        )}
      </div>
    </div>
  );
}
