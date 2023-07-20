import { View, Text, Image, Pressable } from "react-native";
import { Meal } from "../../types";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import tw from "twrnc";

type CartCardProps = {
	meal: Meal;
	isOrderComplete?: boolean;
};

const CartCard = ({ meal, isOrderComplete }: CartCardProps) => {
	const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity } =
		useShoppingCart();
	const quantity = getItemQuantity(meal.idMeal);
	return (
		<View
			style={tw`flex flex-row w-[100%] py-4 px-2 m-auto items-center ${
				isOrderComplete
					? "bg-white justify-around border-b-2 border-teal-400"
					: "bg-gray-800 justify-between"
			}`}
		>
			{isOrderComplete && <Text style={tw`text-xl`}>{quantity}x</Text>}
			<Image
				source={{ uri: meal.strMealThumb }}
				style={tw`w-[20%] h-[70px] rounded-2xl`}
				resizeMode={"cover"}
			/>
			<Text
				style={tw`text-center w-[40%] font-bold font-bold text-xs ${
					isOrderComplete ? "" : "text-white"
				}`}
			>
				{meal.strMeal}
			</Text>
			{quantity !== 0 && !isOrderComplete && (
				<View style={tw`flex flex-col`}>
					<View
						style={tw`flex flex-row flex-wrap justify-center align-center items-center`}
					>
						<Pressable
							onPress={() => {
								decreaseCartQuantity(meal);
							}}
						>
							<Text style={tw`text-teal-400 text-4xl mr-2`}>
								-
							</Text>
						</Pressable>
						<Text style={tw`text-2xl text-teal-400 font-bold`}>
							{quantity}
						</Text>
						<Pressable
							onPress={() => {
								increaseCartQuantity(meal);
							}}
						>
							<Text style={tw`text-teal-400 text-4xl ml-2`}>
								+
							</Text>
						</Pressable>
					</View>
					{/* <Text style={tw`text-teal-400">x{meal.price}.00</Text> */}
					<Text style={tw`text-teal-400 text-center`}>
						{meal.price * quantity}.00
					</Text>
				</View>
			)}
		</View>
	);
};

export default CartCard;
