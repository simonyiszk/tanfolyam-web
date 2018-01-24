import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import Checkbox from '../components/Checkbox';
import Container from '../components/Container';
import InputGroup from '../components/InputGroup';
import RadioButton from '../components/RadioButton';

const CoursesPage = ({ data }) => {
  const allTags = Object.entries(data.courses.edges.reduce((accumulator, { node: course }) => {
    // Count the global occurrence of each tag
    course.frontmatter.tags.forEach((tag) => {
      // eslint-disable-next-line no-param-reassign
      accumulator[tag] = (accumulator[tag] || 0) + 1;
    });
    return accumulator;
  }, {}))
    .sort(([tag1, occurrenceCount1], [tag2, occurrenceCount2]) =>
      // Sort tags by occurrence count (descending) and then by name (ascending)
      (occurrenceCount1 !== occurrenceCount2
        ? occurrenceCount2 - occurrenceCount1
        : tag1.localeCompare(tag2)))
    .map(([tag]) =>
      // Drop occurrence counts
      tag);

  return (
    <div>
      <Helmet title="Tanfolyamok" />

      {/* TODO: Hero image */}

      <Container>
        <h2>
          <span role="img" aria-label="egy halom könyv">
            📚
          </span>{' '}
          Tanfolyamjainkról
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>

        <h2>
          <span role="img" aria-label="nagyítóüveg">
            🔍
          </span>{' '}
          Keresés a tanfolyamok között
        </h2>
        <form>
          <InputGroup name="programme" legend="Milyen szakra jársz?">
            <RadioButton
              value="computerEngineering"
              label="Mérnökinformatikus"
            />
            <RadioButton value="electricalEngineering" label="Villamosmérnök" />
            <RadioButton value="other" label="Egyéb" />
          </InputGroup>

          <InputGroup name="startYear" legend="Melyik évben kezdtél?">
            <RadioButton value="2017" />
            <RadioButton value="2016" />
            <RadioButton value="2015" />
            <RadioButton value="other" label="Egyéb" />
          </InputGroup>

          <InputGroup
            name="searchTerms"
            legend="Milyen témakörök iránt érdeklődsz?"
          >
            {allTags.map(tag => <Checkbox value={tag} />)}
          </InputGroup>
        </form>
      </Container>
    </div>
  );
};

CoursesPage.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default CoursesPage;

export const query = graphql`
  query CoursesPageQuery {
    courses: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/courses/" } }
    ) {
      edges {
        node {
          frontmatter {
            title
            tags
          }
        }
      }
    }
  }
`;
