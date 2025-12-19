export const fcmTools = {
	getFcMaxTheorique(age: number) {
		return Math.round(208 - 0.7 * age);
	},

	getPurcentValueFcReserve(purcent: number, fcReserve: number, fcRepo: number) {
		const purcentConvert = purcent / 100;
		console.log(purcentConvert);
		return purcentConvert * fcReserve + fcRepo;
	},

	getFcReserve(fcMax: number, fcRepos: number) {
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

	generateFcValuePerZone(zone: number, fcMax: number) {
		let start = 0;
		let end = 0;

		switch (zone) {
			case 1:
				start = 60;
				end = 65;
				break;
			case 2:
				start = 65;
				end = 75;
				break;
			case 3:
				start = 75;
				end = 85;
				break;
			case 4:
				start = 85;
				end = 95;
				break;
			case 5:
				start = 95;
				end = 100;
				break;
		}

		const fcData = [
			{
				purcent: start,
				fc: Math.round(this.getPurcentValueFcMax(fcMax, start)),
			},
			{
				purcent: end,
				fc: Math.round(this.getPurcentValueFcMax(fcMax, end)),
			},
		];

		return fcData;
	},

	generateFcReserveValuePerZone(zone: number, fcMax: number, fcRepo: number) {
		let start = 0;
		let end = 0;
		const fcReserve = this.getFcReserve(fcMax, fcRepo);

		switch (zone) {
			case 1:
				start = 50;
				end = 60;
				break;
			case 2:
				start = 60;
				end = 70;
				break;
			case 3:
				start = 70;
				end = 80;
				break;
			case 4:
				start = 80;
				end = 90;
				break;
			case 5:
				start = 90;
				end = 100;
				break;
		}

		const fcData = [
			{
				purcent: start,
				fc: Math.round(this.getPurcentValueFcReserve(start, fcReserve, fcRepo)),
			},
			{
				purcent: end,
				fc: Math.round(this.getPurcentValueFcReserve(end, fcReserve, fcRepo)),
			},
		];

		return fcData;
	},
};
