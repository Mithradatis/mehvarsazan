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

const ContactWidget = async () => {
    const contact = await getWidget();

    return (
        <div className="
          mt-28
          text-2xl
          text-slate-800 
          w-3/4
          p-8
          rounded-2xl
          bg-gradient-to-br
          from-[#1F53ED]
          to-[#568BF5]
          shadow-[-6px_-6px_10px_-1px_#fff,2px_2px_3px_-1px_rgba(34,34,34,0.1)]
        ">
            <h4 className={"text-bold text-white text-3xl mb-4"}>تماس با ما</h4>
            <p className="text-white text-sm leading-8 font-bold">
                {
                    parseHTML(contact.content || '')
                }
            </p>
        </div>
    )
}

export default ContactWidget
