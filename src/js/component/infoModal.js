// components/Modal.js
import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";

export const InfoModal = ({ show, onHide, item, type }) => {
  const getContent = () => {
    switch (type) {
      case "character":
        return (
          <Row>
            <Col md={4}>
              <img
                src={`https://starwars-visualguide.com/assets/img/characters/${item.uid}.jpg`}
                className="modal-img"
                alt={item.properties.name}
                style={{ width: "100%", height: "auto" }}
              />
            </Col>
            <Col md={8}>
              <h4>{item.properties.name}</h4>
              <p>Gender: {item.properties.gender}</p>
              <p>Birth Year: {item.properties.birth_year}</p>
              <p>Homeworld: {item.properties.homeworld}</p>
              <p>Eye Color: {item.properties.eye_color}</p>
              <p>Hair Color: {item.properties.hair_color}</p>
              <p>Skin Color: {item.properties.skin_color}</p>
              <p>Height: {item.properties.height}</p>
            </Col>
          </Row>
        );
      case "planet":
        return (
          <Row>
            <Col md={4}>
              <img
                src={`https://starwars-visualguide.com/assets/img/planets/${item.uid}.jpg`}
                className="modal-img"
                alt={item.properties.name}
                style={{ width: "100%", height: "auto" }}
              />
            </Col>
            <Col md={8}>
              <h4>{item.properties.name}</h4>
              <p>Climate: {item.properties.climate}</p>
              <p>Population: {item.properties.population}</p>
              <p>Diameter: {item.properties.diameter}</p>
              <p>Gravity: {item.properties.gravity}</p>
              <p>Terrain: {item.properties.terrain}</p>
            </Col>
          </Row>
        );
      case "vehicle":
        return (
          <Row>
            <Col md={4}>
              <img
                src={`https://starwars-visualguide.com/assets/img/vehicles/${item.uid}.jpg`}
                className="modal-img"
                alt={item.properties.name}
                style={{ width: "100%", height: "auto" }}
              />
            </Col>
            <Col md={8}>
              <h4>{item.properties.name}</h4>
              <p>Model: {item.properties.model}</p>
              <p>Vehicle Class: {item.properties.vehicle_class}</p>
              <p>Manufacturer: {item.properties.manufacturer}</p>
              <p>Crew: {item.properties.crew}</p>
              <p>Passengers: {item.properties.passengers}</p>
              <p>Cargo Capacity: {item.properties.cargo_capacity}</p>
            </Col>
          </Row>
        );
      default:
        return null;
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{item.properties.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{getContent()}</Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
