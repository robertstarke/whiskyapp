import { gql } from "@apollo/client";

export const DISTILLERIES_FOR_WHISKIES = gql`
  query Distilleries {
    distilleries {
      id
      name
    }
  }
`;

export const DISTILLERIES = gql`
  query Distilleries {
    distilleries {
      id
      name
      country
      region
      description
      owner {
        name
      }
    }
  }
`;

export const DISTILLERY_IDS = gql`
  query Distilleries {
    distilleries {
      id
    }
  }
`;

export const DISTILLERY = gql`
  query Distillery($id: ID!) {
    distillery(id: $id) {
      id
      name
      description
      country
      region
      whiskies {
        id
        name
      }
      owner {
        id
        name
        country
      }
    }
  }
`;

export const DISTILLERY_FOR_EDIT = gql`
  query Distillery($id: ID!) {
    distillery(id: $id) {
      id
      name
      country
      region
      description
      owner {
        id
      }
    }
  }
`;

export const ADD_DISTILLERY = gql`
  mutation createDistillery($name: String!, $description: String, $country: String!, $region: String, $owner: ID) {
    createDistillery(
      input: { data: { name: $name, description: $description, country: $country, region: $region, owner: $owner } }
    ) {
      distillery {
        id
      }
    }
  }
`;

export const EDIT_DISTILLERY = gql`
  mutation updateDistillery(
    $id: ID!
    $name: String!
    $description: String
    $country: String
    $region: String
    $owner: ID
  ) {
    updateDistillery(
      input: {
        where: { id: $id }
        data: { name: $name, description: $description, country: $country, region: $region, owner: $owner }
      }
    ) {
      distillery {
        id
      }
    }
  }
`;

export const DELETE_DISTILLERY = gql`
  mutation deleteDistillery($id: ID!) {
    deleteDistillery(input: { where: { id: $id } }) {
      distillery {
        id
      }
    }
  }
`;
