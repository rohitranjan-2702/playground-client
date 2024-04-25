import Editor from "@monaco-editor/react";
import { Socket } from "socket.io-client";

const CodeEditor = ({
  selectedFile,
  socket,
}: {
  selectedFile: any;
  socket: Socket;
}) => {
  if (!selectedFile) return null;

  const code = selectedFile.content;
  let language = selectedFile.name.split(".").pop();

  if (language === "js" || language === "jsx" || language === "json")
    language = "javascript";
  else if (language === "ts" || language === "tsx") language = "typescript";
  else if (language === "py") language = "python";

  function debounce(func: (value: string | undefined) => void, wait: number) {
    let timeout: any;
    return (value: string | undefined) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(value);
      }, wait);
    };
  }

  return (
    <Editor
      height="100vh"
      language="javascript"
      value={code}
      theme="vs-dark"
      onChange={debounce((value) => {
        if (value !== undefined) {
          socket.emit("updateContent", {
            path: selectedFile.path,
            content: value,
          });
        }
      }, 500)}
    />
  );
};

export default CodeEditor;
