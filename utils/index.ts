const getRandomNumber = (min: number, max: number) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
};

const categoriesMinMax = {
	lamb: [50, 70],
	beef: [35, 50],
	pork: [20, 35],
	default: [5, 15],
};

export const getRandomPrice = (category: string) => {
	switch (category) {
		case "Lamb":
			return getRandomNumber(
				categoriesMinMax.lamb[0],
				categoriesMinMax.lamb[1]
			);
		case "Beef":
			return getRandomNumber(
				categoriesMinMax.beef[0],
				categoriesMinMax.beef[1]
			);
		case "Pork":
			return getRandomNumber(
				categoriesMinMax.pork[0],
				categoriesMinMax.pork[1]
			);
		default:
			return getRandomNumber(
				categoriesMinMax.default[0],
				categoriesMinMax.default[1]
			);
	}
};
