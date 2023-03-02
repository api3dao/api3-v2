import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Form, Row} from 'react-bootstrap';
import {uniq} from 'lodash';

type FruitSingle = {
  kind: string;
  name: string;
  colour: string;
  grower: string;
  sweetness: string;
  image: string;
};
type Fruit = FruitSingle[];

const fruit = require('./database/fruit.json') as Fruit;

function App() {
  const [filters, setFilters] = useState<FruitSingle>({
    colour: "",
    grower: "",
    image: "",
    kind: "",
    name: "",
    sweetness: ""
  });

  return (
    <div className="App">
      <div>
        <Row>
          <Col>
            <Form.Label>Kind</Form.Label>
            <Form.Select
            aria-label="Pick a Kind"
            onChange={(e) => {
              setFilters({...filters, kind: e.target.value});
            }}
            value={filters.kind}
          >
            {uniq(['all', ...fruit.map(fruit => fruit.kind)]).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Form.Select>
          </Col>
          <Col>
            <Form.Label>Name</Form.Label>
            <Form.Control onChange={(e) => {
              setFilters({...filters, name: e.target.value})
            }}
                          type="text" value={filters.name} placeholder="Enter text to search by"/>
          </Col>
        </Row>
      </div>
      <hr/>
      <div >
        <Row style={{'fontWeight': "bold"}}>
          <Col>
            Kind
          </Col>
          <Col>
            Name
          </Col>
          <Col>
            Colour
          </Col>
          <Col>
            Grower
          </Col>
          <Col>
            Sweetness
          </Col>
          <Col>
            Image
          </Col>
        </Row>
        <hr/>
        {fruit.filter(fruit => (fruit.kind.includes(filters.kind) || filters.kind === 'all') && JSON.stringify(fruit).includes(filters.name)).map(fruit => (
          <Row>
            <Col>{fruit.kind}</Col>
            <Col>{fruit.name}</Col>
            <Col>{fruit.colour}</Col>
            <Col>{fruit.grower}</Col>
            <Col>{fruit.sweetness}</Col>
            <Col><img height={'30em'} src={fruit.image} alt={'some fruit'}/></Col>
          </Row>))}
      </div>
    </div>
  );
}

export default App;
