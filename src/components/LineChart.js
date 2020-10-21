import React from "react";
import Chart from "chart.js";

export default ({ data, className, height = "50vh", options }) => {
  const canvasRef = React.useRef();
  const [chartObj, setChartObj] = React.useState();

  React.useEffect(() => {
    const tmpObj = new Chart(canvasRef.current, {
      type: "line",
      options: {
        maintainAspectRatio: false,
        onResize: () => tmpObj.update
      }
    });
    setChartObj(tmpObj);
  }, []);

  React.useEffect(() => {
    if (chartObj) {
      chartObj.data = data;
      chartObj.options = { ...chartObj.options, ...options };
      chartObj.update();
    }
  }, [chartObj, data, options]);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        height
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};
