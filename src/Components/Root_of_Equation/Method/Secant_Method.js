export default class SecantMethod {
  constructor(equation, x0, tolerance, delta = 0.01) {
    this.equation = equation;
    this.x0 = parseFloat(x0);
    this.tolerance = parseFloat(tolerance);
    this.delta = parseFloat(delta);
    this.results = [];
  }

  f(x) {
    try {
      const eq = this.equation.replace(/ln\s*\(/g, "Math.log(").replace(/\^/g, "**");
      return new Function("x", `return ${eq}`)(x);
    } catch {
      return NaN;
    }
  }

  calculate() {
    let x = this.x0;
    let iteration = 1;

    while (true) {
      const fx = this.f(x);
      const fx_delta = this.f(x + this.delta * x);

      const denom = fx_delta - fx;
      if (Math.abs(denom) < 1e-12) {
        throw new Error("ค่าฟังก์ชันต่างกันน้อยเกินไป ไม่สามารถหารได้");
      }

      const xNew = x - (fx * this.delta * x) / denom;
      const error = Math.abs(xNew - x);

      this.results.push({
        iteration,
        x: xNew,
        fx: this.f(xNew),
        error,
      });

      if (error <= this.tolerance) break;
      if (iteration > 1000) throw new Error("ไม่ลู่เข้าใน 1000 รอบ ลองเปลี่ยน X0");

      x = xNew;
      iteration++;
    }

    return this.results;
  }
}
