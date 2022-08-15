const Placeholder = ({ ratio = 3 / 2, onClick }) => {
  return (
    <>
      <div
        className="Placeholder Media"
        data-orientation={ratio < 1 ? "portrait" : "landscape"}
        style={{ "--ratio": ratio }}
        onClick={onClick}
      >
        <div></div>
      </div>

      <style jsx>{`
        .Media {
          background-image: linear-gradient(
              to top left,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 0) calc(50% - 1px),
              rgba(0, 0, 0, 0.1) 50%,
              rgba(0, 0, 0, 0) calc(50% + 1px),
              rgba(0, 0, 0, 0) 100%
            ),
            linear-gradient(
              to top right,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 0) calc(50% - 1px),
              rgba(0, 0, 0, 0.1) 50%,
              rgba(0, 0, 0, 0) calc(50% + 1px),
              rgba(0, 0, 0, 0) 100%
            );
          background-color: hsl(0, 0%, 93%);
        }

        .Media > div {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: calc(100% / var(--ratio));
        }
      `}</style>
    </>
  );
};

export default Placeholder;
