import RootFindingMethod from "./Root_Finding_Method";

export default class OnePointMethod extends RootFindingMethod {
  constructor(equation, x0, tolerance) {
    super(equation, x0, x0, tolerance);
    this.x0 = x0;
    this.results = [];
  }

  // f(x) ตามสมการที่ผู้ใช้กรอก (เช่น x**2 - 7)
  f(x) {
    try {
      return new Function("x", `return ${this.equation}`)(x);
    } catch {
      return NaN;
    }
  }

  // g(x) = x - λ f(x)
  g(x) {
    const lambda = 0.1; // ค่าที่ใช้ปรับให้ลู่เข้า
    const fx = this.f(x);
    if (isNaN(fx)) throw new Error("เกิดข้อผิดพลาดในการคำนวณ f(x)");
    return x - lambda * fx;
  }

  calculate() {
    this.results = [];

    let x_i = this.x0;
    let x_next;
    let iteration = 0;
    let error = Infinity;

    do {
      x_next = this.g(x_i);

      if (isNaN(x_next)) {
        throw new Error("ไม่สามารถคำนวณ g(x) ได้ ตรวจสมการอีกครั้ง");
      }

      error = Math.abs(x_next - x_i);
      error = parseFloat(error.toFixed(10));

      iteration++;

      this.results.push({
        iteration,
        x_i,
        x_next,
        error,
      });

      x_i = x_next;
    } while (error > this.tolerance);

    return this.results;
  }
}