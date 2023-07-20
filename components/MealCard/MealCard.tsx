import { View, Text, Image, Pressable } from "react-native";
import { Meal } from "../../types";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import tw from "twrnc";

type MealCardProps = { meal: Meal } & {
	expanded?: boolean;
};

const MealCard = ({ meal, expanded }: MealCardProps) => {
	const {
		getItemQuantity,
		increaseCartQuantity,
		decreaseCartQuantity,
		orderConfirmed,
	} = useShoppingCart();

	const quantity = getItemQuantity(meal.idMeal);

	const [fontsLoaded] = useFonts({
		Roboto: require("../../assets/fonts/Roboto-Medium.ttf"),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<View
			style={tw`flex flex-col bg-gray-800 justify-between items-center px-2 py-8 h-[380px] ${
				expanded ? "" : "rounded-2xl"
			}`}
			onLayout={onLayoutRootView}
		>
			<Image
				source={{ uri: meal.strMealThumb }}
				style={tw`w-[90%] h-[140px] rounded-2xl`}
				resizeMode={"cover"}
			/>
			<Text
				style={[
					tw`text-center h-[80px] mt-4 ${
						expanded ? "text-xl" : "text-sm"
					} font-bold text-white font-bold`,
					{ fontFamily: "Roboto" },
				]}
			>
				{meal.strMeal}
			</Text>
			<Text style={tw`text-white`}>USD {meal.price}.00</Text>

			<View
				style={tw`flex flex-row flex-wrap justify-center min-h-[40px]`}
			>
				{quantity === 0 && (
					<Pressable
						onPress={() => {
							increaseCartQuantity(meal);
						}}
						style={tw` px-4 py-2 rounded-2xl font-medium ${
							orderConfirmed ? "bg-gray-300" : "bg-teal-100"
						}`}
						disabled={orderConfirmed}
					>
						<Text style={tw`text-black font-bold `}>
							ADD TO CART
						</Text>
					</Pressable>
				)}
				{quantity !== 0 && (
					<View
						style={tw`flex flex-row flex-wrap  justify-center align-center items-center`}
					>
						<Pressable
							style={tw`mr-8`}
							onPress={() => {
								decreaseCartQuantity(meal);
							}}
							disabled={orderConfirmed}
						>
							<Text
								style={tw`${
									orderConfirmed
										? "text-gray-300"
										: "text-teal-100"
								} text-4xl`}
							>
								-
							</Text>
						</Pressable>
						<Text
							style={tw`text-2xl font-bold ${
								orderConfirmed
									? "text-gray-300"
									: "text-teal-100"
							}`}
						>
							{quantity}
						</Text>
						<Pressable
							style={tw`ml-8`}
							onPress={() => {
								increaseCartQuantity(meal);
							}}
							disabled={orderConfirmed}
						>
							<Text
								style={tw`${
									orderConfirmed
										? "text-gray-300"
										: "text-teal-100"
								} text-4xl`}
							>
								+
							</Text>
						</Pressable>
					</View>
				)}
			</View>
		</View>
	);
};

export default MealCard;
