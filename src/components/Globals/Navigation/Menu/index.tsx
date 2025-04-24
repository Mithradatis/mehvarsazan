import SubMenuItem from "@/components/Globals/Navigation/Submenu";
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

const MenuLink = ({
  item,
  language,
}: {
  item: MenuItemWithChildren;
  language: LanguageType;
}) => {
  const hasChildren = item.children && item.children.length > 0;
  const href = getHref(item, language);

  return (
    <div className="menu-item relative group lg:flex hidden">
      <Link
        itemProp="url"
        href={href}
        target={item.target || "_self"}
        className="block py-4 font-bold"
      >
        <span itemProp="name" className="text-white">
          {item.label}
        </span>
      </Link>
      {
        hasChildren && (
          <div
            className="
            hidden
            absolute 
            top-full
            start-0
            group-hover:block
            bg-[rgba(34,34,34,.7)] 
            backdrop-blur-sm
            shadow-lg 
            rounded-b-lg
            min-w-[400px]
          "
          >
            {
              item.children?.map((child) => (
                <SubMenuItem
                  key={child.id}
                  item={child}
                  language={language}
                />
              ))
            }
          </div>
        )
      }
    </div>
  );
};

export default MenuLink;