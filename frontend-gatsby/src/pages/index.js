import * as React from "react";
import { useStaticQuery, graphql as gql } from "gatsby";
import Layout from "../components/Layout";
import WhiskyCard from "../components/WhiskyCard";

// markup
const IndexPage = () => {
  const query = gql`
    query {
      strapi {
        whiskies {
          abv
          age
          id
          name
          rating
        }
      }
    }
  `;

  const data = useStaticQuery(query);

  return (
    <Layout>
      <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {data.strapi.whiskies.map((whisky) => {
          return <WhiskyCard key={whisky.id} whisky={whisky} />;
        })}
      </main>
    </Layout>
  );
};

export default IndexPage;
