import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { getCategories, getProducts } from "./fetchers";
import { Category, Meal } from "./types";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { StripeProvider } from "@stripe/stripe-react-native";
import NavigationTabs from "./tabs";
import tw from "twrnc";

export default function App() {
	const [loading, setLoading] = useState<boolean>(false);
	const [meals, setMeals] = useState<Meal[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		const fetchCategories = async () => {
			const fetchedCategories = await getCategories();
			setCategories(fetchedCategories);
		};
		fetchCategories();
	}, []);

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			const fetchedProducts = await getProducts();
			setMeals(fetchedProducts);
			setLoading(false);
		};
		fetchProducts();
	}, []);

	if (loading) {
		return (
			<View
				style={tw`flex-1 pt-20 h-full justify-center  items-center m-auto w-full`}
			>
				<Text style={tw`text-slate-200`}>Loading...</Text>
			</View>
		);
	}

	return (
		<ShoppingCartProvider>
			<StripeProvider publishableKey="pk_test_51NE1X5AdurOGssyHj83AvYTwx4YNrrU4ZxaQl4l62135xD4jsLpWdMkspcjmXzX28e3WT3IDfisshziMR5kYyhVX00lVLvqJDh">
				<NavigationTabs categories={categories} meals={meals} />
			</StripeProvider>
		</ShoppingCartProvider>
	);
}
