import RootFindingMethod from "./Root_Finding_Method";

export default class Bisection_Method extends RootFindingMethod {
  constructor (equation, XL, XR, tolerance) {
    super (equation, XL, XR, tolerance);
    this.results = [];
  }

  calculate() {
    this.validateBracket();
    this.results = [];

    let xl = this.XL;
    let xr = this.XR;
    let i = 0;
    let error = Infinity;

    // ทำรอบแรกทิ้งตามที่อาจารย์สอน: หาจุดกึ่งกลางแรกและอัปเดตช่วง
    let xm = (xl + xr) / 2;
    if (this.f(xm) * this.f(xr) < 0) {
      xl = xm;
    } else {
      xr = xm;
    }

    // ลูปหลัก
    do {
      xm = (xl + xr) / 2;

      const fxl = this.f(xl);
      const fxr = this.f(xr);
      const fxm = this.f(xm);

      // เก็บค่าก่อนอัปเดตเพื่อแสดงในตาราง (ค่าที่ใช้คำนวณจริงในรอบนี้)
      const xlBefore = xl;
      const xrBefore = xr;

      // อัปเดตช่วงตามผลของฟังก์ชัน
      if (fxl * fxm < 0) {
        xr = xm;
      } else {
        xl = xm;
      }

      // คำนวณ error โดยใช้ newXm (ช่วงหลังอัปเดต) กับ xm (ค่ากึ่งกลางก่อนอัปเดต)
      const newXm = (xl + xr) / 2;
      error = Math.abs((newXm - xm) / newXm);

      // ปัดเพื่อให้การเปรียบเทียบเสถียร (ช่วยให้ได้จำนวน iteration คงที่)
      error = parseFloat(error.toFixed(20));

      // บันทึกค่าที่ "ใช้คำนวณในรอบนี้" (ก่อนการอัปเดต)
      this.results.push({
        iteration: ++i,
        xl: xlBefore,
        xr: xrBefore,
        xm,
        fxl,
        fxr,
        fxm,
        error,
      });
    } while (error > this.tolerance);

    return this.results;
  }
}
