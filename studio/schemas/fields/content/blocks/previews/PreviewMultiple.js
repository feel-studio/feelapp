import React from "react";
import { PreviewMedia } from "./";

export function PreviewMultiple({ value }) {
  if (!value) return null;

  delete value._type;

  Object.keys(value).forEach(
    (key) => value[key] === undefined && delete value[key]
  );

  let valueArray = Object.entries(value);

  return (
    <div
      style={{
        display: "flex",
        padding: "0.5rem",
      }}
    >
      {valueArray.map((el, i) => {
        let key = el[0].split("_")[0];
        let value = el[1];
        let obj = {};

        obj[key] = value;

        return <PreviewMedia key={i} media={obj} />;
      })}
    </div>
  );
}
