import { print } from "graphql/language/printer";
import { MenuItem, RootQueryToMenuItemConnection } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import gql from "graphql-tag";
import Link from "next/link";

async function getMenu() {
    const menuQuery = gql`
    query MenuQuery {
      menuItems(
        where: { location: FOOTER_MENU }
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
        menuItems: any;
    }>(print(menuQuery));

    if (!response || !response.menuItems) {
        return null;
    }

    return response.menuItems.nodes;
}

export default async function Navigation() {
    const menuItems = await getMenu();

    return (
        <nav
            role="navigation"
            itemScope
            itemType="http://schema.org/SiteNavigationElement"
            className="grid gap-4 w-full sm:grid-cols-2 md:grid-cols-3"
        >
            {menuItems && menuItems.map((item: MenuItem, index: number) => (
                <Link
                    className="text-white text-demi-bold block text-shadow drop-shadow-[1px_1px_0_rgba(0,0,0,.25)]"
                    href={item.uri || ''}
                    key={item.id}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    );
}