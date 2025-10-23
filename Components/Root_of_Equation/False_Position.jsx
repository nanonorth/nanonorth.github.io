import React, { useState } from "react";
import FalsePositionMethod from "./Method/False_Position_Method";
import FalsePositionGraph from "./Chart/False_Position_Chart";

function FalsePosition() {
  const [equation, setEquation] = useState("x**4-13");
  const [XL, setXL] = useState(1.5);
  const [XR, setXR] = useState(2.0);
  const [tolerance, setTolerance] = useState(0.000001);
  const [iterations, setIterations] = useState([]);
  const [error, setError] = useState("");

  const handleCalculate = () => {
    try {
      setError("");
      const solver = new FalsePositionMethod(
        equation,
        parseFloat(XL),
        parseFloat(XR),
        parseFloat(tolerance)
      );
      const results = solver.calculate();
      setIterations(results);
    } catch (err) {
      setError(`${err.message}`);
      setIterations([]);
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
          False Position Method
        </h1>
        <p style={{ color: "#A0A0A0", marginBottom: "30px", fontSize: "1.1rem" }}>
          วิธีตำแหน่งผิดพลาดสำหรับหารากของสมการ
        </p>

        <div
          style={{
            backgroundColor: "#2A2B35",
            borderRadius: "12px",
            padding: "30px",
            marginBottom: "25px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
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
              placeholder="เช่น x**2-4 หรือ x**3-2*x-5"
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
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
                XL:
              </label>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <button
                  onClick={() => setXL((prev) => (parseFloat(prev) - 0.1).toFixed(1))}
                  style={buttonStyle("#3A3B45")}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#4A4B55")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#3A3B45")}
                >
                  −
                </button>
                <input
                  value={XL}
                  onChange={(e) => setXL(e.target.value)}
                  type="text"
                  style={inputStyle()}
                  onFocus={(e) => (e.target.style.borderColor = "#FFD700")}
                  onBlur={(e) => (e.target.style.borderColor = "#3A3B45")}
                />
                <button
                  onClick={() => setXL((prev) => (parseFloat(prev) + 0.1).toFixed(1))}
                  style={buttonStyle("#3A3B45")}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#4A4B55")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#3A3B45")}
                >
                  +
                </button>
              </div>
            </div>

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
                XR:
              </label>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <button
                  onClick={() => setXR((prev) => (parseFloat(prev) - 0.1).toFixed(1))}
                  style={buttonStyle("#3A3B45")}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#4A4B55")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#3A3B45")}
                >
                  −
                </button>
                <input
                  value={XR}
                  onChange={(e) => setXR(e.target.value)}
                  type="text"
                  style={inputStyle()}
                  onFocus={(e) => (e.target.style.borderColor = "#FFD700")}
                  onBlur={(e) => (e.target.style.borderColor = "#3A3B45")}
                />
                <button
                  onClick={() => setXR((prev) => (parseFloat(prev) + 0.1).toFixed(1))}
                  style={buttonStyle("#3A3B45")}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#4A4B55")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#3A3B45")}
                >
                  +
                </button>
              </div>
            </div>

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
                Tolerance:
              </label>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <button
                  onClick={() =>
                    setTolerance((prev) =>
                      Math.max((parseFloat(prev) - 0.000001).toFixed(6), 0.000001)
                    )
                  }
                  style={buttonStyle("#3A3B45")}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#4A4B55")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#3A3B45")}
                >
                  −
                </button>
                <input
                  value={tolerance}
                  onChange={(e) => setTolerance(e.target.value)}
                  type="text"
                  style={inputStyle()}
                  onFocus={(e) => (e.target.style.borderColor = "#FFD700")}
                  onBlur={(e) => (e.target.style.borderColor = "#3A3B45")}
                />
                <button
                  onClick={() =>
                    setTolerance((prev) =>
                      (parseFloat(prev) + 0.000001).toFixed(6)
                    )
                  }
                  style={buttonStyle("#3A3B45")}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#4A4B55")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#3A3B45")}
                >
                  +
                </button>
              </div>
            </div>
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

          <button
            onClick={handleCalculate}
            style={{
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
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 16px rgba(255, 215, 0, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 12px rgba(255, 215, 0, 0.4)";
            }}
          >
            คำนวณ
          </button>
        </div>

        {iterations.length > 0 && (
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
              {iterations[iterations.length - 1].x1.toFixed(6)}
            </div>
            <div
              style={{
                marginTop: "10px",
                color: "#A0A0A0",
                fontSize: "0.95rem",
              }}
            >
              {iterations.length} iterations
            </div>
          </div>
        )}

        {iterations.length > 0 && (
          <FalsePositionGraph
            equation={equation}
            iterations={iterations}
            XL={XL}
            XR={XR}
          />
        )}

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
              ผลลัพธ์การคำนวณ ({iterations.length} iterations)
            </h2>
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
                    <th
                      style={{
                        padding: "14px 10px",
                        color: "#1E1F27",
                        textAlign: "center",
                        fontWeight: "600",
                      }}
                    >
                      Iteration
                    </th>
                    <th
                      style={{
                        padding: "14px 10px",
                        color: "#1E1F27",
                        textAlign: "center",
                        fontWeight: "600",
                      }}
                    >
                      XL
                    </th>
                    <th
                      style={{
                        padding: "14px 10px",
                        color: "#1E1F27",
                        textAlign: "center",
                        fontWeight: "600",
                      }}
                    >
                      XR
                    </th>
                    <th
                      style={{
                        padding: "14px 10px",
                        color: "#1E1F27",
                        textAlign: "center",
                        fontWeight: "600",
                      }}
                    >
                      X1
                    </th>
                    <th
                      style={{
                        padding: "14px 10px",
                        color: "#1E1F27",
                        textAlign: "center",
                        fontWeight: "600",
                      }}
                    >
                      f(XL)
                    </th>
                    <th
                      style={{
                        padding: "14px 10px",
                        color: "#1E1F27",
                        textAlign: "center",
                        fontWeight: "600",
                      }}
                    >
                      f(XR)
                    </th>
                    <th
                      style={{
                        padding: "14px 10px",
                        color: "#1E1F27",
                        textAlign: "center",
                        fontWeight: "600",
                      }}
                    >
                      f(X1)
                    </th>
                    <th
                      style={{
                        padding: "14px 10px",
                        color: "#1E1F27",
                        textAlign: "center",
                        fontWeight: "600",
                      }}
                    >
                      Error
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {iterations.map((item, idx) => (
                    <tr
                      key={item.iteration}
                      style={{
                        backgroundColor: idx % 2 === 0 ? "#1E1F27" : "#2A2B35",
                        transition: "background-color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#3A3B45")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          idx % 2 === 0 ? "#1E1F27" : "#2A2B35")
                      }
                    >
                      <td
                        style={{
                          padding: "12px 10px",
                          textAlign: "center",
                          color: "#E8E8E8",
                          borderBottom: "1px solid #3A3B45",
                        }}
                      >
                        {item.iteration}
                      </td>
                      <td
                        style={{
                          padding: "12px 10px",
                          textAlign: "center",
                          color: "#B8B8B8",
                          borderBottom: "1px solid #3A3B45",
                        }}
                      >
                        {item.xl.toFixed(6)}
                      </td>
                      <td
                        style={{
                          padding: "12px 10px",
                          textAlign: "center",
                          color: "#B8B8B8",
                          borderBottom: "1px solid #3A3B45",
                        }}
                      >
                        {item.xr.toFixed(6)}
                      </td>
                      <td
                        style={{
                          padding: "12px 10px",
                          textAlign: "center",
                          color: "#FFD700",
                          fontWeight: "600",
                          borderBottom: "1px solid #3A3B45",
                        }}
                      >
                        {item.x1.toFixed(6)}
                      </td>
                      <td
                        style={{
                          padding: "12px 10px",
                          textAlign: "center",
                          color: "#B8B8B8",
                          borderBottom: "1px solid #3A3B45",
                        }}
                      >
                        {item.fxl.toFixed(6)}
                      </td>
                      <td
                        style={{
                          padding: "12px 10px",
                          textAlign: "center",
                          color: "#B8B8B8",
                          borderBottom: "1px solid #3A3B45",
                        }}
                      >
                        {item.fxr.toFixed(6)}
                      </td>
                      <td
                        style={{
                          padding: "12px 10px",
                          textAlign: "center",
                          color: "#B8B8B8",
                          borderBottom: "1px solid #3A3B45",
                        }}
                      >
                        {item.fx1.toFixed(6)}
                      </td>
                      <td
                        style={{
                          padding: "12px 10px",
                          textAlign: "center",
                          color: "#FFA500",
                          fontWeight: "600",
                          borderBottom: "1px solid #3A3B45",
                        }}
                      >
                        {item.error.toFixed(10)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
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
    flex: "1",
    padding: "12px 16px",
    backgroundColor: "#1E1F27",
    border: "2px solid #3A3B45",
    borderRadius: "8px",
    color: "#E8E8E8",
    fontSize: "1rem",
    outline: "none",
  };
}

export default FalsePosition;