import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import pIcon from "../assets/icons/logo.png";

const Wrapper = styled.div`
  font-size: 2rem;
  font-weight: 100;
  color: rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  .report {
    color: #68b3eb;
    font-weight: 300;
  }

  .pLogo {
    display: inline-block;
    height: 1em;
    border: 1px solid #093043;
    margin-right: 0.5em;
  }
`;

const Logo = ({ className }) => {
  const classes = ["Logo"];
  if (className) classes.push(className);

  return (
    <Wrapper className={classes.join(" ")}>
      <img src={pIcon} className="pLogo" alt="Portchain" />
      <span className="report">RE-PORT</span>
      CHAIN
    </Wrapper>
  );
};

Logo.displayName = "Logo";

Logo.propTypes = {
  className: PropTypes.string
};

Logo.defaultProps = {
  className: null
};

export default Logo;
