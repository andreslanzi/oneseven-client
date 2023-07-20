import { View, FlatList, Text, Pressable } from "react-native";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import CartCard from "../../components/CartCard";
import StripeCheckoutButton from "../../components/StripeCheckoutButton";
import ConfirmedOrder from "../ConfirmedOrder";
import tw from "twrnc";

const Cart = ({ navigation }: any) => {
	const { cartItems, getCartTotalPrice, clearCart, orderConfirmed } =
		useShoppingCart();

	if (orderConfirmed) {
		return <ConfirmedOrder navigation={navigation} />;
	}

	return cartItems.length > 0 ? (
		<View style={tw`bg-teal-800 h-full w-full flex-1`}>
			<View style={{ flex: 0.9 }}>
				<FlatList
					data={cartItems}
					renderItem={({ item: meal }) => (
						<View
							style={tw`w-full justify-center m-auto text-center`}
						>
							<CartCard meal={meal} />
						</View>
					)}
					ItemSeparatorComponent={() => (
						<View style={tw`border-2 border-teal-400 `}></View>
					)}
					keyExtractor={(item) => item.idMeal}
				/>
			</View>
			<View
				// style={{ flex: 0.1 }}
				style={tw`flex basis-1/10 flex-row justify-between items-center px-2`}
			>
				<Text
					style={tw`bg-gray-800 text-white rounded px-2 py-2 text-lg`}
				>
					Total: ${getCartTotalPrice()}.00
				</Text>

				<StripeCheckoutButton
					cartTotal={Number(getCartTotalPrice() + "00")}
				/>

				<Pressable
					style={tw`bg-rose-600 rounded px-2 py-2`}
					onPress={() => clearCart()}
				>
					<Text style={tw`text-xl text-white`}> Clear Cart</Text>
				</Pressable>
			</View>
		</View>
	) : (
		<View
			style={tw`bg-teal-400 h-full w-full flex-1 justify-center items-center`}
		>
			<Text style={tw`text-2xl mb-8`}>No items in your cart!</Text>
			<Pressable
				onPress={() => navigation.navigate("MENU")}
				style={tw`bg-gray-800 p-4 rounded-2xl`}
			>
				<Text style={tw`text-teal-400 text-2xl`}>Return to menu</Text>
			</Pressable>
		</View>
	);
};

export default Cart;
