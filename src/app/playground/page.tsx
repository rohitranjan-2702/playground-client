"use client";
import CodeEditor from "@/components/CodeEditor";
import TerminalComponent from "@/components/Terminal";
import Sidebar from "@/components/file-tree/sidebar";
import { useSocket } from "@/hooks/useSocket";
import { useEffect, useRef, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

// const OUTPUT_URL = "http://localhost:3000/react";
const OUTPUT_URL = process.env.NEXT_PUBLIC_EXECUTION_ENGINE_URI;

export interface RemoteFile {
  type: "file" | "dir";
  name: string;
  path: string;
}

export interface File {
  id: string;
  type: "file" | "dir";
  name: string;
  content?: string;
  path: string;
  parentId: string | undefined;
  depth: number;
}

export default function Example() {
  const [loaded, setLoaded] = useState(false);
  const [outputUrl, setOutputUrl] = useState(OUTPUT_URL);
  const socket = useSocket("pgId");
  const [refresh, setRefresh] = useState(0); // [1
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [fileStructure, setFileStructure] = useState<File[]>([]);

  useEffect(() => {
    if (socket) {
      socket.on("loaded", ({ rootContent }: { rootContent: File[] }) => {
        console.log("loaded", rootContent);
        setLoaded(true);
        setFileStructure(rootContent);
        // setSelectedFile(rootContent[3]);
      });
    }
  }, [socket]);

  const onSelect = (file: File) => {
    if (file.name === "node_modules") {
      return alert("Cannot open node_modules in code editor.");
    }
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
                    {selectedFile?.name === file.name ? (
                      <p className="bg-gray-200 text-black px-2 rounded-md">
                        {file.name}
                      </p>
                    ) : (
                      <p className="">{file.name}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Sidebar>
        </Panel>
        <PanelResizeHandle className="w-1 bg-slate-400/60" />
        <Panel minSize={50} defaultSize={50}>
          <PanelGroup direction="vertical" className="bg-slate-300">
            <Panel maxSize={5} className="bg-black">
              <button
                className="bg-zinc-700 text-blue-400 p-2 text-sm "
                onClick={() => setRefresh((prev) => prev + 1)}
              >
                {selectedFile?.name || "Select a file"}
              </button>
            </Panel>
            <Panel className="">
              {socket && (
                <CodeEditor socket={socket} selectedFile={selectedFile} />
              )}
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle className="w-1 bg-slate-500" />
        <Panel minSize={20}>
          <PanelGroup direction="vertical" className="bg-slate-300">
            <Panel
              maxSize={5}
              className="flex py-1 justify-center space-x-4 bg-zinc-200"
            >
              <input
                className="p-1 rounded-lg border border-gray-700"
                defaultValue={outputUrl}
                // value={outputUrl}
                onChange={(e) => setOutputUrl(e.target.value)}
              />

              <button
                className="bg-black text-yellow-500 p-2 text-sm rounded-full"
                onClick={() => setRefresh((prev) => prev + 1)}
              >
                Refresh
              </button>
            </Panel>
            <Panel maxSize={40}>
              {/* OUTPUT */}
              <div className="w-full h-full">
                <iframe
                  width={"100%"}
                  height={"100%"}
                  src={`${outputUrl}`}
                  key={refresh}
                />
              </div>
            </Panel>
            <PanelResizeHandle className="h-1 bg-slate-500" />
            <Panel className="bg-black text-white" minSize={20}>
              <div className="w-full h-fit">
                {socket && <TerminalComponent socket={socket} command="" />}
              </div>
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  );
}
