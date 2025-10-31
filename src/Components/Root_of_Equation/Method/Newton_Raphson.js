export default class NewtonRaphsonMethod {
  constructor(equation, x0, tolerance) {
    this.equation = equation;
    this.x0 = x0;
    this.tolerance = tolerance;

    this.results = [];
  }

  // ฟังก์ชันประเมินค่า f(x)
  f(x) {
    try {
      const cleanEquation = this.equation.replace(/\^/g, "**");
      return new Function("x", `return ${cleanEquation}`)(x);
    } catch (err) {
      throw new Error("ไม่สามารถคำนวณค่า f(x) ได้");
    }
  }

  // ฟังก์ชันคำนวณอนุพันธ์เชิงตัวเลข f'(x)
  df(x) {
    const h = 0.00001;
    try {
      const f1 = this.f(x + h);
      const f2 = this.f(x - h);
      return (f1 - f2) / (2 * h);
    } catch (err) {
      throw new Error("ไม่สามารถคำนวณค่า f'(x) ได้");
    }
  }

  calculate() {
    this.results = [];
    let x = this.x0;
    let iteration = 1;

    // วนลูป Newton-Raphson ไปเรื่อย ๆ จนกว่า error ≤ tolerance
    while (true) {
    const fx = this.f(x);
    const dfx = this.df(x);

    // ตรวจสอบว่า f'(x) เป็นศูนย์หรือไม่
    if (Math.abs(dfx) < 1e-10) {
        throw new Error(`อนุพันธ์เป็นศูนย์ที่ iteration ${iteration} ไม่สามารถดำเนินการต่อได้`);
    }

    // คำนวณค่าใหม่
    const xNew = x - fx / dfx;
    const error = Math.abs(xNew - x);

    this.results.push({
        iteration,
        x: xNew,
        fx: this.f(xNew),
        dfx,
        error,
    });

    // ✅ หยุดเมื่อ error ≤ tolerance
    if (error <= this.tolerance) {
        break;
    }

    x = xNew;
    iteration++;
    }

    return this.results;
  }
}