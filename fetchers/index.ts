import axios from "axios";
import { Category, Meal } from "../types";
import { getRandomPrice } from "../utils";

export const getCategories = async (): Promise<Category[]> => {
	try {
		const response = await axios.get(
			"https://www.themealdb.com/api/json/v1/1/categories.php"
		);
		const categories = response.data.categories;
		return categories;
	} catch (err) {
		console.error(err);
		return [];
	}
};

export const getCategoryMeals = async (category: string): Promise<Meal[]> => {
	try {
		const response = await axios.get(
			`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
		);
		const meals = response.data.meals;
		return meals;
	} catch (err) {
		console.error(err);
		return [];
	}
};

export const getProducts = async () => {
	const allProducts: Meal[] = [];
	const response = await axios.get(
		"https://www.themealdb.com/api/json/v1/1/categories.php"
	);
	const categoriesNames: string[] = response.data.categories.reduce(
		(acc: string[], curr: Category) => [...acc, curr.strCategory],
		[]
	);
	const urls: { url: string; category: string }[] = categoriesNames.map(
		(categoryName) => ({
			url: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`,
			category: categoryName,
		})
	);
	await Promise.all(
		urls.map(({ url, category }) =>
			axios.get(url).then((res) =>
				res.data.meals.forEach((m: Meal) => {
					m = { ...m, category, price: getRandomPrice(category) };
					allProducts.push(m);
				})
			)
		)
	);

	return allProducts;
};
