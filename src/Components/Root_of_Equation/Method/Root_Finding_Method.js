export default class Root_Finding_Method {
  constructor(equation, XL, XR, tolerance) {
    this.equation = equation;
    this.XL = XL;
    this.XR = XR;
    this.tolerance = tolerance;
  }

  f(x) {
    try {
      return new Function("x", `return ${this.equation}`)(x);
    } catch {
      return NaN;
    }
  }

  validateBracket() {
    const fxl = this.f(this.XL);
    const fxr = this.f(this.XR);
    

  }

  calculate() {

  }
}