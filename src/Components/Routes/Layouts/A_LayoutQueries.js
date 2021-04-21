import { gql } from "apollo-boost";

export const GET_ADMIN_USER_LOGIN_RESULT = gql`
  query getAdminUserLoginResult($userId: String!, $password: String!) {
    getAdminUserLoginResult(userId: $userId, password: $password) {
      _id
      right
    }
  }
`;
