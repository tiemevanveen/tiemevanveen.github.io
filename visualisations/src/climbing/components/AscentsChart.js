/* eslint max-len:0 */

import React from "react";
import Moment from "moment";
// import { format } from "d3-format";

import { TimeSeries, TimeRange, count } from "pondjs";

import {
  ChartContainer,
  ChartRow,
  Charts,
  YAxis,

  ScatterChart,
  Brush,

  Resizable,
  // styler,
} from "react-timeseries-charts";

import { getNamesArrayFromBitMask } from "../utils/bitmaskUtils";
import { AscentMethods } from "../model/AscentMethods";
import { AscentNotes } from "../model/AscentNotes";
import fetchAscents from "../utils/fetchAscents";
import transformAscents from "../utils/transformAscents";
import { AscentGradeMapping, AscentGrades } from "../model/AscentGrades";

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

class AscentsChart extends React.Component {
  constructor(props) {
    super(props);

    const { ascents } = props;

    const points = ascents.map(ascent => [
      new Moment(ascent.date).toDate().getTime(),
      ascent
    ]);

    const ascentsPerDay = Object.entries(
      ascents.reduce((res, ascent) => {
        const day = new Moment(ascent.date).format("YYYY-MM-DD");
        return { ...res, [day]: res[day] ? res[day] + 1 : 1 };
      }, {})
    )
      .map(([date, count]) => [new Moment(date).toDate().getTime(), count])
      .sort(([dateA], [dateB]) => (dateA < dateB ? -1 : dateA > dateB ? 1 : 0));

    console.log("ascentsPerDay", ascentsPerDay[0]);
    console.log("points", points[0]);

    const series = new TimeSeries({
      name: "Gust",
      columns: ["time", "ascent"],
      points
    });

    const dailySeries = series.fixedWindowRollup({
      windowSize: "3d",
      aggregation: { count: { ascent: count() } }
    });

    console.log("series", series.toJSON());
    console.log("dailySeries", dailySeries.toJSON());

    let begin = Moment(series.range().begin());
    let end = Moment(series.range().end());
    let diff = end.diff(begin, "days");
    begin = begin.subtract(diff * 0.025, "days").toDate();
    end = end.add(diff * 0.025, "days").toDate();
    const startRange = new TimeRange([begin.getTime(), end.getTime()]);

    this.state = {
      series,
      dailySeries,
      startRange,
      timerange: startRange,
      brushrange: startRange,
      begin,
      end,
      hover: null,
      highlight: null,
      selection: null,
    };
  }

  // Handles when the brush changes the timerange
  handleTimeRangeChange = timerange => {
    if (timerange) {
      this.setState({ timerange, brushrange: timerange });
    } else {
      this.setState({ timerange: this.state.startRange, brushrange: this.state.startRange });
    }
  };

  handleSelectionChanged = point => this.setState({ selection: point });
  handleMouseNear = point => this.setState({ highlight: point });

  render() {
    const {
      startRange,
      series,
      dailySeries,
      begin,
      end,
      highlight
    } = this.state;


    let infoValues = [];
    if (highlight) {
      let ascent = highlight.event.get("ascent");
      infoValues = [{
        label: `${ascent.cragname} - ${ascent.name}`,
        value: `${ascent.grade.labels.fra.routes} ${
          ascent.isTry ? "attempt" : ascent.method.shorthand
          }`
      }];
    }

    const brushStyle = {
      // boxShadow: "inset 0px 2px 5px -2px rgba(189, 189, 189, 0.75)",
      // background: "#FEFEFE",
      paddingTop: 10
    };

    const perEventStyle = (column, event) => {
      let ascent = event.get("ascent");
      const color = colors[ascent.isTry ? "attempt" : ascent.method.shorthand];
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
    }

    ScatterPointsStyle = {
      normal: ScatterPointsStyle,
      highlighted: ScatterPointsStyle,
      selected: ScatterPointsStyle,
      muted: ScatterPointsStyle
    }

    return (
      <div>
        <div>
          <div>
            <Resizable>
              <ChartContainer
                timeRange={this.state.timerange}
                timeAxisStyle={timeAxisStyle}
                maxTime={end}
                minTime={begin}
                enablePanZoom={true}
                onTimeRangeChanged={this.handleTimeRangeChange}
              >
                <ChartRow height="400" debug={false}>
                  <YAxis
                    id="gradesY"
                    min={series.min("ascent.grade.id") - 2}
                    max={series.max("ascent.grade.id") + 2}
                    style={YAxisStyle}
                    width="0"
                    format={val => AscentGrades[val].labels.fra.routes}
                  />
                  <Charts>
                    <ScatterChart
                      axis="gradesY"
                      series={series}
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
                  timeRange={startRange}
                  timeAxisStyle={timeAxisStyle}
                  hideTimeAxis={false}
                >
                  <ChartRow height="50" debug={false}>
                    <Brush
                      timeRange={this.state.brushrange}
                      onTimeRangeChanged={this.handleTimeRangeChange}
                    />
                    <YAxis
                      id="brushY"
                      max={series.max("ascent.grade.id")}
                      min={series.min("ascent.grade.id")}
                      visible={false}
                      style={BrushYAxisStyle}
                    />
                    <Charts>
                      <ScatterChart
                        axis="brushY"
                        series={series}
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
      </div>
    );
  }
}

export default AscentsChart;
