import React, { useState } from "react";
import GraphicalMethod from "./Method/Graphical_Method";
import GraphicalChart from "./Chart/Graphical_Chart";

function Graphical() {
  const [equation, setEquation] = useState("43*x-180");
  const [XL, setXL] = useState(0.0);
  const [XR, setXR] = useState(10.0);

  // เพิ่ม tolerance (เรียกว่า "หารูตแบบละเอียด")
  const [tolerance, setTolerance] = useState(0.000001);

  // รับ step หยาบและละเอียดจาก UI
  const [coarseStep, setCoarseStep] = useState(0.001);
  const [fineStep, setFineStep] = useState(0.000001);

  const [coarseIterations, setCoarseIterations] = useState([]);
  const [fineIterations, setFineIterations] = useState([]);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("coarse");

  const MAX_ITER = 100000; // ป้องกัน loop เกินควบคุม

  const handleCalculate = () => {
    try {
      setError("");

      const xl = parseFloat(XL);
      const xr = parseFloat(XR);
      const coarse = parseFloat(coarseStep);
      const fine = parseFloat(fineStep);
      const tol = parseFloat(tolerance);

      if (isNaN(xl) || isNaN(xr)) throw new Error("XL หรือ XR ไม่ถูกต้อง");
      if (xl >= xr) throw new Error("ต้องให้ XL < XR");
      if (isNaN(coarse) || coarse <= 0) throw new Error("Step หยาบ (coarse) ต้องมากกว่า 0");
      if (isNaN(fine) || fine <= 0) throw new Error("Step ละเอียด (fine) ต้องมากกว่า 0");
      if (isNaN(tol) || tol <= 0) throw new Error("Tolerance ต้องมากกว่า 0");

      // สร้าง instance ของ GraphicalMethod หนึ่งครั้ง (ส่งค่าเป็นตัวเลข/พารามิเตอร์ตามที่ class ต้องการ)
      const gm = new GraphicalMethod(equation, xl, xr, tol);
      // สมมติ class มี method f(x)
      const f = (x) => gm.f(x);

      // ----- การค้นหาแบบหยาบ (coarse) -----
      let coarseResults = [];
      let minY = Infinity;
      let bestX = xl;

      // คำนวณจำนวนจุดจาก step หยาบ แต่จำกัดไม่ให้เกิน MAX_ITER
      let coarseCount = Math.floor((xr - xl) / coarse) + 1;
      let actualCoarseStep = coarse;

      if (coarseCount > MAX_ITER) {
        coarseCount = MAX_ITER;
        actualCoarseStep = (xr - xl) / (coarseCount - 1);
      }

      // ถ้ coarseCount น้อยกว่า 1 ให้ทำให้เป็น 1
      if (coarseCount < 1) coarseCount = 1;

      let coarseIteration = 1;
      for (let i = 0; i < coarseCount; i++) {
        const x = xl + i * actualCoarseStep;
        const y = f(x);
        coarseResults.push({
          iteration: coarseIteration++,
          x,
          y,
          absY: Math.abs(y),
          isBest: false,
        });
        if (Math.abs(y) < Math.abs(minY)) {
          minY = y;
          bestX = x;
        }
      }

      const bestCoarseIndex = coarseResults.findIndex(
        (it) => Math.abs(it.x - bestX) < 1e-12
      );
      if (bestCoarseIndex !== -1) coarseResults[bestCoarseIndex].isBest = true;
      setCoarseIterations(coarseResults);

      // ----- การค้นหาแบบละเอียด (fine) รอบ bestX -----
      let fineResults = [];
      minY = Infinity;
      let bestFineX = bestX;
      let fineIteration = 1;

      // ขอบเขตรอบ bestX ให้เป็น +/- actualCoarseStep (หรืออย่างน้อย fine step เดียว)
      const startFine = Math.max(xl, bestX - Math.max(actualCoarseStep, fine));
      const endFine = Math.min(xr, bestX + Math.max(actualCoarseStep, fine));

      // คำนวณจำนวนจุดจาก fine step และจำกัด
      let fineCount = Math.floor((endFine - startFine) / fine) + 1;
      let actualFineStep = fine;
      if (fineCount > MAX_ITER) {
        fineCount = MAX_ITER;
        actualFineStep = (endFine - startFine) / (fineCount - 1);
      }
      if (fineCount < 1) fineCount = 1;

      for (let i = 0; i < fineCount; i++) {
        const x = startFine + i * actualFineStep;
        const y = f(x);
        fineResults.push({
          iteration: fineIteration++,
          x,
          y,
          absY: Math.abs(y),
          isBest: false,
        });
        if (Math.abs(y) < Math.abs(minY)) {
          minY = y;
          bestFineX = x;
        }
      }

      const bestFineIndex = fineResults.findIndex(
        (it) => Math.abs(it.x - bestFineX) < 1e-12
      );
      if (bestFineIndex !== -1) fineResults[bestFineIndex].isBest = true;
      setFineIterations(fineResults);
    } catch (err) {
      setError(err.message || String(err));
      setCoarseIterations([]);
      setFineIterations([]);
    }
  };

  const finalRoot =
    fineIterations.find((i) => i.isBest) ||
    coarseIterations.find((i) => i.isBest) ||
    null;

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
          Graphical Method
        </h1>
        <p style={{ color: "#A0A0A0", marginBottom: "30px", fontSize: "1.1rem" }}>
          วิธีการหาค่ารากโดยใช้กราฟ — คำนวณหาจุดที่ f(x) ตัดแกน x
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
              placeholder="เช่น x**2-4 หรือ x**3-2*x-5"
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
            <InputBox label="XL" value={XL} setValue={setXL} step={0.5} />
            <InputBox label="XR" value={XR} setValue={setXR} step={0.5} />

            <InputBox label="Coarse Step (หยาบ)" value={coarseStep} setValue={setCoarseStep} step={0.001} />
            <InputBox label="Fine Step (ละเอียด)" value={fineStep} setValue={setFineStep} step={0.000001} />
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
            <strong>คำแนะนำ:</strong> Step หยาบควรเป็น 0.001-0.01 และ Step ละเอียดควรเป็น 0.001-0.000001
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
                color: Math.abs(finalRoot.y) < parseFloat(tolerance) ? "#44FF44" : "#FFA500",
                fontSize: "0.95rem",
                fontWeight: "500",
              }}
            >
              |f(x)| = {Math.abs(finalRoot.y).toFixed(6)}
            </div>
          </div>
        )}

        {/* Graph Section */}
        {finalRoot && (
          <GraphicalChart 
            equation={equation}
            XL={XL}
            XR={XR}
            rootResult={finalRoot}
          />
        )}

        {/* Results Table with Tabs */}
        {coarseIterations.length > 0 && (
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

            {/* Tab Buttons */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
              <button
                onClick={() => setActiveTab("coarse")}
                style={{
                  padding: "10px 24px",
                  background: activeTab === "coarse"
                    ? "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)"
                    : "#3A3B45",
                  color: activeTab === "coarse" ? "#1E1F27" : "#B8B8B8",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "600",
                  transition: "all 0.3s",
                }}
              >
                การค้นหาแบบหยาบ ({coarseIterations.length} จุด)
              </button>
              <button
                onClick={() => setActiveTab("fine")}
                style={{
                  padding: "10px 24px",
                  background: activeTab === "fine"
                    ? "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)"
                    : "#3A3B45",
                  color: activeTab === "fine" ? "#1E1F27" : "#B8B8B8",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "600",
                  transition: "all 0.3s",
                }}
              >
                การค้นหาแบบละเอียด ({fineIterations.length} จุด)
              </button>
            </div>

            {/* Description Box */}
            {activeTab === "coarse" && (
              <div style={{
                padding: "15px",
                backgroundColor: "#1E1F27",
                borderRadius: "8px",
                marginBottom: "15px",
                border: "1px solid #3A3B45"
              }}>
                <p style={{ margin: 0, color: "#B8B8B8", fontSize: "0.95rem" }}>
                  สแกนทั้งช่วง [{XL}, {XR}] ด้วย {coarseIterations.length} จุด เพื่อหาจุดที่ |f(x)| น้อยที่สุด
                </p>
              </div>
            )}

            {activeTab === "fine" && (
              <div style={{
                padding: "15px",
                backgroundColor: "#1E1F27",
                borderRadius: "8px",
                marginBottom: "15px",
                border: "1px solid #3A3B45"
              }}>
                <p style={{ margin: 0, color: "#B8B8B8", fontSize: "0.95rem" }}>
                  ค้นหาแบบละเอียดรอบๆ จุดที่ดีที่สุดจากการสแกนแบบหยาบ
                </p>
              </div>
            )}

            {/* Table */}
            <IterationTable
              iterations={activeTab === "coarse" ? coarseIterations : fineIterations}
            />
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
            {["Iteration", "x", "f(x)", "|f(x)|"].map((head) => (
              <th
                key={head}
                style={{
                  padding: "14px 10px",
                  color: "#1E1F27",
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
                backgroundColor: item.isBest
                  ? "#2A3F2A"
                  : idx % 2 === 0 ? "#1E1F27" : "#2A2B35",
                transition: "background-color 0.2s"
              }}
              onMouseEnter={(e) => !item.isBest && (e.currentTarget.style.backgroundColor = "#3A3B45")}
              onMouseLeave={(e) => !item.isBest && (e.currentTarget.style.backgroundColor = idx % 2 === 0 ? "#1E1F27" : "#2A2B35")}
            >
              <td style={cellStyle("#E8E8E8")}>{item.iteration}</td>
              <td style={cellStyle(item.isBest ? "#FFD700" : "#B8B8B8")}>{item.x.toFixed(6)}</td>
              <td style={cellStyle(item.isBest ? "#FFA500" : "#B8B8B8")}>{item.y.toFixed(6)}</td>
              <td style={cellStyle("#B8B8B8")}>{item.absY.toFixed(6)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Components and Styles */
function InputBox({ label, value, setValue, step }) {
  // setValue อาจรับ string หรือ number -> เก็บเป็น string เสมอเพื่อให้ input ทำงานลื่น
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

export default Graphical;
