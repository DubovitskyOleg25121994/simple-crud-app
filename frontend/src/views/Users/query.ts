import { gql } from '@apollo/client';

export const QUERY_USER_LIST = gql`
  query Users($usersSkip: Int!, $usersLimit: Int!) {
    users(skip: $usersSkip, limit: $usersLimit) {
      list {
        id
        name
        email
      }
      count
    }
  }
`;
