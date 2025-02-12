import { print } from "graphql/language/printer";
import { MenuItem, RootQueryToMenuItemConnection } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import gql from "graphql-tag";
import MenuLink from "@/components/Globals/Navigation/Menu";
import dynamic from "next/dynamic";

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

const ClientSideMenu = dynamic(() => import("./ClientSideMenu"), {});

export default async function Navigation() {
  const menuItems = await getMenu();

  return (
    <nav
      className="
        relative 
        z-50 
        w-full
        none lg:flex 
        items-center 
        justify-around
        rounded-xl 
        !py-0 
        lg:!px-8
        !px-4
      "
      role="navigation"
      itemScope
      itemType="http://schema.org/SiteNavigationElement"
    >
      {menuItems?.map((item: MenuItemWithChildren) => (
        <MenuLink key={item.id} item={item} />
      ))}
      <ClientSideMenu menuItems={menuItems} />
    </nav>
  );
}
