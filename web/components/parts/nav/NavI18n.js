import Link from "next/link";
import { useRouter } from "next/router";

import config from "@config";

const NavI18n = ({ i18n = {} }) => {
  const { locale, locales, asPath, ...router } = useRouter();

  return config?.i18n && Object.keys(config?.i18n)?.length < 2 ? null : (
    <>
      {locales
        ?.filter((l) => l !== locale)
        .map((l, i) => (
          <Link href={i18n[l]?.slug.current || asPath} key={i} locale={l}>
            <a className="NavI18n">{config?.i18n?.[l]}</a>
          </Link>
        ))}
      <style jsx>{`
        @media (min-width: 768px) {
          .NavI18n {
            color: var(--gray);
          }
        }

        @media (min-width: 768px) and (hover: hover) {
          .NavI18n:hover {
            color: var(--darkgray);
          }
        }
      `}</style>
    </>
  );
};

export default NavI18n;
