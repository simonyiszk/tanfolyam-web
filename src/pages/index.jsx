import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../components/layout';
import Container from '../components/Container';
import Course from '../components/Course';
import Checkbox from '../components/Checkbox';
import styles from './index.module.scss';
import Book from '../data/icons/book.svg';
import Bulb from '../data/icons/idea.svg';

class CoursesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [],
    };

    this.handleFilterChange = this.handleFilterChange.bind(this);

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

  handleFilterChange(event) {
    const { checked, value } = event.target;

    if (checked) {
      this.setState(prevState => ({
        filters: [...prevState.filters, value],
      }));
    } else {
      this.setState(prevState => ({
        filters: prevState.filters.filter(n => n !== value),
      }));
    }
  }

  render() {
    const { data } = this.props;
    const { allTags } = this;
    const { filters } = this.state;

    return (
      <Layout>
        <Container>
          <Helmet title="Tanfolyamok" />

          <div>
            <h2 className={styles.headerContainer}>
              <div className={styles.headerImageContainer}>
                <img src={Book} alt="Tanfolyamok" />
              </div>
              <div>Tanfolyamainkról</div>
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
            <h2 className={styles.headerContainer}>
              <div className={styles.headerImageContainer}>
                <img src={Bulb} alt="Tanfolyamok" />
              </div>
              <div>Ajánlott tanfolyamok</div>
            </h2>

            <div className={styles.buttonContainer}>
              {allTags.map(t => (
                <Checkbox key={t} value={t} onClick={this.handleFilterChange} />
              ))}
            </div>

            <div className={styles.gappyContainer}>
              {data.courses.edges
                .filter(({ node }) =>
                  // Show every course which has at least one of the desired tags
                  filters.length === 0
                    ? true
                    : node.frontmatter.tags.some(tag => filters.includes(tag)),
                )
                /* .sort((a, b) => {
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
