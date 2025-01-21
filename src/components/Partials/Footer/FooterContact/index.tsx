import parseHTML from "@/utils/htmlParser";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import gql from "graphql-tag";
import { print } from "graphql/language/printer";

async function getWidget() {
    const widgetQuery = gql`
     query SinglePost {
        widget(id: "330", idType: DATABASE_ID) {
          title
          content
        }
      }
    `;

    const response = await fetchGraphQL<{
        widget: any;
    }>(print(widgetQuery));

    if (!response || !response.widget) {
        return null;
    }

    const { widget } = response;

    return widget;
}

const FooterContact = async () => {
    const content = await getWidget();

    return (
        <div>
            <h4 className={"text-bold text-white text-3xl mb-4"}>تماس با ما</h4>
            <p className="text-white text-sm leading-8">
                {parseHTML(content.content)}
            </p>
        </div>
    )
}

export default FooterContact
