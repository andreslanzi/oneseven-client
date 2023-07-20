import { View, Text, FlatList, Pressable } from "react-native";
import CartCard from "../../components/CartCard";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import tw from "twrnc";

type ConfirmedOrderProps = {
	navigation: any;
};

const ConfirmedOrder = ({ navigation }: ConfirmedOrderProps) => {
	const { cartItems, clearCart, setOrderConfirmed, getCartTotalPrice } =
		useShoppingCart();

	const clearOrder = () => {
		clearCart();
		setOrderConfirmed(false);
		navigation.navigate("MENU");
	};

	return (
		<View style={tw`bg-white w-full flex-1`}>
			<View style={{ flex: 0.9 }}>
				<View style={tw`p-4 bg-teal-800`}>
					<Text style={tw`text-3xl text-center text-white `}>
						Your order is confirmed!
					</Text>
					<Text style={tw`text-sm text-center text-white`}>
						We'll send you the plates as soon as possible!
					</Text>
				</View>
				<View style={tw`flex px-4`}>
					<Text
						style={tw`text-xl text-white bg-teal-500  m-auto px-2 py-2 text-center mb-4 mt-4`}
					>
						Total: USD {getCartTotalPrice()}.00
					</Text>
					<FlatList
						data={cartItems}
						renderItem={({ item: meal }) => (
							<View
								style={tw`w-full justify-center m-auto text-center`}
							>
								<CartCard meal={meal} isOrderComplete={true} />
							</View>
						)}
						keyExtractor={(item) => item.idMeal}
					/>
				</View>
			</View>
			<View style={{ flex: 0.1 }}>
				<Pressable
					style={tw`justify-center items-center m-auto`}
					onPress={clearOrder}
				>
					<View style={tw`bg-teal-800 px-4 py-2 rounded`}>
						<Text style={tw`text-2xl text-white `}>New Order</Text>
					</View>
				</Pressable>
			</View>
		</View>
	);
};

export default ConfirmedOrder;
