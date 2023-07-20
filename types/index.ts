export type Category = {
	idCategory: string;
	strCategory: string;
	strCategoryThumb: string;
	strCategoryDescription: string;
};

export type Meal = {
	strMeal: string;
	strMealThumb: string;
	idMeal: string;
	category: string;
	price: number;
	quantity?: number;
};

export type CartItem = Meal & {
	quantity: number;
};
