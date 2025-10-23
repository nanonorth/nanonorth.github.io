import RootFindingMethod from "./Root_Finding_Method";

export default class FalsePositionMethod extends RootFindingMethod {
  constructor(equation, XL, XR, tolerance) {
    super(equation, XL, XR, tolerance);
    this.results = [];
  }

  calculate() {
    this.validateBracket();
    this.results = [];

    let xl = this.XL;
    let xr = this.XR;
    let i = 0;
    let error = Infinity;
    let x1 = 0;
    let x1Old = 0;

    // ทำรอบแรก: คำนวณ X1Old ครั้งแรกและอัปเดตช่วง
    let fxl = this.f(xl);
    let fxr = this.f(xr);
    x1Old = (xl * fxr - xr * fxl) / (fxr - fxl);
    let fx1 = this.f(x1Old);

    // อัปเดตช่วงตามเครื่องหมาย
    if (fx1 * fxr < 0) {
      xl = x1Old;
    } else {
      xr = x1Old;
    }

    // ลูปหลัก
    do {
      const xlBefore = xl;
      const xrBefore = xr;
      
      fxl = this.f(xl);
      fxr = this.f(xr);

      // คำนวณ x1 ใหม่จากสูตร False Position: x1 = (xl*f(xr) - xr*f(xl)) / (f(xr) - f(xl))
      x1 = (xl * fxr - xr * fxl) / (fxr - fxl);
      fx1 = this.f(x1);

      // คำนวณ error = |x1new - x1old| / |x1new|
      error = Math.abs((x1 - x1Old) / x1);
      error = parseFloat(error.toFixed(20));

      // บันทึกผลลัพธ์ของรอบนี้
      this.results.push({
        iteration: ++i,
        xl: xlBefore,
        xr: xrBefore,
        x1,
        fxl,
        fxr,
        fx1,
        error,
      });

      // อัปเดตช่วงใหม่ตามเครื่องหมาย
      if (fx1 * fxr < 0) {
        xl = x1;
      } else {
        xr = x1;
      }

      // เก็บค่า x1 ปัจจุบันไว้เป็น x1Old สำหรับรอบถัดไป
      x1Old = x1;

    } while (error > this.tolerance);

    return this.results;
  }
}