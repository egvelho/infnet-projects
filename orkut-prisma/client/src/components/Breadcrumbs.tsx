import { Link } from "react-router-dom";

export type BreadcrumbsProps = {
  links: { title: string; link: string }[];
};

export function Breadcrumbs({ links }: BreadcrumbsProps) {
  return (
    <nav className="flex flex-row items-center gap-4">
      {links.map(({ title, link }, index) => (
        <span className="flex flex-row items-center" key={index}>
          <Link
            key={index}
            to={link}
            className="uppercase text-sm text-gray-600 hover:text-gray-400"
          >
            {title}
          </Link>
        </span>
      ))}
    </nav>
  );
}
