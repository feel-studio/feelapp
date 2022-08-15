import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import config from "@config";

const Footer = (props) => {
  const { t } = useTranslation("common");
  const { createdAt = "" } = config;
  return (
    <>
      <footer className="Footer">
        <div>{`© ${createdAt}${
          new Date().getFullYear() > createdAt
            ? " – " + new Date().getFullYear().toString().substr(-2)
            : ""
        }`}</div>
        <div>
          <Link href="/legal">
            <a>
              {t("legal-notice")} & {t("privacy-policy")}
            </a>
          </Link>
        </div>
      </footer>
      <style jsx>{`
        .Footer :global(a) {
        }

        @media (hover: hover) {
          .Footer :global(a:hover) {
          }
        }
      `}</style>
    </>
  );
};

export default Footer;
