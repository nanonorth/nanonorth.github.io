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

function TaylorGraph({ equation, iterations, x0 }) {
  const [selectedPoint, setSelectedPoint] = useState(null);

  const f = (x) => {
    try {
      // แปลง ln(x) เป็น Math.log(x) ถ้ามี
      let eq = equation.replace(/ln\s*\(/g, 'Math.log(');
      return new Function("x", `return ${eq}`)(x);
    } catch {
      return NaN;
    }
  };

  const x0Value = parseFloat(x0);
  const finalX = iterations.length > 0 ? parseFloat(iterations[iterations.length - 1].x_next) : null;

  const generateFunctionData = () => {
    const data = [];
    const root = finalX || x0Value;
    const range = Math.abs(root - x0Value) || 2;
    
    // กำหนดขอบเขตของกราฟ
    let minX = Math.min(x0Value, root) - range * 0.5;
    let maxX = Math.max(x0Value, root) + range * 0.5;
    
    // ถ้ามี ln(x) ต้องให้ minX > 0
    if (equation.includes('Math.log') || equation.includes('ln')) {
      minX = Math.max(0.01, minX);
    }
    
    const step = (maxX - minX) / 500;

    for (let x = minX; x <= maxX; x += step) {
      const y = f(x);
      if (!isNaN(y) && isFinite(y)) {
        data.push({ x, fx: y });
      }
    }
    
    return data;
  };

  const functionData = generateFunctionData();

  const calculateYDomain = () => {
    if (functionData.length === 0) return ['auto', 'auto'];
    
    const allValues = functionData.map(d => d.fx).filter(y => isFinite(y));
    if (allValues.length === 0) return ['auto', 'auto'];
    
    const minY = Math.min(...allValues);
    const maxY = Math.max(...allValues);
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
          r={8}
          fill={fill}
          stroke="#1E1F27"
          strokeWidth={3}
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
            fontSize: "1.3rem",
          }}
        >
          กราฟ f(x) - Taylor Series Method
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

          {/* เส้น f(x) */}
          <Line
            type="monotone"
            dataKey="fx"
            stroke="#667eea"
            dot={false}
            isAnimationActive={false}
            strokeWidth={4}
            name="f(x)"
          />



          {/* จุด x0 */}
          {functionData.length > 0 && (
            <ReferenceDot
              x={x0Value}
              y={f(x0Value)}
              r={8}
              fill="#FF6B6B"
              stroke="#1E1F27"
              strokeWidth={3}
              onClick={() => setSelectedPoint({ label: 'x₀ (Initial)', x: x0Value, y: f(x0Value), color: '#FF6B6B' })}
              style={{ cursor: 'pointer' }}
              shape={<CustomDot fill="#FF6B6B" onClick={() => setSelectedPoint({ label: 'x₀ (Initial)', x: x0Value, y: f(x0Value), color: '#FF6B6B' })} />}
            />
          )}

          {/* จุดรากที่หาได้ */}
          {finalX && (
            <>
              <ReferenceLine
                x={finalX}
                stroke="transparent"
                label={{
                  value: `Root ≈ ${finalX.toFixed(6)}`,
                  position: "insideTopLeft",
                  fill: "#FFD700",
                  fontSize: 13,
                  fontWeight: "bold",
                  offset: 10,
                }}
              />

              {/* เส้นประแนวนอนผ่านจุด root (สีทอง) */}
              <ReferenceLine
                y={f(finalX)}
                stroke="#FFD700"
                strokeWidth={2}
                strokeDasharray="4 4"
                opacity={0.6}
                label={{
                  position: "insideTopRight",
                  fill: "#FFD700",
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              />

              <ReferenceDot
                x={finalX}
                y={f(finalX)}
                r={8}
                fill="#FFD700"
                stroke="#1E1F27"
                strokeWidth={3}
                onClick={() => setSelectedPoint({ label: 'Root', x: finalX, y: f(finalX), color: '#FFD700' })}
                style={{ cursor: 'pointer' }}
                shape={<CustomDot fill="#FFD700" onClick={() => setSelectedPoint({ label: 'Root', x: finalX, y: f(finalX), color: '#FFD700' })} />}
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
      
    </div>
  );
}

export default TaylorGraph;