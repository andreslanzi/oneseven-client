import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ProductsMenu from "../screens/ProductsMenu";
import CategoriesMenu from "../screens/CategoriesMenu";
import Cart from "../screens/Cart";
import { Button } from "react-native";
import { Category, Meal } from "../types";
import { useShoppingCart } from "../context/ShoppingCartContext";

type NavigationTabsProps = {
	categories: Category[];
	meals: Meal[];
};

const NavigationTabs = ({ categories, meals }: NavigationTabsProps) => {
	const [selectedCategory, setSelectedCategory] = useState<
		string | undefined
	>(undefined);
	const { getTotalQuantity } = useShoppingCart();

	const Tab = createBottomTabNavigator();

	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;

						if (route.name === "MENU") {
							iconName = focused ? "pizza-outline" : "pizza";
						} else if (route.name === "CATEGORIES") {
							iconName = focused
								? "ios-list"
								: "ios-list-outline";
						} else if (route.name === "CART") {
							iconName = "cart-outline";
						}
						return (
							<Ionicons
								name={iconName as any}
								size={size}
								color={color}
							/>
						);
					},
					tabBarActiveTintColor: "#03DAC5",
					tabBarInactiveTintColor: "gray",
					tabBarStyle: {
						backgroundColor: "black",
					},
					headerStyle: {
						backgroundColor: "black",
					},
					headerTitleStyle: {
						color: "#03DAC5",
					},
				})}
			>
				<Tab.Screen name="MENU">
					{(props) => <ProductsMenu {...props} meals={meals} />}
				</Tab.Screen>
				<Tab.Screen
					name="CATEGORIES"
					options={{
						headerLeft: () =>
							selectedCategory ? (
								<Button
									title="BACK"
									color="#fb7185"
									onPress={() =>
										setSelectedCategory(undefined)
									}
								/>
							) : null,
					}}
				>
					{(props) => (
						<CategoriesMenu
							{...props}
							meals={meals}
							categories={categories}
							selectedCategory={selectedCategory}
							setSelectedCategory={setSelectedCategory}
						/>
					)}
				</Tab.Screen>
				<Tab.Screen
					name="CART"
					component={Cart}
					options={
						getTotalQuantity() !== 0
							? { tabBarBadge: getTotalQuantity() }
							: {}
					}
				></Tab.Screen>
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default NavigationTabs;
