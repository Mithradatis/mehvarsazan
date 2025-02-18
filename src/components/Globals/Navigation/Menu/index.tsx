import SubMenuItem from "@/components/Globals/Navigation/Submenu";
import { MenuItem } from "@/gql/graphql";
import Link from "next/link";

type MenuItemWithChildren = MenuItem & {
  children?: MenuItemWithChildren[];
};

const MenuLink = ({ item }: { item: MenuItemWithChildren }) => {
    const hasChildren = item.children && item.children.length > 0;
  
    return (
      <div className="menu-item relative group lg:flex hidden">
        <Link
          itemProp="url"
          href={item.uri || ''}
          target={item.target || "_self"}
          className="block py-4"
        >
          <span 
            itemProp="name" 
            className="text-white"
          >
            {item.label}
          </span>
        </Link>
  
        {hasChildren && (
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
            {item.children?.map((child) => (
              <SubMenuItem
                key={child.id}
                item={child}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  export default MenuLink;