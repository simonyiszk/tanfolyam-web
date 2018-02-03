import flatten from 'lodash.flatten';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './Course.module.scss';

const Course = ({
  title,
  society,
  occasions,
  moreInfoURL,
  applicationFormURL,
  tags,
  descriptionHTML,
  ...props
}) => {
  // An `endDate` shall only be specified along with a `startDate`
  const occasionTexts = occasions
    .filter(occasion => occasion.startDate != null)
    .map((occasion) => {
      let result = occasion.startDate;

      if (occasion.endDate != null) {
        result += ` – ${occasion.endDate}`;
      }

      if (occasion.location != null) {
        result += ` (${occasion.location})`;
      }

      return result;
    });

  const instructorTexts = Array.from(new Set(flatten(occasions
    .filter(occasion => occasion.instructors != null)
    .map(occasion => occasion.instructors))));

  return (
    <article {...props}>
      <div className={styles.metadataContainer}>
        <div>
          <h3>{title}</h3>

          <ul className={styles.metadataList}>
            {occasionTexts.length > 0 && (
              <li className={styles.occasions}>
                <span
                  aria-label={`${
                    occasionTexts.length === 1 ? 'Alkalom' : 'Alkalmak'
                  }: `}
                />
                {occasionTexts.join(', ')}
              </li>
            )}

            {instructorTexts.length > 0 && (
              <li className={styles.instructors}>
                <span
                  aria-label={`${
                    instructorTexts.length === 1 ? 'Oktató' : 'Oktatók'
                  }: `}
                />
                {instructorTexts.join(', ')}
              </li>
            )}

            {society.website != null && (
              <li className={styles.societyWebsite}>
                <span aria-label="A kör weboldala: " />
                <a
                  href={society.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* Show the URL without protocol */}
                  {society.website.replace(/(^\w+:|^)\/\//, '')}
                </a>
              </li>
            )}
          </ul>
        </div>

        <img
          src={society.logo.publicURL}
          alt={`${society.id} logó`}
          className={styles.societyLogo}
        />
      </div>

      <div
        className={styles.description}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: descriptionHTML }}
      />
      {/*
      <div
        className={css`
          display: flex;
          justify-content: flex-end;
        `}
      >
        <a
          href={node.frontmatter.applicationFormURL}
          target="_blank"
          rel="noopener noreferrer"
          role="button"
          className={css`
            display: inline-block;
            border: 0.2rem black solid;
            padding: 0.8em;
            text-align: center;
            color: inherit;
            font-weight: bold;
            text-decoration: none;

            & :hover {
              text-decoration: none;
            }
          `}
        >
          Jelentkezés
        </a>
      </div>
          */}
    </article>
  );
};

Course.propTypes = {
  title: PropTypes.string.isRequired,
  society: PropTypes.shape({}).isRequired,
  occasions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  moreInfoURL: PropTypes.string.isRequired,
  applicationFormURL: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  descriptionHTML: PropTypes.string.isRequired,
};

export default Course;
