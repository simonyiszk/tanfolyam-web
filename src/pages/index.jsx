import React from 'react';
import Helmet from 'react-helmet';
import Container from '../components/Container';
import InputGroup from '../components/InputGroup';
import RadioButton from '../components/RadioButton';

const CoursesPage = () => (
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </p>

      <h2>
        <span role="img" aria-label="nagyítóüveg">
          🔍
        </span>{' '}
        Keresés a tanfolyamok között
      </h2>
      <form>
        <InputGroup name="programme" legend="Milyen szakra jársz?">
          <RadioButton value="computerEngineering" label="Mérnökinformatikus" />
          <RadioButton value="electricalEngineering" label="Villamosmérnök" />
          <RadioButton value="other" label="Egyéb" />
        </InputGroup>

        <InputGroup name="startYear" legend="Melyik évben kezdtél?">
          <RadioButton value="2017" />
          <RadioButton value="2016" />
          <RadioButton value="2015" />
          <RadioButton value="other" label="Egyéb" />
        </InputGroup>

        <h3>Milyen témakörök iránt érdeklődsz?</h3>
        <div>TODO</div>
      </form>
    </Container>
  </div>
);

export default CoursesPage;
