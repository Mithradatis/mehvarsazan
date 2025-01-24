import { print } from "graphql/language/printer";
import { MenuItem, RootQueryToMenuItemConnection } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import gql from "graphql-tag";
import Image from "next/image";
import MenuLink from "@/components/Globals/Navigation/Menu";
import Logo from "@/assets/logos/logo.png";

type MenuItemWithChildren = MenuItem & {
  children?: MenuItemWithChildren[];
};

async function getMenu() {
  const menuQuery = gql`
    query MenuQuery {
      menuItems(
        where: { location: PRIMARY_MENU }
        first: 1000
      ) {
        nodes {
          id
          uri
          target
          label
          parentId
        }
      }
    }
  `;

  const response = await fetchGraphQL<{
    menuItems: RootQueryToMenuItemConnection;
  }>(print(menuQuery));

  if (!response || !response.menuItems) {
    return null;
  }

  const buildMenuTree = (items: MenuItem[]): MenuItemWithChildren[] => {
    const itemsById = new Map<string, MenuItemWithChildren>();
    items.forEach(item => {
      itemsById.set(item.id || '', { ...item, children: [] });
    });

    const rootItems: MenuItemWithChildren[] = [];

    items.forEach(item => {
      const menuItem = itemsById.get(item.id || '');
      if (!menuItem) return;

      if (item.parentId && itemsById.get(item.parentId)) {
        const parent = itemsById.get(item.parentId);
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(menuItem);
        }
      } else {
        rootItems.push(menuItem);
      }
    });

    return rootItems;
  };

  const hierarchicalMenu = buildMenuTree(response.menuItems.nodes);
  return hierarchicalMenu;
}

export default async function Navigation() {
  const menuItems = await getMenu();

  return (
    <>
      <div className="
        flex 
        flex-wrap 
        items-center 
        lg:justify-between
        justify-center 
        w-full 
        lg:w-3/4 
        m-auto
      ">
        <div className="relative inline-block drop-shadow-lg">
          <div className="
            hexagon 
            relative
            z-10
            bg-gray-100 
            w-[175px] 
            h-[175px] 
            mx-auto 
            lg:mx-4 
            mb-6 
            lg:mb-0 
            flex 
            items-center 
            justify-center
          ">
            <Image
              className="mt-2"
              src={Logo}
              alt={"Mehvar Sazan Iran Khodro Logo"}
              quality={100}
              width={70}
            />
          </div>
        </div>
        <nav
          className="
            relative
            z-50
            w-full
            lg:flex-1
            none 
            lg:flex 
            items-center 
            justify-between 
            bg-gradient-to-b 
            from-gray-50 
            to-gray-200
            rounded-xl 
            !py-0 
            !px-8 
            mb-6 
            lg:mb-0
            shadow-[1px_1px_4px_rgba(0,0,0,.25)]
          "
          role="navigation"
          itemScope
          itemType="http://schema.org/SiteNavigationElement"
        >
          {menuItems?.map((item: MenuItemWithChildren) => (
            <MenuLink key={item.id} item={item} />
          ))}
        </nav>
      </div>
    </>
  );
}