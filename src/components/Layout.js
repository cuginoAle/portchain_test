import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 20px;
`;

const Layout = ({ className, children }) => {
  const classes = ["Layout"];
  if (className) classes.push(className);

  return <Wrapper className={classes.join(" ")}>{children}</Wrapper>;
};

Layout.displayName = "Layout";

Layout.propTypes = {
  className: PropTypes.string
};

Layout.defaultProps = {
  className: null
};

export default Layout;
