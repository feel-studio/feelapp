import { getFileUrl } from "@/lib/helpers";

const Hyperlink = ({ link, children }) => {
  if (!link) return null;
  const { href, text, type, file, blank } = link;

  return (
    <>
      {/*eslint-disable */}
      <a
        href={type === "standard" ? href : getFileUrl(file?.asset?._ref)}
        target={blank ? "_blank" : "_self"}
        rel={blank ? "noopener noreferrer" : undefined}
      >
        {children || text}
      </a>
      {/*eslint-enable */}
      <style jsx>{``}</style>
    </>
  );
};

export default Hyperlink;
