"use client";
import React, { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "xterm-addon-fit";
import "@xterm/xterm/css/xterm.css";
const fitAddon = new FitAddon();

function ab2str(buf: ArrayBuffer | Uint8Array) {
  const uint8Array = new Uint8Array(buf);
  const numberArray = Array.from(uint8Array);
  return String.fromCharCode.apply(null, numberArray);
}

const OPTIONS_TERM = {
  useStyle: true,
  screenKeys: false,
  cursorBlink: true,
  cols: 100,
  theme: {
    background: "#111",
  },
};

const TerminalComponent = ({ socket }: { socket: Socket }) => {
  const terminalRef = useRef(null);
  //   console.log("rendering terminal component");

  useEffect(() => {
    if (!terminalRef || !terminalRef.current) {
      return;
    }

    socket.on("data", (data) => {
      if (data instanceof ArrayBuffer) {
        term.write(ab2str(data));
      }
    });

    const term = new Terminal(OPTIONS_TERM);
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    fitAddon.fit();
    term.write("Hello from RoHiT $ ");
    term.onData((data) => {
      console.log(data);
      // term.write(data);
      socket.emit("data", new TextEncoder().encode("\x00" + data));
    });

    socket.emit("terminalData", {
      data: "\n",
    });

    return () => {
      socket.off("terminal");
    };
  }, [terminalRef]);

  return <div className="text-left overflow-y-hidden" ref={terminalRef}></div>;
};

export default TerminalComponent;
