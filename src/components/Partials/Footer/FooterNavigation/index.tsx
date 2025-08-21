import { print } from "graphql/language/printer";
import { MenuItem } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import gql from "graphql-tag";
import Link from "next/link";

async function getMenu(language: string) {
    const menuQuery = gql`
    query MenuQuery($language: LanguageCodeFilterEnum) {
      menuItems(
        where: { location: FOOTER_MENU, language: $language }
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
    }>(
      print(menuQuery),
      {
        language: language.toUpperCase()
      }
    );

    if (!response || !response.menuItems) {
        return null;
    }

    return response.menuItems.nodes;
}

export default async function Navigation({language}: {language: string}) {
    const menuItems = await getMenu(language);

    return (
        <nav
            role="navigation"
            itemScope
            itemType="http://schema.org/SiteNavigationElement"
            className="grid gap-4 w-full sm:grid-cols-2 md:grid-cols-3"
        >
            {menuItems && menuItems.map((item: MenuItem, index: number) => (
                <Link
                    className="
                    text-white 
                    text-demi-bold 
                    block text-shadow 
                    drop-shadow-[1px_1px_0_rgba(0,0,0,.25)] 
                    hover:text-[#dec913]
                    transition
                    duration-200
                    ease-in"
                    href={item.uri || ''}
                    key={item.id}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    );
}