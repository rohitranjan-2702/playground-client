import React from "react";
import getIcon from "./icon";

function FileTree() {
  return (
    <>
      <div>Ok</div>
    </>
  );
}

const FileIcon = ({
  extension,
  name,
}: {
  name?: string;
  extension?: string;
}) => {
  let icon = getIcon(extension || "", name || "");
  return (
    <span className="flex w-[32px] h-[32px] justify-center items-center">
      {icon}
    </span>
  );
};

export default FileTree;
