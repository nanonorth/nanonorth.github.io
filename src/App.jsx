import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav_bar from "./Page/Nav_Bar";
import Home_Page from "./Page/Home_Page";
import Graphical from "./Components/Root_of_Equation/Graphical"
import Bisection from "./Components/Root_of_Equation/Bisection";
import FalsePosition from "./Components/Root_of_Equation/False_Position";
import OnePoint from "./Components/Root_of_Equation/OnePoint";
import Taylor from "./Components/Root_of_Equation/Taylor";
import NewtonRaphson from "./Components/Root_of_Equation/Newton_Raphson";
import Secant from "./Components/Root_of_Equation/Secant";

function App() {
    return (
        <Router>
            <Nav_bar/>
            <Routes>
                <Route path="/" element={<Home_Page/>} />
                <Route path="/Graphical" element={<Graphical/>} />
                <Route path="/Bisection" element={<Bisection/>} />
                <Route path="/FalsePosition" element={<FalsePosition/>} />
                <Route path="/OnePoint" element={<OnePoint/>} />
                <Route path="/Taylor" element={<Taylor/>} />
                <Route path="/NewtonRaphson" element={<NewtonRaphson/>} />
                <Route path="/Secant" element={<Secant/>} />
            </Routes>
        </Router>
    )
}

export default App;