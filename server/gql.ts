export function discussionGql(ghDiscussionCategoryId: string | undefined) {
  return `{
        repository(owner: "hieumn12299", name: "Tbook") {
            discussions(first: 100, categoryId: "${ghDiscussionCategoryId}", orderBy: {field: CREATED_AT, direction: ASC}) {
              nodes {
                title
                url
                number
                bodyHTML
                bodyText
                createdAt
                lastEditedAt
                author {
                  login
                  url
                  avatarUrl
                }
                 labels(first: 100) {
                  nodes {
                    name
                  }
                }
              }
            }
          }
    }`;
}

// Single post
export function discussionDetailGql(storyId: string | undefined) {
  return `{
    repository(owner: "hieumn12299", name: "Tbook") {
      discussion(number: ${storyId}) {
        title
        bodyHTML
        createdAt
        author {
          login
          url
          avatarUrl
        }
      }
    }
  }`;
}
