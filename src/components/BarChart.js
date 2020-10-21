import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ProgressBar from "components/ProgressBar";

const Wrapper = styled.div`
  .row {
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
    .rowLabel {
      line-height: 1.2;
    }
  }
  h2 {
    margin-bottom: 1rem;
  }
`;

const BarChart = ({ className, dataRows, max, title }) => {
  const classes = ["BarChart"];
  if (className) classes.push(className);

  const maxValue = max || Math.max(...dataRows.map(d => d.value));

  return (
    <Wrapper className={classes.join(" ")}>
      <h2>{title}</h2>
      <ul>
        {!dataRows?.length && "loading..."}

        {dataRows &&
          dataRows.map(row => (
            <li key={row.id} className="row">
              <p className="rowLabel">{row.label}</p>
              <ProgressBar max={maxValue} value={row.value} />
            </li>
          ))}
      </ul>
    </Wrapper>
  );
};

BarChart.displayName = "BarChart";

BarChart.propTypes = {
  className: PropTypes.string,
  dataRows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  max: PropTypes.number
};

BarChart.defaultProps = {
  className: null,
  max: null
};

export default BarChart;
