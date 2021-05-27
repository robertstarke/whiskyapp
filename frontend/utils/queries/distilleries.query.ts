import { gql } from "@apollo/client";

export const DISTILLERIES_FOR_WHISKIES = gql`
    query Distilleries {
        distilleries {
            id
            name
        }
    }
`;
