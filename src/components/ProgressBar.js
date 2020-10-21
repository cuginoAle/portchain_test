import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  .value {
    flex-shrink: 0;
    text-align: center;
    width: 3em;
    font-weight: bold;
  }
  .barWrapper {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 3px;
    position: relative;
    height: 1em;
    flex-grow: 1;
  }
  .bar {
    background-color: #1c93eb;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    position: absolute;
    left: 0px;
    top: 0px;
    bottom: 0px;
    width: ${({ perc }) => perc}%;
  }
`;

const ProgressBar = ({ className, max, value }) => {
  const classes = ["ProgressBar"];
  if (className) classes.push(className);

  return (
    <Wrapper className={classes.join(" ")} perc={(value * 100) / max}>
      <div className="barWrapper">
        <div className="bar" />
      </div>
      <p className="value">{value}</p>
    </Wrapper>
  );
};

ProgressBar.displayName = "ProgressBar";

ProgressBar.propTypes = {
  className: PropTypes.string,
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

ProgressBar.defaultProps = {
  className: null
};

export default ProgressBar;
