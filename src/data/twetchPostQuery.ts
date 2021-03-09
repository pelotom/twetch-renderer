import { gql } from "graphql-request";

export default gql`
  fragment PostFields on Post {
    bContent
    bContentType
    createdAt
    id
    mapComment
    nodeId
    numBranches
    numLikes
    replyPostId
    transaction
    userId
    youBranched: youBranchedCalc
    youLiked: youLikedCalc
    mapTwdata
    files
    mediaByPostId {
      nodes {
        filename
      }
    }
    postsByReplyPostId {
      totalCount
    }
    parents {
      nodes {
        nodeId
        id
        transaction
        userByUserId {
          icon
          id
          name
          nodeId
        }
      }
    }
    userByUserId {
      createdAt
      icon
      id
      moneyButtonUserId
      oneButtonAddress
      defaultWallet
      name
      nodeId
      firstPost: postsByUserId(orderBy: CREATED_AT_ASC, first: 1) {
        nodes {
          nodeId
          transaction
        }
      }
    }
  }

  fragment PostDetailFields on Post {
    ...PostFields
    parents {
      nodes {
        ...PostFields
      }
    }
  }

  query fetchPostByTransactionPostDetailList($txid: String!) {
    post: postByTransaction(transaction: $txid) {
      ...PostDetailFields
    }
  }
`;
