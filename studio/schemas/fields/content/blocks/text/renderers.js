import React from "react";
import { MdInsertEmoticon } from "react-icons/md";

// Render custom content in Editor
export const renderLarge = ({ children }) => (
  <span style={{ fontSize: "1.25em" }}>{children}</span>
);

export const renderSmall = ({ children }) => (
  <span style={{ fontSize: "0.75em" }}>{children}</span>
);

export const renderHeadline = ({ children }) => (
  <span style={{ fontWeight: "bold" }}>{children}</span>
);

export const renderIcon = ({ children, text }) => {
  if (text === "") return null;

  return (
    <span>
      <MdInsertEmoticon />
      {children}
    </span>
  );
};
