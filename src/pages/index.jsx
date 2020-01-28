// import uuidv4 from 'uuid/v4';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import Select from 'react-select';
import Layout from '../components/layout';
import Container from '../components/Container';
import MultipleChoiceInputGroup from '../components/MultipleChoiceInputGroup';
import Course from '../components/Course';
import RadioButton from '../components/RadioButton';
import Checkbox from '../components/Checkbox';
import styles from './index.module.scss';

// const sessionID = uuidv4();

class CoursesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchTermsChange = this.handleSearchTermsChange.bind(this);

    const { data } = props;

    this.allTags = Array.from(
      data.courses.edges.reduce((accumulator, { node }) => {
        // Count the global occurrence of each tag
        node.frontmatter.tags.forEach(tag => {
          accumulator.set(tag, (accumulator.get(tag) || 0) + 1);
        });
        return accumulator;
      }, new Map()),
    )
      .sort(([tag1, occurrenceCount1], [tag2, occurrenceCount2]) =>
        // Sort tags by occurrence count (descending) and then by name (ascending)
        occurrenceCount1 !== occurrenceCount2
          ? occurrenceCount2 - occurrenceCount1
          : tag1.localeCompare(tag2),
      )
      .map(
        ([tag]) =>
          // Drop occurrence counts
          tag,
      );
  }
  /*
  componentDidUpdate(prevProps, prevState) {
    const { programme, startYear, searchTerms, showAll } = this.state;

    const searchTermValues = searchTerms.map(({ value }) => value);

    if (
      this.isFormFilledOut() &&
      (prevState.programme !== programme ||
        prevState.startYear !== startYear ||
        prevState.searchTerms !== searchTerms ||
        prevState.showAll !== showAll)
    ) {
      fetch('https://tanfolyam.kir-dev.sch.bme.hu', {
        method: 'POST',
        body: JSON.stringify({
          programme,
          startYear,
          searchTerms: searchTermValues,
          sessionID,
        }),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      }).catch(() => {});
    }
  } */

  handleInputChange(event) {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  handleSearchTermsChange(value) {
    this.setState({
      searchTerms: value,
    });
  }

  isFormFilledOut() {
    const { programme, startYear, searchTerms, showAll } = this.state;

    return (
      programme != null &&
      startYear != null &&
      (searchTerms.length !== 0 || showAll)
    );
  }

  render() {
    const { data } = this.props;
    const { filters } = this.state;

    return (
      <Layout>
        <Container>
          <Helmet title="Tanfolyamok" />

          <div>
            <h2>
              <span role="img" aria-label="egy halom könyv">
                📚
              </span>{' '}
              Tanfolyamainkról
            </h2>

            <p>
              A Villamosmérnöki és Informatikai Karon működő Simonyi Károly
              Szakkollégium ebben a félévben is rengeteg lehetőséget kínál
              azoknak, akik szabadidejükben szívesen foglalkoznak szakmai
              tevékenységekkel. A nálunk zajló munkába legkönnyebben egy
              tanfolyam elvégzésével tudsz becsatlakozni. Az oldalon a
              szakkollégium összes induló tanfolyama között böngészhetsz az
              érdeklődésed alapján, ehhez töltsd ki az űrlapot! Érdemes minél
              több témakört kiválasztanod, hogy a számodra legmegfelelőbb
              kurzust találd meg. Ne felejts el jelentkezni és találkozzunk a
              képzésen!
            </p>
          </div>

          <div>
            <h2>
              <span role="img" aria-label="ötlet">
                💡
              </span>{' '}
              Ajánlott tanfolyamok
            </h2>

            <div className={styles.gappyContainer}>
              {data.courses.edges
                /* .filter(({ node }) =>
                  // Show every course which has at least one of the desired tags
                  showAll
                    ? true
                    : node.frontmatter.tags.some(tag =>
                        searchTermValues.includes(tag),
                      ),
                )
                .sort((a, b) => {
                  // Sort results by relevance
                  // TODO: Improve performance
                  const node1Relevance = a.node.frontmatter.tags.reduce(
                    (accumulator, tag) =>
                      accumulator + (searchTermValues.includes(tag) ? 1 : 0),
                    0,
                  );
                  const node2Relevance = b.node.frontmatter.tags.reduce(
                    (accumulator, tag) =>
                      accumulator + (searchTermValues.includes(tag) ? 1 : 0),
                    0,
                  );
                  return node2Relevance - node1Relevance;
                }) */
                .map(({ node }) => (
                  <Course
                    key={`${node.frontmatter.society.id}__${node.frontmatter.title}`}
                    title={node.frontmatter.title}
                    society={node.frontmatter.society}
                    occasions={node.frontmatter.occasions}
                    moreInfoURL={node.frontmatter.moreInfoURL}
                    applicationFormURL={node.frontmatter.applicationFormURL}
                    tags={node.frontmatter.tags}
                    descriptionHTML={node.html}
                  />
                ))}
            </div>
          </div>
        </Container>
      </Layout>
    );
  }
}

CoursesPage.propTypes = {
  data: PropTypes.shape({
    courses: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({}).isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
  }).isRequired,
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
            society {
              id
              logo {
                publicURL
              }
              website
            }
            occasions {
              dateText
              startDate(formatString: "MMMM Do LT", locale: "hu")
              endDate(formatString: "LT", locale: "hu")
              location
              instructors
            }
            moreInfoURL
            applicationFormURL
            tags
          }
          html
        }
      }
    }
  }
`;
