"use client";
import CodeEditor from "@/components/CodeEditor";
import TerminalComponent from "@/components/Terminal";
import Sidebar from "@/components/file-tree/sidebar";
import { useSocket } from "@/hooks/useSocket";
import { useEffect, useRef, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

const OUTPUT_URL = "http://localhost:3000";

export interface RemoteFile {
  type: "file" | "dir";
  name: string;
  path: string;
}

export interface File {
  id: string;
  name: string;
  content?: string;
  path: string;
  parentId: string | undefined;
  depth: number;
}

export default function Example() {
  const [loaded, setLoaded] = useState(false);
  const socket = useSocket("pgId");
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [fileStructure, setFileStructure] = useState<File[]>([]);

  useEffect(() => {
    if (socket) {
      socket.on("loaded", ({ rootContent }: { rootContent: File[] }) => {
        console.log("loaded", rootContent);
        setLoaded(true);
        setFileStructure(rootContent);
        setSelectedFile(rootContent[0]);
      });
    }
  }, [socket]);

  const onSelect = (file: File) => {
    socket?.emit("fetchContent", { path: file.path }, (data: string) => {
      file.content = data;
      setSelectedFile(file);
    });
  };

  console.log("fileStructure", fileStructure);
  console.log("selectedFile", selectedFile);

  return (
    <div className="flex w-full h-screen">
      <PanelGroup direction="horizontal" className="">
        <Panel className="bg-slate-700 " minSize={10} defaultSize={15}>
          <Sidebar>
            <div className="h-full w-full bg-slate-700">
              <h1 className="text-white text-lg w-full bg-zinc-900 p-2">
                Files
              </h1>
              <div>
                {fileStructure.map((file) => (
                  <div
                    key={file.path}
                    onClick={() => onSelect(file as File)}
                    className="text-white p-2 border-1 border-black bg-gray-800 hover:bg-gray-700 cursor-pointer"
                  >
                    {file.name}
                  </div>
                ))}
              </div>
            </div>
          </Sidebar>
        </Panel>
        <PanelResizeHandle className="w-1 bg-slate-400/60" />
        <Panel minSize={50} defaultSize={50}>
          {socket && <CodeEditor socket={socket} selectedFile={selectedFile} />}
        </Panel>
        <PanelResizeHandle className="w-1 bg-slate-500" />
        <Panel minSize={20}>
          <PanelGroup direction="vertical" className="bg-slate-300">
            <Panel>
              <div className="w-full h-full">
                <iframe width={"100%"} height={"100%"} src={`${OUTPUT_URL}`} />
              </div>
            </Panel>
            <PanelResizeHandle className="h-1 bg-slate-500" />
            <Panel className="bg-black text-white">
              <div className="w-full ">
                {socket && <TerminalComponent socket={socket} />}
              </div>
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  );
}
