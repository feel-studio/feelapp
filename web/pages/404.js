import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { Route } from "@/components/_app";
import { useRouter } from "next/router";

export default function Page404(props) {
  const { t } = useTranslation("common");
  const router = useRouter();

  console.log(router);

  return (
    <>
      <Route className="Route404">
        <div>
          {t("404-headline")} ({t("404-error")}).
          <br />
          {t("404-error-notice")}
        </div>
        <br />
        <Link href="/">
          <a>{t("404-return")}</a>
        </Link>
      </Route>

      <style jsx global>{`
        .Route404 {
          width: 100vw;
          max-width: 100vmin;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          flex-wrap: wrap;
          flex-direction: column;
          padding: calc(1rem + var(--lHS) + var(--__5)) var(--__5);
        }

        .Route404 a {
          color: var(--gray);
          transition: color 0.233s;
        }

        @media (hover: hover) {
          .Route404 a:hover {
            color: var(--darkgray);
          }
        }
      `}</style>
    </>
  );
}

// export const getStaticProps = async ({ locale }) => ({
//   props: {
//     ...(await serverSideTranslations(locale)),
//   },
// });
