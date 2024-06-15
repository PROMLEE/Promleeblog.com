"use client";

import cytoscape from "cytoscape";
import CytoscapeComponent from "react-cytoscapejs";
import getList from "@/components/cytoscape/data";
// @ts-ignore
import coseBilkent from "cytoscape-cose-bilkent";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

cytoscape.use(coseBilkent);

export default function CytoscapeGraph() {
  const [data, setData]: any = useState({ nodes: [], edges: [] });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getList().then((link) => {
      setData(link);
      console.log(data);
      setLoading(false);
    });
  }, []);
  const { theme } = useTheme();
  const fontActiveSize = 7;
  const edgeWidth = "3px";
  var edgeActiveWidth = "4px";
  const arrowScale = 0.8;
  const arrowActiveScale = 1.2;
  const dimColor = "#dfe4ea";
  const edgeColor = "#CCCCCC";
  const nodeColor = "#999999";
  const nodeActiveColor = "#ffa502";
  const successorColor = "#ff6348";
  const predecessorsColor = "#1e90ff";
  const nodeActiveSize = 28;
  function setDimStyle(target_cy: any, style: any) {
    target_cy.nodes().forEach(function (target: any) {
      target.style(style);
    });
    target_cy.edges().forEach(function (target: any) {
      target.style(style);
    });
  }
  function setFocus(
    target_element: any,
    successorColor: any,
    predecessorsColor: any,
    edgeWidth: any,
    arrowScale: any,
  ) {
    target_element.style("background-color", nodeActiveColor);
    target_element.style("fontSize", 10);
    target_element.successors().each(function (e: any) {
      if (e.isEdge()) {
        e.style("width", edgeWidth);
        e.style("arrow-scale", arrowScale);
      }
      e.style("background-color", successorColor);
      e.style("line-color", successorColor);
      e.style("source-arrow-color", successorColor);
      setOpacityElement(e, 0.5);
    });
    target_element.predecessors().each(function (e: any) {
      if (e.isEdge()) {
        e.style("width", edgeWidth);
        e.style("arrow-scale", arrowScale);
      }
      e.style("background-color", predecessorsColor);
      e.style("line-color", predecessorsColor);
      e.style("source-arrow-color", predecessorsColor);
      setOpacityElement(e, 0.5);
    });
    target_element.neighborhood().each(function (e: any) {
      // 이웃한 엣지와 노드
      setOpacityElement(e, 1);
    });
    target_element.style(
      "width",
      Math.max(parseFloat(target_element.style("width")), nodeActiveSize),
    );
    target_element.style(
      "height",
      Math.max(parseFloat(target_element.style("height")), nodeActiveSize),
    );
    target_element.style(
      "font-size",
      Math.max(parseFloat(target_element.style("font-size")), fontActiveSize),
    );
  }

  function setOpacityElement(target_element: any, degree: any) {
    target_element.style("opacity", degree);
  }

  function setResetFocus(target_cy: any) {
    target_cy.nodes().forEach(function (target: any) {
      target.style("background-color", nodeColor);
      target.style("width", target.data("size"));
      target.style("height", target.data("size"));
      target.style("font-size", target.data("font"));
      target.style("opacity", 1);
    });
    target_cy.edges().forEach(function (target: any) {
      target.style("line-color", edgeColor);
      target.style("source-arrow-color", edgeColor);
      target.style("width", edgeWidth);
      target.style("arrow-scale", arrowScale);
      target.style("opacity", 1);
    });
  }

  const layout = {
    name: "cose-bilkent",
    animate: true,
    gravityRangeCompound: 1.5,
    fit: true,
    tile: true,
  };
  const styleSheet = [
    {
      selector: "node",
      style: {
        label: "data(label)",
        width: "data(size)",
        height: "data(size)",
        fontSize: "data(font)",
        color: theme === "dark" ? "#ffffff" : "#000000",
      },
    },
    {
      selector: "node[type='category']",
      style: {
        shape: "rectangle",
      },
    },
    {
      selector: "edge",
      style: {
        width: 3,
        "curve-style": "bezier",
        "line-color": "#ccc",
        "source-arrow-color": "#ccc",
        "source-arrow-shape": "vee",
      },
    },
  ];

  return (
    <div className="h-full w-full rounded-lg border-2 border-third bg-foreground text-foreground">
      {!loading && (
        <CytoscapeComponent
          elements={CytoscapeComponent.normalizeElements(data)}
          style={{ width: "100%", height: "600px" }}
          zoomingEnabled={true}
          maxZoom={4}
          minZoom={0.1}
          autounselectify={false}
          boxSelectionEnabled={true}
          wheelSensitivity={0.1}
          layout={layout}
          // @ts-ignore
          stylesheet={styleSheet}
          cy={(cy: any) => {
            cy.on("tap", function (e: any) {
              e.preventDefault();
              const url = e.target.data("url");
              if (url && url !== "") {
                window.open(url);
              }
            });
            cy.on("tapstart mouseover", "node", function (e: any) {
              setDimStyle(cy, {
                "background-color": dimColor,
                "line-color": dimColor,
                "source-arrow-color": dimColor,
              });
              setFocus(
                e.target,
                successorColor,
                predecessorsColor,
                edgeActiveWidth,
                arrowActiveScale,
              );
            });
            cy.on("tapend mouseout", "node", function (e: any) {
              setResetFocus(e.cy);
            });
            let resizeTimer: any;
            window.addEventListener("resize", function () {
              this.clearTimeout(resizeTimer);
              resizeTimer = this.setTimeout(function () {
                // cy.fit().run();
              }, 200);
            });
          }}
        />
      )}
    </div>
  );
}
