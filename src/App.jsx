import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav_bar from "./Page/Nav_Bar";
import Home_Page from "./Page/Home_Page";
import Graphical from "./Components/Root_of_Equation/Graphical"
import Bisection from "./Components/Root_of_Equation/Bisection";
import FalsePosition from "./Components/Root_of_Equation/False_Position";

function App() {
    return (
        <Router>
            <Nav_bar/>
            <Routes>
                <Route path="/" element={<Home_Page/>} />
                <Route path="/Graphical" element={<Graphical/>} />
                <Route path="/Bisection" element={<Bisection/>} />
                <Route path="/FalsePosition" element={<FalsePosition/>} />
            </Routes>
        </Router>
    )
}

export default App;