import parseHTML from "@/utils/htmlParser";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import gql from "graphql-tag";
import { print } from "graphql/language/printer";
import Translation from "@/types/translation";
import { fetchTranslations } from "@/app/api/translation/translationsFetcher";
import { LanguageType } from "@/types/language";

async function getWidget(language: string) {
    const widgetQuery = gql`
     query getWidget($slug: ID!, $idType: WidgetIdType!) {
        widget(id: $slug, idType: $idType) {
            title
            content
        }
      }
    `;

    const response = await fetchGraphQL<{
        widget: any;
    }>(
        print(widgetQuery), {
            slug: `footer-contact-${language}`,
            idType: 'URI'
        }
    );

    if (!response || !response.widget) {
        return null;
    }

    const { widget } = response;

    return widget;
}

const FooterContact = async ({language}: {language: LanguageType}) => {
    const content = await getWidget(language);
    const translation: Translation = await fetchTranslations(language);

    return (
        <div>
            <h4 className={"text-bold text-white text-3xl mb-4"}>
                {
                    translation.contact
                }
            </h4>
            <p className="text-white text-sm leading-8">
                {
                    parseHTML(content.content)
                }
            </p>
        </div>
    )
}

export default FooterContact
