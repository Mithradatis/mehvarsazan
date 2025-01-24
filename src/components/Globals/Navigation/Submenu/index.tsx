import { MenuItem } from "@/gql/graphql";
import Link from "next/link";

type MenuItemWithChildren = MenuItem & {
  children?: MenuItemWithChildren[];
};

const SubMenuItem = ({
    item,
  }: {
    item: MenuItemWithChildren;
  }) => {
    const hasChildren = item.children && item.children.length > 0;
  
    return (
      <div className="menu-item w-full group/submenu">
        <div className="flex items-center justify-between relative">
          <Link
            href={item.uri || '#'}
            className="
              block 
              px-4 
              py-2 
              hover:bg-dark-800 
              rounded 
              flex-grow 
              text-right 
              hover:translate-x-[-5px] 
              transition-all
            "
            target={item.target || "_self"}
          >
            <span className="
              text-white 
              text-sm text-nowrap 
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
            ">
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
              pr-2 border-r 
              border-slate-600 
              mr-2 
              mt-1
            ">
              {item.children?.map((child) => (
                <SubMenuItem
                  key={child.id}
                  item={child}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  export default SubMenuItem;