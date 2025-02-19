import { MenuItem } from "@/gql/graphql";
import { LanguageType } from "@/types/language";
import Link from "next/link";

type MenuItemWithChildren = MenuItem & {
  children?: MenuItemWithChildren[];
};

const getHref = (item: MenuItemWithChildren, language: LanguageType) => {
  const isExternalURL = item.uri?.startsWith("http://") || item.uri?.startsWith("https://");

  if (isExternalURL) {
    return item.uri || '#';
  }

  let uri = item.uri || '';

  const basePath = language === "fa" ? "/fa" : "/en";

  if (language === "fa") {
    uri = uri.replace(/^\/fa\//, '/');
    uri = `${basePath}${uri.startsWith('/') ? '' : '/'}${uri}`;
  } else if (language === "en") {
    uri = uri.replace(/^\/fa\//, '/');
    uri = `${basePath}${uri.startsWith('/') ? '' : '/'}${uri}`;
  }

  uri = uri.replace(/\/+/g, '/');

  return uri;
};

const SubMenuItem = ({
  item,
  language
}: {
  item: MenuItemWithChildren;
  language: LanguageType;
}) => {
  const hasChildren = item.children && item.children.length > 0;
  const href = getHref(item, language);

  return (
    <div className="menu-item w-full group/submenu">
      <div className="flex items-center justify-between relative">
          <Link
            href={href}
            className="
              block 
              px-4 
              py-2 
              hover:bg-dark-800 
              rounded 
              flex-grow 
              text-start 
              hover:translate-x-[-5px] 
              transition-all
            "
            target={item.target || "_self"}
          >
            <span className="
              text-white 
              text-sm 
              text-nowrap 
              text-demi-bold
            ">
              {item.label}
            </span>
          </Link>
        {hasChildren && (
          <label 
            htmlFor={`submenu-${item.id}`}
            className="
              px-2 
              text-white 
              hover:bg-dark-800 
              rounded 
              cursor-pointer
              absolute
              flex
              items-center
              justify-end
              w-full
              h-full
            "
          >
            <svg 
              className="
                h-4 
                w-4 
                transform 
                transition-transform 
                group-focus-within/submenu:rotate-90
              " 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </label>
        )}
      </div>
      {hasChildren && (
        <>
          <input
            type="checkbox"
            id={`submenu-${item.id}`}
            className="hidden peer"
          />
          <div className="
            hidden 
            peer-checked:block 
            ps-2 border-r 
            border-slate-600 
            ms-2 
            mt-1
          ">
            {item.children?.map((child) => (
              <SubMenuItem
                key={child.id}
                item={child}
                language={language}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SubMenuItem;