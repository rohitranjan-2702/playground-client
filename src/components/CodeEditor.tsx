import Editor from "@monaco-editor/react";
// import { File } from "../utils/file-manager";
import { Socket } from "socket.io-client";

const CodeEditor = ({}: //   selectedFile,
//   socket,
{
  //   selectedFile: File | undefined;
  //   socket: Socket;
}) => {
  //   if (!selectedFile) return null;

  //   const code = selectedFile.content;
  //   let language = selectedFile.name.split(".").pop();

  //   if (language === "js" || language === "jsx") language = "javascript";
  //   else if (language === "ts" || language === "tsx") language = "typescript";
  //   else if (language === "py") language = "python";

  //   function debounce(func: (value: string | undefined) => void, wait: number) {
  //     let timeout: number;
  //     return (value: string | undefined) => {
  //       clearTimeout(timeout);
  //       timeout = setTimeout(() => {
  //         func(value);
  //       }, wait);
  //     };
  //   }

  return (
    <Editor
      height="100vh"
      language="javascript"
      value={`var ok = console.log("Hello World")`}
      theme="vs-dark"
      //   onChange={debounce((value) => {
      //     if (value !== undefined) {
      //       socket.emit("updateContent", {
      //         path: selectedFile.path,
      //         content: value,
      //       });
      //     }
      //   }, 500)}
    />
  );
};

export default CodeEditor;
