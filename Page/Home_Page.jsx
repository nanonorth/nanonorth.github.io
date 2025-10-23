import React from "react";
import { Link } from "react-router-dom";

function Home_Page() {
  return (
    <div style={{ 
      minHeight: "100vh",
      backgroundColor: "#1E1F27",
      color: "#E8E8E8",
      padding: "120px 20px 50px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ 
          fontSize: "3.5rem",
          marginBottom: "20px",
          background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: "700",
          lineHeight: "1.2"
        }}>
          Welcome to Root of Equation
        </h1>
        
        <p style={{ 
          fontSize: "1.3rem",
          color: "#A0A0A0",
          marginBottom: "60px",
          maxWidth: "600px",
          margin: "0 auto 60px"
        }}>
          เลือกวิธีการหาค่ารากสมการที่คุณต้องการ
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "30px",
          maxWidth: "900px",
          margin: "0 auto"
        }}>
          {/* Graphical Method Card */}
          <Link
            to="/Graphical"
            style={{
              display: "block",
              padding: "30px 30px",
              background: "linear-gradient(135deg, #2A2B35 0%, #1E1F27 100%)",
              border: "2px solid #3A3B45",
              borderRadius: "16px",
              textDecoration: "none",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.borderColor = "#FFD700";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(255, 215, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "#3A3B45";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{
              fontSize: "3rem",
              marginBottom: "15px",
              background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              📊
            </div>
            <h3 style={{ 
              fontSize: "1.5rem",
              color: "#E8E8E8",
              marginBottom: "10px",
              fontWeight: "600"
            }}>
              Graphical Method
            </h3>
            <p style={{ 
              fontSize: "0.95rem",
              color: "#A0A0A0",
              lineHeight: "1.6",
              marginBottom: "20px"
            }}>
              วิธีหารากจากกราฟ - ดูจุดที่เส้นตัดแกน x
            </p>
            <div style={{
              display: "inline-block",
              padding: "10px 24px",
              background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
              color: "#1E1F27",
              borderRadius: "8px",
              fontSize: "0.95rem",
              fontWeight: "600"
            }}>
              เริ่มต้น →
            </div>
          </Link>

          {/* Bisection Method Card */}
          <Link
            to="/Bisection"
            style={{
              display: "block",
              padding: "30px 30px",
              background: "linear-gradient(135deg, #2A2B35 0%, #1E1F27 100%)",
              border: "2px solid #3A3B45",
              borderRadius: "16px",
              textDecoration: "none",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.borderColor = "#FFD700";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(255, 215, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "#3A3B45";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{
              fontSize: "3rem",
              marginBottom: "15px",
              background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              ✂️
            </div>
            <h3 style={{ 
              fontSize: "1.5rem",
              color: "#E8E8E8",
              marginBottom: "10px",
              fontWeight: "600"
            }}>
              Bisection Method
            </h3>
            <p style={{ 
              fontSize: "0.95rem",
              color: "#A0A0A0",
              lineHeight: "1.6",
              marginBottom: "20px"
            }}>
              วิธีแบ่งครึ่งช่วง - หารากของสมการด้วยการแบ่งช่วงเป็นสองส่วนซ้ำ ๆ
            </p>
            <div style={{
              display: "inline-block",
              padding: "10px 24px",
              background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
              color: "#1E1F27",
              borderRadius: "8px",
              fontSize: "0.95rem",
              fontWeight: "600"
            }}>
              เริ่มต้น →
            </div>
          </Link>

          {/* False Position Method Card */}
          <Link
            to="/FalsePosition"
            style={{
              display: "block",
              padding: "30px 30px",
              background: "linear-gradient(135deg, #2A2B35 0%, #1E1F27 100%)",
              border: "2px solid #3A3B45",
              borderRadius: "16px",
              textDecoration: "none",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.borderColor = "#FFD700";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(255, 215, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "#3A3B45";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{
              fontSize: "3rem",
              marginBottom: "15px",
              background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              📐
            </div>
            <h3 style={{ 
              fontSize: "1.5rem",
              color: "#E8E8E8",
              marginBottom: "10px",
              fontWeight: "600"
            }}>
              False Position Method
            </h3>
            <p style={{ 
              fontSize: "0.95rem",
              color: "#A0A0A0",
              lineHeight: "1.6",
              marginBottom: "20px"
            }}>
              วิธีตำแหน่งผิดพลาด - ใช้เส้นตรงเชื่อมจุดสองข้างเพื่อหาตำแหน่งราก
            </p>
            <div style={{
              display: "inline-block",
              padding: "10px 24px",
              background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
              color: "#1E1F27",
              borderRadius: "8px",
              fontSize: "0.95rem",
              fontWeight: "600"
            }}>
              เริ่มต้น →
            </div>
          </Link>
        </div>

        <div style={{
          marginTop: "80px",
          padding: "30px",
          backgroundColor: "#2A2B35",
          borderRadius: "12px",
          border: "1px solid #3A3B45"
        }}>
          <h3 style={{ 
            fontSize: "1.3rem",
            color: "#FFD700",
            marginBottom: "15px",
            fontWeight: "600"
          }}>
            💡 เกี่ยวกับการหารากของสมการ
          </h3>
          <p style={{ 
            fontSize: "1rem",
            color: "#B8B8B8",
            lineHeight: "1.8",
            maxWidth: "800px",
            margin: "0 auto"
          }}>
            การหารากของสมการ (Root Finding) คือการหาค่า x ที่ทำให้ f(x) = 0 
            ซึ่งเป็นปัญหาพื้นฐานที่สำคัญในวิชาคณิตศาสตร์เชิงตัวเลข 
            มีหลายวิธีในการหาคำตอบ แต่ละวิธีมีข้อดีข้อเสียแตกต่างกันไป
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home_Page;