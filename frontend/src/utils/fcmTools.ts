export const fcmTools = {
  getFcMaxTheorique(age: number) {
    return 208 - 0.7 * age;
  },

  getPurcentValueFcReserve(purcent: number, fcReserve: number, fcRepo: number) {
    const purcentConvert = purcent / 10;
    return purcentConvert * fcReserve + fcRepo;
  },

  getFcReserve(age: number, fcRepos: number) {
    const fcMax = fcmTools.getFcMaxTheorique(age);
    return fcMax - fcRepos;
  },

  getPurcentValueFcMax(fcMax: number, purcent: number) {
    return fcMax * (purcent / 100);
  },
};
