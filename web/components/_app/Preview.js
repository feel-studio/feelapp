import { useState, useEffect } from "react";
import Link from "next/link";
import { MdClose } from "react-icons/md";

const inIframe = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};

const Preview = (props) => {
  const [env, setEnv] = useState(undefined);

  useEffect(() => {
    setEnv(inIframe() ? "studio" : "web");
  }, []);

  return !env || env === "studio" ? null : (
    <>
      <div className="Preview">
        <div className="label">
          Preview Mode{" "}
          <Link href="/api/exit-preview">
            <a>
              <MdClose />
            </a>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .Preview {
          --color: rgb(34, 118, 252);
          pointer-events: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          outline: 3px solid var(--color);
          outline-offset: -3px;
          z-index: 99999;
        }

        .label {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
            "Segoe UI Symbol";
          background: var(--color);
          color: white;
          font-size: 13px;
          line-height: 17px;
          font-weight: 500;
          padding: 8px;
          border-radius: 3px;
          display: flex;
          align-items: center;
          pointer-events: auto;
        }

        .label :global(> *) {
          display: inherit;
          margin-left: 4px;
        }
      `}</style>
    </>
  );
};

export default Preview;
