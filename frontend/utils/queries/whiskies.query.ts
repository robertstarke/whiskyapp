import { gql } from "@apollo/client";

export const WHISKIES = gql`
  query Whiskies {
    whiskies {
      id
      name
      age
      rating
      distillery {
        id
        country
      }
    }
  }
`;

export const WHISKY_IDS = gql`
  query Whiskies {
    whiskies {
      id
    }
  }
`;

export const WHISKY = gql`
  query Whisky($id: ID!) {
    whisky(id: $id) {
      id
      name
      age
      abv
      rating
      distillery {
        id
        name
        description
        country
        region
        owner {
          id
          name
          country
        }
      }
      taste_notes {
        id
        name
      }
      characteristics {
        id
        name
      }
    }
  }
`;

export const WHISKY_FOR_EDIT = gql`
  query Whisky($id: ID!) {
    whisky(id: $id) {
      id
      name
      age
      abv
      rating
      distillery {
        id
      }
      taste_notes {
        id
      }
      characteristics {
        id
      }
    }
  }
`;

export const ADD_WHISKY = gql`
  mutation createWhisky(
    $name: String!
    $age: String!
    $abv: Float
    $rating: Float
    $distillery: ID
    $characteristics: [ID]
    $tasteNotes: [ID]
  ) {
    createWhisky(
      input: {
        data: {
          name: $name
          age: $age
          abv: $abv
          rating: $rating
          distillery: $distillery
          characteristics: $characteristics
          taste_notes: $tasteNotes
        }
      }
    ) {
      whisky {
        id
      }
    }
  }
`;

export const EDIT_WHISKY = gql`
  mutation updateWhisky(
    $id: ID!
    $name: String!
    $age: String!
    $abv: Float
    $rating: Float
    $distillery: ID
    $characteristics: [ID]
    $tasteNotes: [ID]
  ) {
    updateWhisky(
      input: {
        where: { id: $id }
        data: {
          name: $name
          age: $age
          abv: $abv
          rating: $rating
          distillery: $distillery
          characteristics: $characteristics
          taste_notes: $tasteNotes
        }
      }
    ) {
      whisky {
        id
      }
    }
  }
`;

export const DELETE_WHISKY = gql`
  mutation deleteWhisky($id: ID!) {
    deleteWhisky(input: { where: { id: $id } }) {
      whisky {
        id
      }
    }
  }
`;
