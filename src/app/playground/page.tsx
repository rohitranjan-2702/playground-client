"use client";
import CodeEditor from "@/components/CodeEditor";
import TerminalComponent from "@/components/Terminal";
import Sidebar from "@/components/file-tree/sidebar";
import { useSocket } from "@/hooks/useSocket";
import { useEffect, useRef } from "react";
import {
  getPanelElement,
  getPanelGroupElement,
  getResizeHandleElement,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";

const OUTPUT_URL = "http://localhost:3000";

export default function Example() {
  const socket = useSocket("pgId");
  //   const refs = useRef();

  //   useEffect(() => {
  //     const groupElement = getPanelGroupElement("group");
  //     const leftPanelElement = getPanelElement("left-panel");
  //     const rightPanelElement = getPanelElement("right-panel");
  //     const resizeHandleElement = getResizeHandleElement("resize-handle");

  //     // If you want to, you can store them in a ref to pass around
  //     refs.current = {
  //       groupElement,
  //       leftPanelElement,
  //       rightPanelElement,
  //       resizeHandleElement,
  //     };
  //   }, []);

  return (
    <div className="flex w-full h-screen">
      <PanelGroup direction="horizontal" className="">
        <Panel className="bg-slate-700 " minSize={10} defaultSize={15}>
          <Sidebar>
            <div className="h-full w-full bg-slate-700">
              <h1 className="text-white text-lg w-full bg-zinc-900 p-2">
                Files
              </h1>
            </div>
          </Sidebar>
        </Panel>
        <PanelResizeHandle className="w-1 bg-slate-400/60" />
        <Panel minSize={50} defaultSize={50}>
          <CodeEditor />
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
