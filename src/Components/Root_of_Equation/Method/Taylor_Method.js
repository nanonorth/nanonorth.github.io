export default class TaylorSeriesMethod {
  constructor(equation, a, x, Nmax) {
    this.equation = equation;
    this.a = parseFloat(a);
    this.x = parseFloat(x);
    this.Nmax = Math.min(parseInt(Nmax), 3);
    this.results = [];
  }

  f(x) {
    try {
      const eq = this.equation
        .replace(/ln\s*\(/g, "Math.log(")
        .replace(/\^/g, "**");
      return new Function("x", `return ${eq}`)(x);
    } catch {
      return NaN;
    }
  }

  derivativeAtA(n) {
    const h = 1e-3; // 🔹เล็กลงอีกเพื่อความแม่นยำ
    const a = this.a;

    if (n === 0) return this.f(a);

    if (n === 1)
      return (this.f(a + h) - this.f(a - h)) / (2 * h);

    if (n === 2)
      return (this.f(a + h) - 2 * this.f(a) + this.f(a - h)) / (h ** 2);

    if (n === 3)
  return (
    -this.f(a - 2 * h)
    + 2 * this.f(a - h)
    - 2 * this.f(a + h)
    + this.f(a + 2 * h)
  ) / (2 * Math.pow(h, 3));

    // fallback (ถ้า N > 3)
    const fn_minus_1_pos = this.derivativeAtPoint(n - 1, a + h);
    const fn_minus_1_neg = this.derivativeAtPoint(n - 1, a - h);
    return (fn_minus_1_pos - fn_minus_1_neg) / (2 * h);
  }

  derivativeAtPoint(n, p) {
    const tmp = new TaylorSeriesMethod(this.equation, p, p, 0);
    return tmp.derivativeAtA(n);
  }

  factorial(n) {
    if (n <= 1) return 1;
    let ans = 1;
    for (let i = 2; i <= n; i++) ans *= i;
    return ans;
  }

  approximateAtOrder(N) {
    let sum = 0;
    const dx = this.x - this.a;

    for (let n = 0; n <= N; n++) {
      const f_n = this.derivativeAtA(n);
      const term = (f_n * Math.pow(dx, n)) / this.factorial(n);
      sum += term;
    }

    return sum;
  }

  calculate() {
    this.results = [];

    const trueValue = this.f(this.x);

    if (
      (this.equation.includes("Math.log") || this.equation.includes("ln")) &&
      (this.a <= 0 || this.x <= 0)
    ) {
      throw new Error("สำหรับ ln(x) ต้องใช้ค่า x > 0 และ a > 0");
    }

    for (let N = 0; N <= this.Nmax; N++) {
      const approx = this.approximateAtOrder(N);
      const errAbs = Math.abs(trueValue - approx) / Math.abs(trueValue);

      this.results.push({
        order: N,
        approx,
        trueValue,
        errorAbs: errAbs,
      });
    }

    return this.results;
  }
}
