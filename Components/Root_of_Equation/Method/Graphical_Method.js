import RootFindingMethod from "./Root_Finding_Method";

export default class GraphicalMethod extends RootFindingMethod {
  constructor(equation, XL, XR, tolerance) {
    super(equation, XL, XR, tolerance);
    this.results = [];
  }

  calculate() {
    this.results = [];

    const f = this.f.bind(this);
    const xl = this.XL;
    const xr = this.XR;
    let found = false;
    let rootX = null;

    // ตรวจค่าก่อนเริ่ม (กัน NaN จาก eval)
    if (!isFinite(xl) || !isFinite(xr)) {
      throw new Error("ค่า XL หรือ XR ไม่ถูกต้อง");
    }

    // ขั้นตอนที่ 1: scan ทีละ 1
    for (let i = xl; i <= xr && !found; i += 1) {
      try {
        const y1 = f(i);
        const y2 = f(i + 1);
        if (!isFinite(y1) || !isFinite(y2)) continue;
        if (y1 * y2 <= 0) {
          rootX = i;
          found = true;
        }
      } catch {
        // ถ้าคำนวณไม่ได้ให้ข้าม
        continue;
      }
    }

    // ขั้นตอนที่ 2: ถ้าเจอ root แล้ว ค่อย scan ละเอียด
    if (found) {
      for (let i = rootX; i <= rootX + 1; i += 0.000001) {
        try {
          const y1 = f(i);
          const y2 = f(i + 0.000001);
          if (!isFinite(y1) || !isFinite(y2)) continue;
          if (y1 * y2 <= 0) {
            rootX = i;
            break;
          }
        } catch {
          continue;
        }
      }
    } else {
      // ไม่เจอ root เลย → แจ้งเตือนแทนที่จะ crash
      throw new Error("ไม่พบรากของสมการในช่วงที่กำหนด");
    }

    // ตรวจสอบก่อนคำนวณ f(rootX)
    let y;
    try {
      y = f(rootX);
      if (!isFinite(y)) throw new Error();
    } catch {
      throw new Error("ไม่สามารถคำนวณค่า f(x) ได้");
    }

    this.results.push({
      x: rootX,
      y: y,
      isRoot: Math.abs(y) < this.tolerance,
    });

    return this.results;
  }

}
