/* eslint max-len:0 */

import React from "react";
import Moment from "moment";
import memoize from "memoize-one";

// import { format } from "d3-format";

import { TimeSeries, TimeRange, count } from "pondjs";

import {
  ChartContainer,
  ChartRow,
  Charts,
  YAxis,
  ScatterChart,
  Brush,
  Resizable
  // styler,
} from "react-timeseries-charts";

import { AscentGrades } from "../model/AscentGrades";

// const style = styler([
//   { key: "distance", color: "#e2e2e2" },
//   { key: "ascent", color: "#e2e2e2", width: 1, opacity: 0.5 },
//   { key: "count", color: "#111", width: 20, opacity: 1 },
//   { key: "cadence", color: "#ff47ff" },
//   { key: "power", color: "green", width: 1, opacity: 0.5 },
//   { key: "temperature", color: "#cfc793" },
//   { key: "speed", color: "steelblue", width: 1, opacity: 0.5 }
// ]);

const colors = {
  redpoint: "#f03c3c",
  flash: "#ffca10",
  onsight: "#333",
  toprope: "#666",
  attempt: "#fff"
};

const brushStyle = {
  // boxShadow: "inset 0px 2px 5px -2px rgba(189, 189, 189, 0.75)",
  // background: "#FEFEFE",
  paddingTop: 10
};

const timeAxisStyle = {
  values: { valueColor: "Green", valueWeight: 200, valueSize: 12 }
};

const YAxisStyle = {
  axis: { axisColor: "#C0C0C0" },
  label: { display: "none" },
  values: { valueSize: 12 }
};

const BrushYAxisStyle = {
  // label: {
  //   stroke: "none",
  //   fill: "#8B7E7E",
  //   fontWeight: 100,
  //   fontSize: 12,
  //   font: '"Goudy Bookletter 1911", sans-serif"'
  // },
  // values: {
  //   stroke: "none",
  //   fill: "#8B7E7E",
  //   fontWeight: 100,
  //   fontSize: 11,
  //   font: '"Goudy Bookletter 1911", sans-serif"'
  // },
  // ticks: { fill: "none", stroke: "none" },
  // axis: { fill: "none", stroke: "#C0C0C0" }
};

let ScatterPointsStyle = {
  fill: "black",
  stroke: "#00000036",
  opacity: 0.8
};

ScatterPointsStyle = {
  normal: ScatterPointsStyle,
  highlighted: ScatterPointsStyle,
  selected: ScatterPointsStyle,
  muted: ScatterPointsStyle
};

const perEventStyle = (column, event) => {
  let ascent = event.get("ascent");
  const color = colors[ascent.method.shorthand];
  return {
    normal: {
      fill: color,
      stroke: "#00000036",
      opacity: 0.8
    },
    highlighted: {
      fill: color,
      stroke: "#00000036",
      strokeWidth: 5,
      opacity: 0.8
    },
    selected: {
      fill: color,
      stroke: "#00000036",
      strokeWidth: 3,
      opacity: 1
    },
    muted: {
      fill: color,
      stroke: "none",
      opacity: 0.4
    }
  };
};

class AscentChart extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      hover: null,
      highlight: null,
      selection: null,
      timeRange: null
    };
    
    console.log("AscentChart: ", props);
  }
  getChartData = () =>
    this.getMemoizedChartData(this.props.ascents, this.props.ascentMethodIds);

  // Re-run the function whenever arguments change:
  getMemoizedChartData = memoize((ascents, ascentMethodIds) => {
    console.log('caculateSeries')

    const chartSeries = new TimeSeries({
      name: "Ascents",
      columns: ["time", "ascent"],
      points: ascents
        .filter(ascent => ascentMethodIds.includes(ascent.method.id))
        .map(ascent => [new Moment(ascent.date).toDate().getTime(), ascent])
    });

    if (!chartSeries || !chartSeries.range()) {
      return {};
    }

    console.log("chartSeries", chartSeries.toJSON());

    let begin = Moment(chartSeries.range().begin());
    let end = Moment(chartSeries.range().end());

    // add some padding so all points will always fit the chart
    let diff = end.diff(begin, "days");
    begin = begin.subtract(diff * 0.025, "days").toDate();
    end = end.add(diff * 0.025, "days").toDate();

    // And start the chart at that range
    const chartTotalTimeRange = new TimeRange([begin.getTime(), end.getTime()]);

    return {
      chartSeries,
      chartTotalTimeRange,
      begin,
      end
    };
  });

  // Handles when the brush changes the timerange
  handleTimeRangeChange = timerange => {
    this.setState({ timerange, brushrange: timerange });
  };

  handleSelectionChanged = point => this.setState({ selection: point });
  handleMouseNear = point => this.setState({ highlight: point });

  getGradeLabel = value => {
    const { ascentTypeShortHand } = this.props;
    const grade = AscentGrades[value];
    if (grade) {
      return grade.labels.fra[ascentTypeShortHand];
    }
    console.error("unknown grade!", value);
    return "";
  };

  render() {
    const { highlight, timerange, brushrange } = this.state;
    const {
      chartSeries,
      chartTotalTimeRange,
      begin,
      end
    } = this.getChartData();

    let infoValues = [];
    if (highlight) {
      let ascent = highlight.event.get("ascent");
      infoValues = [
        {
          label: `${ascent.cragname} - ${ascent.name}`,
          value: `${ascent.grade.labels.fra.routes} ${ascent.method.shorthand}`
        }
      ];
    }

    return (
      <div>
        <div>
          {!chartSeries && <div>No ascents to show</div>}
          {chartSeries && (
            <div>
              <div>
                <Resizable>
                  <ChartContainer
                    timeRange={timerange || chartTotalTimeRange}
                    timeAxisStyle={timeAxisStyle}
                    maxTime={end}
                    minTime={begin}
                    enablePanZoom={true}
                    onTimeRangeChanged={this.handleTimeRangeChange}
                  >
                    <ChartRow height="400" debug={false}>
                      <YAxis
                        id="gradesY"
                        min={chartSeries.min("ascent.grade.id") - 2}
                        max={chartSeries.max("ascent.grade.id") + 2}
                        style={YAxisStyle}
                        width="0"
                        format={this.getGradeLabel}
                      />
                      <Charts>
                        <ScatterChart
                          axis="gradesY"
                          series={chartSeries}
                          columns={["ascent.grade.id"]}
                          style={perEventStyle}
                          info={infoValues}
                          infoTimeFormat={e => e.toLocaleDateString()}
                          infoHeight={28}
                          infoWidth={400}
                          infoStyle={{
                            fill: "black",
                            color: "#DDD"
                          }}
                          ScatterChart
                          selected={this.state.selection}
                          // onSelectionChange={p => this.handleSelectionChanged(p)}
                          onMouseNear={p => this.handleMouseNear(p)}
                          highlight={this.state.highlight}
                          radius={8}
                        />
                      </Charts>
                    </ChartRow>
                  </ChartContainer>
                </Resizable>
              </div>
              <div>
                <div style={brushStyle}>
                  <Resizable>
                    <ChartContainer
                      timeRange={chartTotalTimeRange}
                      timeAxisStyle={timeAxisStyle}
                      hideTimeAxis={false}
                    >
                      <ChartRow height="50" debug={false}>
                        <Brush
                          timeRange={brushrange || chartTotalTimeRange}
                          onTimeRangeChanged={this.handleTimeRangeChange}
                        />
                        <YAxis
                          id="brushY"
                          max={chartSeries.max("ascent.grade.id")}
                          min={chartSeries.min("ascent.grade.id")}
                          visible={false}
                          style={BrushYAxisStyle}
                        />
                        <Charts>
                          <ScatterChart
                            axis="brushY"
                            series={chartSeries}
                            columns={["ascent.grade.id"]}
                            style={() => ScatterPointsStyle}
                            info={infoValues}
                            infoHeight={28}
                            infoWidth={110}
                            infoStyle={{
                              fill: "black",
                              color: "#DDD"
                            }}
                            format=".1f"
                          />
                        </Charts>
                      </ChartRow>
                    </ChartContainer>
                  </Resizable>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AscentChart;
