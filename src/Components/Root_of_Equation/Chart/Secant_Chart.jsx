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

function SecantChart({ equation, iterations, rootResult }) {
  const [selectedPoint, setSelectedPoint] = useState(null);

  // ฟังก์ชันประเมินค่า
  const f = (x) => {
    try {
      const cleanEquation = equation.replace(/\^/g, "**");
      return new Function("x", `return ${cleanEquation}`)(x);
    } catch (err) {
      console.error("Error evaluating function:", err);
      return NaN;
    }
  };

  // คำนวณช่วงสำหรับกราฟ
  const calculateRange = () => {
    const xValues = iterations.map(it => it.x);
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const range = maxX - minX;
    const padding = Math.max(range * 0.3, 2);
    
    return {
      xMin: minX - padding,
      xMax: maxX + padding
    };
  };

  const { xMin, xMax } = calculateRange();

  // สร้าง graph ของฟังก์ชัน
  const generateFunctionData = () => {
    const data = [];
    const numPoints = 500;
    const step = (xMax - xMin) / numPoints;

    for (let x = xMin; x <= xMax; x += step) {
      const y = f(x);
      if (!isNaN(y) && isFinite(y)) {
        data.push({ x, y });
      }
    }
    
    return data;
  };

  const functionData = generateFunctionData();

  // คำนวณ domain สำหรับ Y axis
  const calculateYDomain = () => {
    if (functionData.length === 0) return ['auto', 'auto'];
    
    const yValues = functionData.map(d => d.y).filter(y => isFinite(y));
    if (yValues.length === 0) return ['auto', 'auto'];
    
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);
    const range = maxY - minY;
    
    if (range < 0.001) {
      return [minY - 0.1, maxY + 0.1];
    }
    
    const padding = Math.max(range * 0.2, Math.abs(maxY) * 0.1);
    
    return [minY - padding, maxY + padding];
  };

  const CustomDot = ({ cx, cy, fill, onClick }) => {
    return (
      <g onClick={onClick} style={{ cursor: 'pointer' }}>
        <circle
          cx={cx}
          cy={cy}
          r={8}
          fill={fill}
          stroke="#1E1F27"
          strokeWidth={2}
        />
        <circle
          cx={cx}
          cy={cy}
          r={10}
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
            fontSize: "1.5rem",
          }}
        >
          กราฟฟังก์ชัน f(x)
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
              f(x) = {selectedPoint.y.toFixed(6)}
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
            domain={['dataMin', 'dataMax']}
            stroke="#B8B8B8"
            style={{ fontSize: "13px" }}
            tickFormatter={(value) => {
              if (Math.abs(value) >= 1000) return value.toExponential(2);
              if (Math.abs(value) < 0.01) return value.toFixed(4);
              return value.toFixed(2);
            }}
          />
          <YAxis
            type="number"
            domain={calculateYDomain()}
            stroke="#B8B8B8"
            style={{ fontSize: "13px" }}
            width={80}
            tickFormatter={(value) => {
              if (Math.abs(value) >= 1000) return value.toExponential(1);
              if (Math.abs(value) < 0.01) return value.toFixed(4);
              return value.toFixed(2);
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1E1F27",
              border: "2px solid #FFD700",
              borderRadius: "8px",
              color: "#E8E8E8",
            }}
            formatter={(value) => value.toFixed(6)}
            labelFormatter={(value) => `x = ${value.toFixed(6)}`}
          />

          {/* เส้นฟังก์ชัน */}
          <Line
            type="monotone"
            dataKey="y"
            stroke="#667eea"
            dot={false}
            isAnimationActive={false}
            strokeWidth={4}
          />

          {/* เส้น y = 0 */}
          <ReferenceLine
            y={0}
            stroke="#FFD700"
            strokeWidth={2}
            strokeDasharray="3 3"
            opacity={0.6}
          />

          {/* จุด iterations */}
          {iterations.map((iter, idx) => (
            <ReferenceDot
              key={idx}
              x={iter.x}
              y={iter.fx}
              r={6}
              fill={idx === iterations.length - 1 ? "#FFD700" : "#667eea"}
              stroke="#1E1F27"
              strokeWidth={2}
              onClick={() => setSelectedPoint({ 
                label: `Iteration ${iter.iteration}`, 
                x: iter.x, 
                y: iter.fx, 
                color: idx === iterations.length - 1 ? "#FFD700" : "#667eea"
              })}
              style={{ cursor: 'pointer' }}
              shape={<CustomDot 
                fill={idx === iterations.length - 1 ? "#FFD700" : "#667eea"}
                onClick={() => setSelectedPoint({ 
                  label: `Iteration ${iter.iteration}`, 
                  x: iter.x, 
                  y: iter.fx, 
                  color: idx === iterations.length - 1 ? "#FFD700" : "#667eea"
                })} 
              />}
            />
          ))}

          {/* Label Root */}
          {rootResult && (
            <ReferenceLine
              x={rootResult.x}
              stroke="transparent"
              label={{
                value: `Root = ${rootResult.x.toFixed(6)}`,
                position: "insideTopLeft",
                fill: "#FFD700",
                fontSize: 13,
                fontWeight: "bold",
                offset: 10,
              }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default SecantChart;