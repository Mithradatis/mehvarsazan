import gql from "graphql-tag";

export const ContentInfoQuery = gql`
  query ContentInfo($slug: ID!) {
  contentNode(id: $slug, idType: URI) {
    ... on Page {
      contentTypeName
      databaseId
      status
      uri
      blocks
    }
    ... on Post {
      contentTypeName
      databaseId
      status
      uri
      blocks
    }
  }
}
`;
