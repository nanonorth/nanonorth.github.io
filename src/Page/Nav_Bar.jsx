import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

export default function Nav_bar() {
  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        background: "linear-gradient(135deg, rgba(24, 25, 33, 1) 0%, rgba(42, 43, 53, 1) 100%)",
        backdropFilter: "blur(15px)",
        padding: "0 30px",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        boxShadow: "0 4px 20px rgba(255, 215, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.3)",
        borderBottom: "2px solid",
        borderImage: "linear-gradient(90deg, transparent, #FFD700, #FFA500, #FFD700, transparent) 1"
      }}
    >
      <Toolbar sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        padding: "15px 0",
        minHeight: "70px"
      }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            fontSize: "28px",
            fontWeight: "700",
            textDecoration: "none",
            background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            transition: "all 0.3s ease",
            filter: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.3))",
            "&:hover": { 
              filter: "drop-shadow(0 0 12px rgba(255, 215, 0, 0.6))",
              transform: "translateY(-2px)"
            },
          }}
        >
          Numerical Methods
        </Typography>

        <Box sx={{ display: "flex", gap: "15px" }}>
          <Button
            component={Link}
            to="/"
            sx={{
              color: "#E8E8E8",
              fontSize: "16px",
              fontWeight: "500",
              textTransform: "none",
              padding: "8px 20px",
              borderRadius: "8px",
              border: "1px solid transparent",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 215, 0, 0.15)",
                borderColor: "#FFD700",
                color: "#FFD700",
                boxShadow: "0 0 12px rgba(255, 215, 0, 0.3)"
              }
            }}
          >
            Home
          </Button>

          <Button
            component={Link}
            to="/Graphical"
            sx={{
              color: "#E8E8E8",
              fontSize: "16px",
              fontWeight: "500",
              textTransform: "none",
              padding: "8px 20px",
              borderRadius: "8px",
              border: "1px solid transparent",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 215, 0, 0.15)",
                borderColor: "#FFD700",
                color: "#FFD700",
                boxShadow: "0 0 12px rgba(255, 215, 0, 0.3)"
              }
            }}
          >
            Graphical
          </Button>

          <Button
            component={Link}
            to="/Bisection"
            sx={{
              color: "#E8E8E8",
              fontSize: "16px",
              fontWeight: "500",
              textTransform: "none",
              padding: "8px 20px",
              borderRadius: "8px",
              border: "1px solid transparent",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 215, 0, 0.15)",
                borderColor: "#FFD700",
                color: "#FFD700",
                boxShadow: "0 0 12px rgba(255, 215, 0, 0.3)"
              }
            }}
          >
            Bisection
          </Button>

          <Button
            component={Link}
            to="/FalsePosition"
            sx={{
              color: "#E8E8E8",
              fontSize: "16px",
              fontWeight: "500",
              textTransform: "none",
              padding: "8px 20px",
              borderRadius: "8px",
              border: "1px solid transparent",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 215, 0, 0.15)",
                borderColor: "#FFD700",
                color: "#FFD700",
                boxShadow: "0 0 12px rgba(255, 215, 0, 0.3)"
              }
            }}
          >
            False Position
          </Button>

        </Box>
      </Toolbar>
    </AppBar>
  );
}