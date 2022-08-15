import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import Content from "@/components/content/Content";

const Legal = ({ legal }) => {
  const { locale } = useRouter();
  const { t } = useTranslation("common");

  if (!legal?.[0]) return null;

  const { privacyPolicy, disclaimer, _updatedAt } = legal?.[0];

  return (
    <>
      <article className="Legal">
        <section>
          <header>
            <h1>{t("legal-notice")}</h1>
            <br />
            {t("last-updated-on")}:
            <br />
            {new Date(_updatedAt).toLocaleDateString(locale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </header>
          <Content blocks={disclaimer} />
        </section>
        <section>
          <header>
            <h1>{t("privacy-policy")}</h1>
          </header>
          <Content blocks={privacyPolicy} />
        </section>
      </article>

      <style jsx>{``}</style>
    </>
  );
};

export default Legal;
