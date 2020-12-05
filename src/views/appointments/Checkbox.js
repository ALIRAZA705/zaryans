import React from "react";
import { Row, Col } from "react-bootstrap";

export const CheckBox = (props) => {
  const eventStyleGetter = (event, start, end, isSelected) => {
    console.log("Event Style Box", event);
    var backgroundColor = "#" + event.hexColor;
    var style = {
      backgroundColor: event.backgroundColor,
      borderRadius: "0px",
      opacity: 0.8,
      color: "black",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  };
  return (
    <>
      <li
        className="list-group-item"
        style={{ backgroundColor: `${props.backgroundColor}` }}
      >
        <Row>
          <Col md="2" style={{ backgroundColor: `${props.backgroundColor}` }}>
            <div>
              <input
                key={props.id}
                onChange={props.handleCheckChildElement}
                type="checkbox"
                checked={props.isChecked}
                value={props.id}

                // className="form-control"
              />
            </div>
          </Col>
          <Col md="10" style={{ backgroundColor: `${props.backgroundColor}` }}>
            {props.name}
          </Col>
        </Row>
      </li>
    </>
  );
};

export default CheckBox;
