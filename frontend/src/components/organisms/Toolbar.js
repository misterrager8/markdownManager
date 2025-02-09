import { useContext, useState } from "react";
import { MultiContext } from "../../App";
import ButtonGroup from "../molecules/ButtonGroup";
import Button from "../atoms/Button";
import Dropdown from "../molecules/Dropdown";
import Input from "../atoms/Input";
import { api } from "../../util";

export default function Toolbar({ selection, className }) {
  const multiCtx = useContext(MultiContext);
  const [url, setUrl] = useState("");
  const [showURL, setShowURL] = useState(false);

  const onChangeURL = (e) => setUrl(e.target.value);

  const savePage = (e) => {
    e.preventDefault();
    api("save_page", { path: multiCtx.currentNote.path, url: url }, (data) =>
      multiCtx.setCurrentNote(data)
    );
  };

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formats = [
    {
      label: "bold",
      format: `**${selection.selected}**`,
    },
    {
      label: "italic",
      format: `*${selection.selected}*`,
    },
    {
      label: "heading",
      format: `### ${selection.selected}`,
    },
    {
      label: "hrule",
      format: "\n---\n",
    },
    {
      label: "num-list",
      format: `1. ${selection.selected.split("\n").join("\n1. ")}`,
    },
    {
      label: "sort",
      format: `${selection.selected.split("\n").toSorted().join("\n")}`,
    },
    {
      label: "sort-reverse",
      format: `${selection.selected
        .split("\n")
        .toSorted()
        .reverse()
        .join("\n")}`,
    },
    {
      label: "bullet-list",
      format: `- ${selection.selected.split("\n").join("\n- ")}`,
    },
    {
      label: "checklist",
      format: `- **[​　]** ${selection.selected
        .split("\n")
        .join("\n- **[​　]** ")}`,
    },
    {
      label: "check",
      format: `✓`,
    },
    {
      label: "code",
      format: `\`\`\`${selection.selected}\`\`\``,
    },
    {
      label: "image",
      format: `![${selection.selected}]()`,
    },
    {
      label: "link",
      format: `[${selection.selected}]()`,
    },
    {
      label: "capitalize",
      format: `${
        selection.selected.charAt(0).toUpperCase() + selection.selected.slice(1)
      }`,
    },
    {
      label: "allcaps",
      format: `${selection.selected.toUpperCase()}`,
    },
    {
      label: "alllower",
      format: `${selection.selected.toLowerCase()}`,
    },
    {
      label: "indent",
      format: `    ${selection.selected}`,
    },
    {
      label: "parentheses",
      format: `(${selection.selected})`,
    },
    {
      label: "curly-braces",
      format: `{${selection.selected}}`,
    },
    {
      label: "square-brackets",
      format: `[${selection.selected}]`,
    },
    {
      label: "single-quotes",
      format: `'${selection.selected}'`,
    },
    {
      label: "double-quotes",
      format: `"${selection.selected}"`,
    },
    {
      label: "date-1",
      format: `${new Date().getDate()} ${monthNames[new Date().getMonth()]}`,
    },
    {
      label: "date-2",
      format: `${weekday[new Date().getDay()]}`,
    },
    {
      label: "date-3",
      format: `${new Date().toLocaleTimeString()}`,
    },
    {
      label: "date-4",
      format: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
    },
  ];

  const copyFormat = (format) => {
    let format_ = formats.filter((x) => x.label === format)[0];
    let new_ =
      multiCtx.content.substring(0, selection.start) +
      format_.format +
      multiCtx.content.substring(selection.end, multiCtx.content.length);
    multiCtx.setContent(new_);
  };

  const formatDate = (format) => {
    let format_ = formats.filter((x) => x.label === format)[0];
    let new_ =
      multiCtx.content.substring(0, selection.start) +
      format_.format +
      multiCtx.content.substring(selection.end, multiCtx.content.length);
    multiCtx.setContent(new_);
  };

  return (
    <div className={className} id="toolbar">
      <ButtonGroup className="">
        <Button onClick={() => copyFormat("bold")} icon="type-bold" />
        <Button onClick={() => copyFormat("italic")} icon="type-italic" />
        <Button onClick={() => copyFormat("heading")} icon="type-h1" />
        <Button onClick={() => copyFormat("hrule")} icon="hr" />
        <Button onClick={() => copyFormat("num-list")} icon="123" />
        <Button onClick={() => copyFormat("bullet-list")} icon="list-ul" />
        <Button onClick={() => copyFormat("checklist")} icon="ui-checks" />
        <Button onClick={() => copyFormat("check")} icon="check-circle-fill" />
        <Button onClick={() => copyFormat("code")} icon="code-slash" />
        <Button onClick={() => copyFormat("image")} icon="image" />
        <Button onClick={() => copyFormat("link")} icon="link-45deg" />
        <Dropdown
          classNameBtn="btn"
          target="other-formats"
          className="btn-group"
          icon="type"
          autoClose={false}>
          <ButtonGroup size="sm" className="p-1">
            <Button
              className="border-0"
              onClick={() => copyFormat("capitalize")}
              icon="type"
              text="Capitalize"
            />
            <Button
              className="border-0"
              onClick={() => copyFormat("allcaps")}
              icon="alphabet-uppercase"
              text="Upper"
            />
            <Button
              className="border-0"
              onClick={() => copyFormat("alllower")}
              icon="alphabet"
              text="Lower"
            />
          </ButtonGroup>
        </Dropdown>{" "}
        <Button onClick={() => copyFormat("indent")} icon="indent" />
        <Button onClick={() => copyFormat("sort")} icon="sort-alpha-down" />
        <Button
          onClick={() => copyFormat("sort-reverse")}
          icon="sort-alpha-up-alt"
        />
        <Dropdown
          classNameBtn="btn"
          target="other-formats"
          className="btn-group"
          icon="three-dots"
          autoClose={false}>
          <ButtonGroup size="sm" className="p-1">
            <Button
              onClick={() => copyFormat("parentheses")}
              className="border-0"
              text="()"
            />
            <Button
              onClick={() => copyFormat("curly-braces")}
              className="border-0"
              text="{}"
            />
            <Button
              onClick={() => copyFormat("square-brackets")}
              className="border-0"
              text="[]"
            />
            <Button
              onClick={() => copyFormat("single-quotes")}
              className="border-0"
              text="''"
            />
            <Button
              onClick={() => copyFormat("double-quotes")}
              className="border-0"
              text='""'
            />
          </ButtonGroup>
        </Dropdown>
        <Dropdown
          classNameBtn="btn"
          target="date-formats"
          className="btn-group"
          icon="calendar-date"
          autoClose={false}>
          <div className="p-1">
            <Button
              size="sm"
              onClick={() => copyFormat("date-1")}
              className="border-0 w-100"
              text="'22 May'"
            />
            <Button
              size="sm"
              onClick={() => copyFormat("date-2")}
              className="border-0 w-100"
              text="'Wednesday'"
            />
            <Button
              size="sm"
              onClick={() => copyFormat("date-3")}
              className="border-0 w-100"
              text="'3:33 AM'"
            />
            <Button
              size="sm"
              onClick={() => copyFormat("date-4")}
              className="border-0 w-100"
              text="'2024-05-22'"
            />
          </div>
        </Dropdown>
        <Button
          className={showURL ? "active" : ""}
          icon="markdown-fill"
          onClick={() => setShowURL(!showURL)}
        />
      </ButtonGroup>
      {showURL && (
        <form onSubmit={(e) => savePage(e)} className="mt-3 w-50">
          <Input
            className="form-control-sm"
            placeholder="URL"
            onChange={onChangeURL}
            value={url}
          />
        </form>
      )}
    </div>
  );
}
