import axios from "axios";
import { Category, Meal } from "../types";

export const getCategories = async (): Promise<Category[]> => {
	try {
		const response = await axios.get("http://192.168.0.37:3000/categories");
		const categories = response.data;
		return categories;
	} catch (err) {
		console.error(err);
		return [];
	}
};

export const getProducts = async (): Promise<Meal[]> => {
	try {
		const response = await axios.get("http://192.168.0.37:3000/products");
		const products = response.data;
		return products;
	} catch (err) {
		console.error(err);
		return [];
	}
};
