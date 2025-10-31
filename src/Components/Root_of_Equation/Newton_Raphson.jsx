import React, { useState } from "react";
import NewtonRaphsonMethod from "./Method/Newton_Raphson";
import NewtonRaphsonChart from "./Chart/Newton_Raphson_Chart";

function NewtonRaphson() {
  const [equation, setEquation] = useState("x**2-7");
  const [x0, setX0] = useState(2);
  const [tolerance, setTolerance] = useState(0.000001);
//  const [maxIterations, setMaxIterations] = useState(50);
  
  const [iterations, setIterations] = useState([]);
  const [error, setError] = useState("");
  const [finalRoot, setFinalRoot] = useState(null);

  const handleCalculate = () => {
    try {
      setError("");
      
      const x0Val = parseFloat(x0);
      const tol = parseFloat(tolerance);
//      const maxIter = parseInt(maxIterations);
      
      if (isNaN(x0Val)) throw new Error("X0 ไม่ถูกต้อง");
      if (isNaN(tol) || tol <= 0) throw new Error("Tolerance ต้องมากกว่า 0");
//      if (isNaN(maxIter) || maxIter <= 0) throw new Error("Max Iterations ต้องมากกว่า 0");
      
      const method = new NewtonRaphsonMethod(equation, x0Val, tol);
      const results = method.calculate();
      
      setIterations(results);
      
      const lastResult = results[results.length - 1];
      if (lastResult) {
        setFinalRoot({
          x: lastResult.x,
          y: lastResult.fx,
          iterations: results.length,
          converged: lastResult.error < tol
        });
      }
    } catch (err) {
      setError(err.message || String(err));
      setIterations([]);
      setFinalRoot(null);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#1E1F27",
        color: "#E8E8E8",
        padding: "120px 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            marginBottom: "10px",
            background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "700",
          }}
        >
          Newton-Raphson Method
        </h1>
        <p style={{ color: "#A0A0A0", marginBottom: "30px", fontSize: "1.1rem" }}>
          วิธีการหาค่ารากโดยใช้อนุพันธ์อันดับหนึ่ง
        </p>

        {/* Input Section */}
        <div
          style={{
            backgroundColor: "#2A2B35",
            borderRadius: "12px",
            padding: "30px",
            marginBottom: "25px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* Input f(x) */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#B8B8B8",
                fontSize: "0.95rem",
                fontWeight: "500",
              }}
            >
              f(x) :
            </label>
            <input
              value={equation}
              onChange={(e) => setEquation(e.target.value)}
              style={{
                width: "97%",
                padding: "12px 16px",
                backgroundColor: "#1E1F27",
                border: "2px solid #3A3B45",
                borderRadius: "8px",
                color: "#E8E8E8",
                fontSize: "1rem",
                outline: "none",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#FFD700")}
              onBlur={(e) => (e.target.style.borderColor = "#3A3B45")}
              placeholder="เช่น x**2-7 หรือ x**3-2*x-5"
            />
          </div>

          {/* Parameters */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <InputBox label="X0 (จุดเริ่มต้น)" value={x0} setValue={setX0} step={0.5} />
            <InputBox label="Tolerance" value={tolerance} setValue={setTolerance} step={0.000001} />
            {/*<InputBox label="Max Iterations" value={maxIterations} setValue={setMaxIterations} step={1} />
            */}
          </div>

          {error && (
            <div
              style={{
                padding: "12px 16px",
                backgroundColor: "#3A1F1F",
                borderRadius: "8px",
                color: "#FF6B6B",
                marginBottom: "20px",
                border: "1px solid #5A3F3F",
              }}
            >
              {error}
            </div>
          )}

          {/* Info Box */}
          <div
            style={{
              padding: "12px 16px",
              backgroundColor: "#1E2F3F",
              borderRadius: "8px",
              color: "#6BB6FF",
              marginBottom: "20px",
              border: "1px solid #3A5F7F",
              fontSize: "0.9rem",
            }}
          >
            <strong>สูตร:</strong> x₍ᵢ₊₁₎ = xᵢ - f(xᵢ)/f'(xᵢ)
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            style={buttonMain()}
            onMouseEnter={(e) => (e.target.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
          >
            คำนวณ
          </button>
        </div>

        {/* Root Result Display */}
        {finalRoot && (
          <div
            style={{
              backgroundColor: "#2A2B35",
              borderRadius: "12px",
              padding: "30px",
              marginBottom: "25px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                margin: "0 0 15px 0",
                color: "#B8B8B8",
                fontSize: "1.2rem",
                fontWeight: "500",
              }}
            >
              Root =
            </h2>
            <div
              style={{
                fontSize: "3.5rem",
                fontWeight: "700",
                background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {finalRoot.x.toFixed(6)}
            </div>
            <div
              style={{
                marginTop: "10px",
                color: finalRoot.converged ? "#B8B8B8" : "#FFA500",
                fontSize: "0.95rem",
                fontWeight: "500",
              }}
            >
              Iterations: {finalRoot.iterations} | |f(x)| = {Math.abs(finalRoot.y).toFixed(6)}
            </div>
          </div>
        )}

        {/* Graph Section */}
        {finalRoot && (
          <NewtonRaphsonChart 
            equation={equation}
            iterations={iterations}
            rootResult={finalRoot}
          />
        )}

        {/* Results Table */}
        {iterations.length > 0 && (
          <div
            style={{
              backgroundColor: "#2A2B35",
              borderRadius: "12px",
              padding: "30px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
              overflowX: "auto",
            }}
          >
            <h2
              style={{
                marginTop: "0",
                marginBottom: "20px",
                color: "#E8E8E8",
                fontSize: "1.5rem",
              }}
            >
              ผลลัพธ์การคำนวณ
            </h2>

            <IterationTable iterations={iterations} />
          </div>
        )}
      </div>
    </div>
  );
}

/* Iteration Table Component */
function IterationTable({ iterations }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "0.9rem",
        }}
      >
        <thead>
          <tr
            style={{
              background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
            }}
          >
            {["Iteration", "x", "f(x)", "f'(x)", "Error"].map((head) => (
              <th
                key={head}
                style={{
                  padding: "14px 10px",
                  color: "#FFFFFF",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {iterations.map((item, idx) => (
            <tr
              key={idx}
              style={{
                backgroundColor: idx % 2 === 0 ? "#1E1F27" : "#2A2B35",
                transition: "background-color 0.2s"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3A3B45")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = idx % 2 === 0 ? "#1E1F27" : "#2A2B35")}
            >
              <td style={cellStyle("#E8E8E8")}>{item.iteration}</td>
              <td style={cellStyle("#FFD700")}>{item.x.toFixed(6)}</td>
              <td style={cellStyle("#B8B8B8")}>{item.fx.toFixed(6)}</td>
              <td style={cellStyle("#B8B8B8")}>{item.dfx.toFixed(6)}</td>
              <td style={cellStyle(item.error < 0.000001 ? "#FFA500" : "#FFA500")}>
                {item.error.toFixed(6)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Components and Styles */
function InputBox({ label, value, setValue, step }) {
  const toNumber = (v) => {
    const n = parseFloat(v);
    return isNaN(n) ? 0 : n;
  };

  return (
    <div>
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          color: "#B8B8B8",
          fontSize: "0.95rem",
          fontWeight: "500",
        }}
      >
        {label}:
      </label>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <button
          onClick={() => {
            const newVal = (toNumber(value) - step);
            setValue(Number.isFinite(newVal) ? parseFloat(newVal.toFixed(12)) : newVal);
          }}
          style={buttonStyle("#3A3B45")}
          type="button"
        >
          −
        </button>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          style={inputStyle()}
        />
        <button
          onClick={() => {
            const newVal = (toNumber(value) + step);
            setValue(Number.isFinite(newVal) ? parseFloat(newVal.toFixed(12)) : newVal);
          }}
          style={buttonStyle("#3A3B45")}
          type="button"
        >
          +
        </button>
      </div>
    </div>
  );
}

function buttonMain() {
  return {
    width: "100%",
    padding: "14px 24px",
    background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
    color: "#1E1F27",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1.05rem",
    fontWeight: "600",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 12px rgba(255, 215, 0, 0.4)",
  };
}

function buttonStyle(bgColor) {
  return {
    padding: "12px 16px",
    backgroundColor: bgColor,
    border: "none",
    borderRadius: "8px",
    color: "#FFD700",
    fontSize: "1.2rem",
    cursor: "pointer",
    fontWeight: "700",
    transition: "background-color 0.2s",
  };
}

function inputStyle() {
  return {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "#1E1F27",
    border: "2px solid #3A3B45",
    borderRadius: "8px",
    color: "#E8E8E8",
    fontSize: "1rem",
    outline: "none",
  };
}

function cellStyle(color = "#E8E8E8") {
  return {
    padding: "12px 10px",
    textAlign: "center",
    color: color,
    borderBottom: "1px solid #3A3B45",
  };
}

export default NewtonRaphson;