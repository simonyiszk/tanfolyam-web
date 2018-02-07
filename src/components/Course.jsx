import flatten from 'lodash.flatten';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './Course.module.scss';
import LinkButton from './LinkButton';

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
    .filter(occasion => occasion.dateText != null || occasion.startDate != null)
    .map((occasion) => {
      if (occasion.dateText != null) {
        return <div key={occasion.dateText}>{occasion.dateText}</div>;
      }

      let result = occasion.startDate;

      if (occasion.endDate != null) {
        result += ` – ${occasion.endDate}`;
      }

      if (occasion.location != null) {
        result += ` (${occasion.location})`;
      }

      return <div key={result}>{result}</div>;
    });

  const instructorTexts = Array.from(new Set(flatten(occasions
    .filter(occasion => occasion.instructors != null)
    .map(occasion => occasion.instructors))));

  return (
    <article {...props}>
      <div className={styles.metadataContainer}>
        <div>
          <h3 className={styles.title}>{title}</h3>

          <ul className={styles.metadataList}>
            {occasionTexts.length > 0 && (
              <li className={styles.occasions}>
                <span
                  aria-label={`${
                    occasionTexts.length === 1 ? 'Alkalom' : 'Alkalmak'
                  }: `}
                />
                {occasionTexts}
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

        <div className={styles.societyLogoContainer}>
          <img
            src={society.logo.publicURL}
            alt={`${society.id} logó`}
            className={styles.societyLogo}
          />
        </div>
      </div>

      <div
        className={styles.description}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: descriptionHTML }}
      />

      <div className={styles.buttonsContainer}>
        {moreInfoURL && (
          <LinkButton
            href={moreInfoURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            További információ
          </LinkButton>
        )}

        {applicationFormURL && (
          <LinkButton
            href={applicationFormURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Jelentkezés
          </LinkButton>
        )}
      </div>
    </article>
  );
};

Course.propTypes = {
  title: PropTypes.string.isRequired,
  society: PropTypes.shape({}).isRequired,
  occasions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  moreInfoURL: PropTypes.string,
  applicationFormURL: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  descriptionHTML: PropTypes.string.isRequired,
};

Course.defaultProps = {
  moreInfoURL: '',
  applicationFormURL: '',
};

export default Course;
