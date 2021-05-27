import { gql } from "@apollo/client";

export const TASTE_NOTES_FOR_WHISKIES = gql`
    query tasteNotes {
        tasteNotes {
            id
            name
        }
    }
`;
