import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router'
import type { Breadcrumb } from "../../types";
import layout from "../../styles/Layout.module.css";
import { breadcrumbsNames } from '../../store/index'

const Breadcrumbs: React.FC = () => {
  const router = useRouter()
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[] | undefined>(undefined);
  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/');
      linkPath.shift();

      const routePath = router.route.split('/');
      routePath.shift();

      let pathArray: Breadcrumb[] = linkPath.map((path, i) => {
        return { 
          title: path, 
          href: '/' + linkPath.slice(0, i + 1).join('/'), 
          route: '/' + routePath.slice(0, i + 1).join('/') 
        };
      });
      pathArray = pathArray.filter(item => item.href !== '/');
      setBreadcrumbs(pathArray);
    }
  }, [router]);

  const getBreadcrumbName = (breadcrumb: Breadcrumb) => {
    if (breadcrumb) {
      const title = breadcrumbsNames.find(item => item.route === breadcrumb.route)?.title;
      return title ? title : ''
    }
  };

  return (
    <ul className={layout.breadcrumbs}>
      <li>
        <Link href="/">Strona główna</Link>
      </li>
      {breadcrumbs && breadcrumbs.map((breadcrumb, idx) => {
        return (
          <li key={idx}>
            <Link href={breadcrumb.href}>
              {getBreadcrumbName(breadcrumb)}
            </Link>
          </li>
        ); <></>;
      })}
    </ul>
  );
};

export default Breadcrumbs;
