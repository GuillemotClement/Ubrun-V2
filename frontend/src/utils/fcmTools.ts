export const fcmTools = {
  getFcMaxTheorique(age: number) {
    return 208 - 0.7 * age;
  },

  getPurcentValueFcReserve(purcent: number, fcReserve: number, fcRepo: number) {
    const purcentConvert = purcent / 10;
    return purcentConvert * fcReserve + fcRepo;
  },

  getFcReserve(age: number, fcRepos: number) {
    const fcMax = this.getFcMaxTheorique(age);
    return fcMax - fcRepos;
  },

  getPurcentValueFcMax(fcMax: number, purcent: number) {
    return fcMax * (purcent / 100);
  },

  generateFcReserveData(fcRepos: number, fcReserve: number) {
    const fcData = [];
    const start = 50;
    const end = 150;

    for (let i = start; i <= end; i += 5) {
      const fcValue = this.getPurcentValueFcReserve(i, fcReserve, fcRepos);
      const roundValue = Math.round(fcValue);
      const fc = {
        purcent: i,
        fc: roundValue,
      };

      fcData.push(fc);
    }

    return fcData;
  },

  generateFcTheoriqueData(fcMax: number) {
    const start = 50;
    const end = 150;
    const fcData = [];

    for (let i = start; i <= end; i += 5) {
      const fcValue = this.getPurcentValueFcMax(fcMax, i);
      const roundValue = Math.round(fcValue);
      const fc = {
        purcent: i,
        fc: roundValue,
      };

      fcData.push(fc);
    }

    return fcData;
  },
};
