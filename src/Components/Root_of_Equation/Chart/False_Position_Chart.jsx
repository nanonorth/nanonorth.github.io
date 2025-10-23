import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceDot,
} from "recharts";

function FalsePositionGraph({ equation, iterations, XL, XR }) {
  const [selectedPoint, setSelectedPoint] = useState(null);

  const f = (x) => {
    try {
      return new Function("x", `return ${equation}`)(x);
    } catch {
      return NaN;
    }
  };

  const xlValue = parseFloat(XL);
  const xrValue = parseFloat(XR);
  const latestX1 = iterations.length > 0 ? parseFloat(iterations[iterations.length - 1].x1) : null;

  const xlY = f(xlValue);
  const xrY = f(xrValue);
  const x1Y = latestX1 ? f(latestX1) : null;

  const generateFunctionData = () => {
    const data = [];
    const estimatedRoot = latestX1 || (xlValue + xrValue) / 2;
    const range = Math.abs(xrValue - xlValue);
    
    let minX, maxX;
    if (range > 100) {
      const focusRange = Math.max(range * 0.15, 100);
      minX = estimatedRoot - focusRange;
      maxX = estimatedRoot + focusRange;
      minX = Math.min(minX, xlValue - focusRange * 0.1);
      maxX = Math.max(maxX, xrValue + focusRange * 0.1);
    } else {
      const padding = range * 0.3;
      minX = Math.min(xlValue, xrValue) - padding;
      maxX = Math.max(xlValue, xrValue) + padding;
    }
    
    const step = (maxX - minX) / 500;

    for (let x = minX; x <= maxX; x += step) {
      const y = f(x);
      if (!isNaN(y) && isFinite(y)) {
        data.push({ x, y });
      }
    }
    
    return data;
  };

  const functionData = generateFunctionData();

  const calculateYDomain = () => {
    if (functionData.length === 0) return ['auto', 'auto'];
    
    const yValues = functionData.map(d => d.y).filter(y => isFinite(y));
    if (yValues.length === 0) return ['auto', 'auto'];
    
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);
    const range = maxY - minY;
    const padding = Math.max(range * 0.2, 1);
    
    return [minY - padding, maxY + padding];
  };

  const CustomDot = ({ cx, cy, fill, onClick }) => {
    return (
      <g onClick={onClick} style={{ cursor: 'pointer' }}>
        <circle
          cx={cx}
          cy={cy}
          r={10}
          fill={fill}
          stroke="#1E1F27"
          strokeWidth={3}
        />
        <circle
          cx={cx}
          cy={cy}
          r={12}
          fill="transparent"
          stroke={fill}
          strokeWidth={2}
          opacity={0.5}
        />
      </g>
    );
  };

  return (
    <div
      style={{
        backgroundColor: "#2A2B35",
        borderRadius: "12px",
        padding: "30px",
        marginBottom: "25px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2
          style={{
            margin: "0",
            color: "#E8E8E8",
            fontSize: "1.3rem",
          }}
        >
          กราฟฟังก์ชัน f(x) - False Position
        </h2>
        {selectedPoint && (
          <div
            style={{
              backgroundColor: "#1E1F27",
              padding: "10px 20px",
              borderRadius: "8px",
              border: `2px solid ${selectedPoint.color}`,
            }}
          >
            <div style={{ color: selectedPoint.color, fontWeight: "600", fontSize: "0.9rem" }}>
              {selectedPoint.label}
            </div>
            <div style={{ color: "#E8E8E8", fontSize: "0.85rem", marginTop: "4px" }}>
              x = {selectedPoint.x.toFixed(6)}
            </div>
            <div style={{ color: "#E8E8E8", fontSize: "0.85rem" }}>
              y = {selectedPoint.y.toFixed(6)}
            </div>
          </div>
        )}
      </div>

      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={functionData}
          margin={{ top: 30, right: 40, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#3A3B45" />
          <XAxis
            dataKey="x"
            type="number"
            domain={['dataMin - 1', 'dataMax + 1']}
            stroke="#B8B8B8"
            style={{ fontSize: "13px" }}
            tickFormatter={(value) => value.toFixed(2)}
          />
          <YAxis
            type="number"
            domain={calculateYDomain()}
            stroke="#B8B8B8"
            style={{ fontSize: "13px" }}
            width={80}
            tickFormatter={(value) => value.toFixed(2)}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1E1F27",
              border: "2px solid #FFD700",
              borderRadius: "8px",
              color: "#E8E8E8",
            }}
            formatter={(value) => value?.toFixed(6)}
            labelFormatter={(value) => `x = ${value?.toFixed(6)}`}
          />

          <Line
            type="monotone"
            dataKey="y"
            stroke="#667eea"
            dot={false}
            isAnimationActive={false}
            strokeWidth={4}
          />

          <ReferenceLine
            y={0}
            stroke="#FFD700"
            strokeWidth={2}
            strokeDasharray="3 3"
            opacity={0.6}
          />

          {functionData.length > 0 && 
           xlValue >= functionData[0].x && 
           xlValue <= functionData[functionData.length - 1].x && (
            <ReferenceLine
              x={xlValue}
              stroke="#FF6B6B"
              strokeWidth={2}
              strokeDasharray="5 5"
              opacity={0.7}
              label={{
                value: `XL = ${xlValue.toFixed(2)}`,
                position: "insideBottomLeft",
                fill: "#FF6B6B",
                fontSize: 13,
                fontWeight: "bold",
                offset: 10,
              }}
            />
          )}

          {functionData.length > 0 && 
           xrValue >= functionData[0].x && 
           xrValue <= functionData[functionData.length - 1].x && (
            <ReferenceLine
              x={xrValue}
              stroke="#51CF66"
              strokeWidth={2}
              strokeDasharray="5 5"
              opacity={0.7}
              label={{
                value: `XR = ${xrValue.toFixed(2)}`,
                position: "insideBottomRight",
                fill: "#51CF66",
                fontSize: 13,
                fontWeight: "bold",
                offset: 10,
              }}
            />
          )}

          {latestX1 && (
            <ReferenceLine
              x={latestX1}
              stroke="transparent"
              label={{
                value: `X1 = ${latestX1 >= 1000 ? latestX1.toExponential(4) : latestX1.toFixed(6)}`,
                position: "insideTopLeft",
                fill: "#FFD700",
                fontSize: 13,
                fontWeight: "bold",
                offset: 10,
              }}
            />
          )}

          {functionData.length > 0 && 
           xlValue >= functionData[0].x && 
           xlValue <= functionData[functionData.length - 1].x && (
            <ReferenceDot
              x={xlValue}
              y={xlY}
              r={10}
              fill="#FF6B6B"
              stroke="#1E1F27"
              strokeWidth={3}
              onClick={() => setSelectedPoint({ label: 'XL', x: xlValue, y: xlY, color: '#FF6B6B' })}
              style={{ cursor: 'pointer' }}
              shape={<CustomDot fill="#FF6B6B" onClick={() => setSelectedPoint({ label: 'XL', x: xlValue, y: xlY, color: '#FF6B6B' })} />}
            />
          )}

          {functionData.length > 0 && 
           xrValue >= functionData[0].x && 
           xrValue <= functionData[functionData.length - 1].x && (
            <ReferenceDot
              x={xrValue}
              y={xrY}
              r={10}
              fill="#51CF66"
              stroke="#1E1F27"
              strokeWidth={3}
              onClick={() => setSelectedPoint({ label: 'XR', x: xrValue, y: xrY, color: '#51CF66' })}
              style={{ cursor: 'pointer' }}
              shape={<CustomDot fill="#51CF66" onClick={() => setSelectedPoint({ label: 'XR', x: xrValue, y: xrY, color: '#51CF66' })} />}
            />
          )}

          {latestX1 && x1Y !== null && (
            <ReferenceDot
              x={latestX1}
              y={x1Y}
              r={10}
              fill="#FFD700"
              stroke="#1E1F27"
              strokeWidth={3}
              onClick={() => setSelectedPoint({ label: 'X1 (Root)', x: latestX1, y: x1Y, color: '#FFD700' })}
              style={{ cursor: 'pointer' }}
              shape={<CustomDot fill="#FFD700" onClick={() => setSelectedPoint({ label: 'X1 (Root)', x: latestX1, y: x1Y, color: '#FFD700' })} />}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FalsePositionGraph;