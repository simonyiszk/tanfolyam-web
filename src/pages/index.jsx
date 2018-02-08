import uuidv4 from 'uuid/v4';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Container from '../components/Container';
import MultipleChoiceInputGroup from '../components/MultipleChoiceInputGroup';
import Course from '../components/Course';
import RadioButton from '../components/RadioButton';
import Checkbox from '../components/Checkbox';
import styles from './index.module.scss';

const sessionID = uuidv4();

class CoursesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      programme: null,
      startYear: null,
      searchTerms: [],
      showAll: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchTermsChange = this.handleSearchTermsChange.bind(this);

    const { data } = props;

    this.allTags = Array.from(data.courses.edges.reduce((accumulator, { node }) => {
      // Count the global occurrence of each tag
      node.frontmatter.tags.forEach((tag) => {
        accumulator.set(tag, (accumulator.get(tag) || 0) + 1);
      });
      return accumulator;
    }, new Map()))
      .sort(([tag1, occurrenceCount1], [tag2, occurrenceCount2]) =>
        // Sort tags by occurrence count (descending) and then by name (ascending)
        (occurrenceCount1 !== occurrenceCount2
          ? occurrenceCount2 - occurrenceCount1
          : tag1.localeCompare(tag2)))
      .map(([tag]) =>
        // Drop occurrence counts
        tag);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      programme, startYear, searchTerms, showAll,
    } = this.state;

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
  }

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
    const {
      programme, startYear, searchTerms, showAll,
    } = this.state;

    return (
      programme != null &&
      startYear != null &&
      (searchTerms.length !== 0 || showAll)
    );
  }

  render() {
    const { data } = this.props;
    const { allTags } = this;
    const {
      programme, startYear, searchTerms, showAll,
    } = this.state;

    const searchTermValues = searchTerms.map(({ value }) => value);

    return (
      <Container>
        <Helmet title="Tanfolyamok" />

        <div className={styles.gappyContainer}>
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
              <span role="img" aria-label="nagyítóüveg">
                🔍
              </span>{' '}
              Keresés a tanfolyamok között
            </h2>

            <form className={styles.searchForm}>
              <fieldset>
                <legend>Milyen szakra jársz?</legend>

                <MultipleChoiceInputGroup
                  name="programme"
                  onChange={this.handleInputChange}
                >
                  <RadioButton
                    value="computerEngineering"
                    checked={programme === 'computerEngineering'}
                    label="Mérnökinformatikus"
                  />
                  <RadioButton
                    value="electricalEngineering"
                    checked={programme === 'electricalEngineering'}
                    label="Villamosmérnök"
                  />
                  <RadioButton
                    value="other"
                    checked={programme === 'other'}
                    label="Egyéb"
                  />
                </MultipleChoiceInputGroup>
              </fieldset>

              <fieldset>
                <legend>Melyik évben kezdtél?</legend>

                <MultipleChoiceInputGroup
                  name="startYear"
                  onChange={this.handleInputChange}
                >
                  <RadioButton value="2017" checked={startYear === '2017'} />
                  <RadioButton value="2016" checked={startYear === '2016'} />
                  <RadioButton value="2015" checked={startYear === '2015'} />
                  <RadioButton
                    value="other"
                    checked={startYear === 'other'}
                    label="Egyéb"
                  />
                </MultipleChoiceInputGroup>
              </fieldset>

              <fieldset>
                <legend>Milyen témakörök iránt érdeklődsz?</legend>

                <Select
                  multi
                  options={allTags.map(tag => ({ value: tag, label: tag }))}
                  value={searchTerms}
                  clearAllText="Összes törlése"
                  clearValueText="Érték törlése"
                  noResultsText="Nincs találat"
                  placeholder="Válassz…"
                  searchPromptText="Írj a kereséshez"
                  onChange={this.handleSearchTermsChange}
                />
                <div className={styles.showAllBox}>
                  <Checkbox
                    name="showAll"
                    onChange={this.handleInputChange}
                    value="showAllCourse"
                    checked={showAll}
                    label="Mutass mindent"
                  />
                </div>
              </fieldset>
            </form>
          </div>
        </div>

        <div>
          <h2>
            <span role="img" aria-label="ötlet">
              💡
            </span>{' '}
            Ajánlott tanfolyamok
          </h2>

          {!this.isFormFilledOut() ? (
            <p className={styles.missingSearchFormDataText}>
              Kérlek, töltsd ki a keresési űrlap összes mezőjét!
            </p>
          ) : (
            <div className={styles.gappyContainer}>
              {data.courses.edges
                .filter(({ node }) =>
                    // Show every course which has at least one of the desired tags
                    (showAll
                      ? true
                      : node.frontmatter.tags.some(tag =>
                          searchTermValues.includes(tag))))
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
                })
                .map(({ node }) => (
                  <Course
                    key={`${node.frontmatter.society.id}__${
                      node.frontmatter.title
                    }`}
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
          )}
        </div>
      </Container>
    );
  }
}

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
