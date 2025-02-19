import { useContext, useEffect, useState } from "react";
import { MultiContext } from "../../App";
import markdownit from "markdown-it";
import Input from "../atoms/Input";
import { formats, modes } from "../../util";
import Button from "../atoms/Button";
import ButtonGroup from "../molecules/ButtonGroup";
import InputGroup from "../molecules/InputGroup";

export default function Editor({ className = "" }) {
  const multiCtx = useContext(MultiContext);
  const [mode, setMode] = useState(
    localStorage.getItem("notable-mode") || "split"
  );
  const [deleting, setDeleting] = useState(false);
  const [saved, setSaved] = useState(false);

  const [content, setContent] = useState("");
  const onChangeContent = (e) => setContent(e.target.value);

  const [name, setName] = useState("");
  const onChangeName = (e) => setName(e.target.value);

  useEffect(() => {
    if (multiCtx.currentNote) {
      setName(multiCtx.currentNote?.name);
      setContent(multiCtx.currentNote?.content);
    }
  }, [multiCtx.currentNote]);

  useEffect(() => {
    localStorage.setItem("notable-mode", mode);
  }, [mode]);

  return (
    <div className={className + " h-custom"}>
      <div className="d-flex mb-3">
        <InputGroup>
          {modes.map((x) => (
            <Button
              onClick={() => setMode(x.value)}
              active={x.value === mode}
              icon={x.icon}
            />
          ))}
          <Input
            size={null}
            value={name}
            onChange={onChangeName}
            className="name"
          />
        </InputGroup>
        <div className="between w-50">
          <div></div>
          <ButtonGroup className="">
            <Button text="Pin" className="orange" icon="pin-angle" />
            <Button text="Copy" className="" icon="copy" />
            {deleting && <Button className="red" icon="question-lg" />}
            <Button
              text="Delete"
              onClick={() => setDeleting(!deleting)}
              className="red"
              icon="trash2"
            />
          </ButtonGroup>
        </div>
      </div>
      {["split", "write"].includes(mode) ? (
        <div className="toolbar mb-3">
          {["split", "write"].includes(mode) && (
            <Button
              className="green me-2"
              icon={saved ? "check-lg" : "floppy2"}
            />
          )}
          {formats.map((x) => (
            <Button border={false} className="m-hlf" icon={x.icon} />
          ))}
        </div>
      ) : (
        <div>&nbsp;</div>
      )}
      <div className="d-flex h-100">
        <div
          className={
            "left" + (["split", "write"].includes(mode) ? " col" : " d-none")
          }>
          <textarea
            style={{ resize: "none" }}
            value={content}
            onChange={onChangeContent}
            className="form-control h-100"></textarea>
        </div>
        <div
          className={
            "overflow-auto right" +
            (["split", "read"].includes(mode) ? " col" : " d-none")
          }
          dangerouslySetInnerHTML={{
            __html: markdownit().render(content),
          }}></div>
      </div>
    </div>
  );
}
