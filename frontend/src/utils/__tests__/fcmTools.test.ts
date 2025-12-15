import { describe, expect, it } from "vitest";
import { getFCmax } from "../fcmTools";

describe("getFcMax", () => {
  it("should return 220 - 20 = 200", () => {
    expect(getFCmax(20)).toBe(200);
  });
});
