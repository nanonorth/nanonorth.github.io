import React, { useState } from "react";
import TaylorMethod from "./Method/Taylor_Method";
import TaylorGraph from "./Chart/Taylor_Chart";

function Taylor() {
    const [equation, setEquation] = useState("Math.log(x)");
    const [a, setA] = useState(2.0);       // จุดขยาย (x0 หรือ a)
    const [x, setX] = useState(4);       // จุดที่ต้องการหาค่า f(x)
    const [Nmax, setNmax] = useState(3);   // ลำดับสูงสุดของเทเลอร์
    const [results, setResults] = useState([]); // เก็บผลลัพธ์ N=0..Nmax
    const [error, setError] = useState(""); // ข้อความ error

  const handleCalculate = () => {
  try {
    setError(""); // ล้าง error ก่อนเริ่ม

    const solver = new TaylorMethod(
      equation,        // สมการ เช่น "Math.log(x)"
      parseFloat(a),   // จุดขยาย a
      parseFloat(x),   // จุดที่ต้องการประมาณค่า f(x)
      parseInt(Nmax)   // จำนวนลำดับสูงสุดของเทเลอร์ (N=0..Nmax)
    );

    const resultsData = solver.calculate(); // เรียกคำนวณ
    setResults(resultsData); // เก็บผลลัพธ์ใน state
  } catch (err) {
    setError(`${err.message}`); // ถ้ามี error ให้แสดงข้อความ
    setResults([]); // ล้างผลลัพธ์
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
          Taylor Series Method
        </h1>
        <p style={{ color: "#A0A0A0", marginBottom: "30px", fontSize: "1.1rem" }}>
          วิธีเทย์เลอร์ซีรีส์สำหรับหารากของสมการ
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
              f(x):
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
              placeholder="เช่น x**2 - 7 หรือ Math.log(x) - x/2"
            />
            <div style={{ marginTop: "8px", color: "#A0A0A0", fontSize: "0.85rem" }}>
              * ใช้ Math.log(x) สำหรับ ln(x)
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            {/* จุดขยาย a */}
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
    X0:
  </label>
  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
    <button
      onClick={() => setA((prev) => (parseFloat(prev) - 0.1).toFixed(1))}
      style={buttonStyle("#3A3B45")}
      onMouseEnter={(e) => (e.target.style.backgroundColor = "#4A4B55")}
      onMouseLeave={(e) => (e.target.style.backgroundColor = "#3A3B45")}
    >
      −
    </button>
    <input
      value={a}
      onChange={(e) => setA(e.target.value)}
      type="text"
      style={inputStyle()}
      onFocus={(e) => (e.target.style.borderColor = "#FFD700")}
      onBlur={(e) => (e.target.style.borderColor = "#3A3B45")}
    />
    <button
      onClick={() => setA((prev) => (parseFloat(prev) + 0.1).toFixed(1))}
      style={buttonStyle("#3A3B45")}
      onMouseEnter={(e) => (e.target.style.backgroundColor = "#4A4B55")}
      onMouseLeave={(e) => (e.target.style.backgroundColor = "#3A3B45")}
    >
      +
    </button>
  </div>
</div>

{/* จุดที่ต้องการ x */}
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
    X:
  </label>
  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
    <button
      onClick={() => setX((prev) => (parseFloat(prev) - 0.1).toFixed(1))}
      style={buttonStyle("#3A3B45")}
      onMouseEnter={(e) => (e.target.style.backgroundColor = "#4A4B55")}
      onMouseLeave={(e) => (e.target.style.backgroundColor = "#3A3B45")}
    >
      −
    </button>
    <input
      value={x}
      onChange={(e) => setX(e.target.value)}
      type="text"
      style={inputStyle()}
      onFocus={(e) => (e.target.style.borderColor = "#FFD700")}
      onBlur={(e) => (e.target.style.borderColor = "#3A3B45")}
    />
    <button
      onClick={() => setX((prev) => (parseFloat(prev) + 0.1).toFixed(1))}
      style={buttonStyle("#3A3B45")}
      onMouseEnter={(e) => (e.target.style.backgroundColor = "#4A4B55")}
      onMouseLeave={(e) => (e.target.style.backgroundColor = "#3A3B45")}
    >
      +
    </button>
  </div>
</div>

{/* จำนวนเทอม Nmax */}
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
    N:
  </label>
  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
    <button
      onClick={() => setNmax((prev) => Math.max(parseInt(prev) - 1, 1))}
      style={buttonStyle("#3A3B45")}
      onMouseEnter={(e) => (e.target.style.backgroundColor = "#4A4B55")}
      onMouseLeave={(e) => (e.target.style.backgroundColor = "#3A3B45")}
    >
      −
    </button>
    <input
      value={Nmax}
      onChange={(e) => setNmax(e.target.value)}
      type="number"
      min="1"
      max="10"
      style={inputStyle()}
      onFocus={(e) => (e.target.style.borderColor = "#FFD700")}
      onBlur={(e) => (e.target.style.borderColor = "#3A3B45")}
    />
    <button
      onClick={() => setNmax((prev) => Math.min(parseInt(prev) + 1, 10))}
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

        {results.length > 0 && (
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
              Approximate =
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
              {results[results.length - 1].approx.toFixed(6)}
            </div>
            <div
              style={{
                marginTop: "10px",
                color: "#A0A0A0",
                fontSize: "0.95rem",
              }}
            >
              {results.length} results (Nmax {Nmax})
            </div>
          </div>
        )}

{/*        {results.length > 0 && (
          <TaylorGraph
            equation={equation}
            results={results}
            x0={x0}
          />
        )}
*/}

        {results.length > 0 && (
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
      ผลลัพธ์การประมาณค่าเทย์เลอร์ ({results.length} ลำดับ)
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
              N
            </th>
            <th
              style={{
                padding: "14px 10px",
                color: "#1E1F27",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              f(x)
            </th>

            <th
              style={{
                padding: "14px 10px",
                color: "#1E1F27",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              |Error|
            </th>
          </tr>
        </thead>

        <tbody>
          {results.map((item, idx) => (
            <tr
              key={item.order}
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
                {item.order}
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
                {item.approx.toFixed(6)}
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
                {item.errorAbs.toFixed(6)}
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

export default Taylor;