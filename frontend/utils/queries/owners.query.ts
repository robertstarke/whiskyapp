import { gql } from "@apollo/client";

export const OWNERS = gql`
  query Owners {
    owners {
      id
      name
      country
    }
  }
`;

export const OWNERS_FOR_DISTILLERIES = gql`
  query Owners {
    owners {
      id
      name
    }
  }
`;

export const ADD_OWNER = gql`
  mutation createOwner($name: String!, $country: String!) {
    createOwner(input: { data: { name: $name, country: $country } }) {
      owner {
        id
      }
    }
  }
`;

export const DELETE_OWNER = gql`
  mutation deleteOwner($id: ID!) {
    deleteOwner(input: { where: { id: $id } }) {
      owner {
        id
      }
    }
  }
`;
