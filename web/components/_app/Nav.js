import { useState } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

import config from "@config";
import { useLayoutType } from "@/hooks/.";
import { NavAnchors, NavI18n } from "@/components/parts/nav";

const Nav = ({ sectionSlugActive, i18n }) => {
  const [isOpen, setOpen] = useState(false);
  const { isSmall } = useLayoutType();
  const { pathname } = useRouter();
  const { t } = useTranslation("routes");

  const sections = ["home", "legal"];

  return (
    <>
      <nav
        className="Nav"
        data-active={(isSmall && isOpen) || !isSmall}
        data-type={pathname !== "/" ? "subpage" : "home"}
      >
        {isSmall && (
          <button onClick={() => setOpen(!isOpen)}>
            <h1>{!isOpen ? <AiOutlineMenu /> : <AiOutlineClose />}</h1>
          </button>
        )}

        {pathname !== "/" ? (
          <div className="breadcrumbs">
            <span className="breadcrumb">
              <Link href="/">
                <a>{t("home")}</a>
              </Link>{" "}
              / {t(pathname?.split("/")[1])}
            </span>
            <NavI18n i18n={i18n} />
          </div>
        ) : (
          <NavAnchors
            sections={sections}
            sectionSlugActive={sectionSlugActive}
            isActive={(isSmall && isOpen) || !isSmall}
            close={() => setOpen(false)}
          >
            {config?.i18n && Object.keys(config?.i18n)?.length > 1 && (
              <li className="i18n">
                <NavI18n i18n={i18n} />
              </li>
            )}
          </NavAnchors>
        )}
      </nav>

      <style jsx>{`
        .Nav {
        
        }

		.Nav[data-type="home"] :global(.breadcrumbs),
        .Nav[data-type="subpage"] :global(ul), 
        .Nav[data-type="subpage"] :global(> button) {
          display: none;
        }

        .Nav[data-type="subpage"] {
        }

        .Nav[data-type="subpage"] :global(.NavI18n) {
          margin: 0;
          padding: 0;
        }

        .breadcrumbs {
          display: flex;
          justify-content: space-between;
          width: 100%;
          pointer-events: all;
        }

        .breadcrumb a {
        }

        @media (hover: hover) {
          .breadcrumb a:hover {
            
          }
        }

        .Nav[data-active="false"] {
          pointer-events: none;
        }

        .Nav :global(> ul li) {
          cursor: pointer;
          transition: color 0.233s;
        }

        @media (max-width: 767px) {
          .Nav {
            /* padding: calc(1rem / 2) 1rem; */
            height: 100%;
            transition: background: 1s;
          }

		  .Nav[data-active="true"] {     
            background: white;
          }

          .Nav :global(ul) {
            height: 100%;
          }

          .Nav :global(:is(> button, ul li, .NavI18n)) {
            /* padding: calc(1rem / 2) 0;*/
          }

          .Nav > button {
            /* margin-bottom: calc(1rem / 2);*/
            pointer-events: all;
          }

          .Nav :global(.i18n) {
            /* margin-top: calc(1rem / 2);*/
          }
        }

        @media (min-width: 768px) {
          .Nav {
            pointer-events: none;
          }

          .Nav,
          .Nav :global(ul) {
            display: flex;
          }

          .Nav :global(ul li) {
            pointer-events: auto;
          }

          .Nav :global(:is(ul, ul > *)) {
            /* padding: 0.5rem;*/
          }

          .Nav :global(> ul li:not([data-active="true"])) {
            
          }

          .breadcrumbs {
            /* padding: 1rem;*/
          }
        }

        @media (min-width: 768px) and (hover: hover) {
          .Nav :global(> ul li:not([data-active="true"]):hover) {
            
          }
        }
      `}</style>
    </>
  );
};

export default Nav;
