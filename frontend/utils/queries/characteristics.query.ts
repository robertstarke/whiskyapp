import { gql } from "@apollo/client";

export const CHARACTERISTICS_FOR_WHISKIES = gql`
    query characteristics {
        characteristics {
            id
            name
        }
    }
`;
