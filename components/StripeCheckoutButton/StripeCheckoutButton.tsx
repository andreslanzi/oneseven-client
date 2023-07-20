import { Alert, Pressable, Text } from "react-native";
import { useEffect, useState } from "react";
import { useStripe } from "@stripe/stripe-react-native";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import tw from "twrnc";

type StripeCheckoutButtonProps = {
	cartTotal: number;
};

export default function StripeCheckoutButton({
	cartTotal,
}: StripeCheckoutButtonProps) {
	const { initPaymentSheet, presentPaymentSheet } = useStripe();
	const [loading, setLoading] = useState(false);
	const { setOrderConfirmed } = useShoppingCart();

	const fetchPaymentSheetParams = async () => {
		const response = await fetch(`http://192.168.0.37:3000/payment-sheet`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				amount: cartTotal,
			}),
		});

		const { paymentIntent, ephemeralKey, customer } = await response.json();

		return {
			paymentIntent,
			ephemeralKey,
			customer,
		};
	};

	const initializePaymentSheet = async () => {
		const { paymentIntent, ephemeralKey, customer } =
			await fetchPaymentSheetParams();

		const { error } = await initPaymentSheet({
			merchantDisplayName: "Example, Inc.",
			customerId: customer,
			customerEphemeralKeySecret: ephemeralKey,
			paymentIntentClientSecret: paymentIntent,
			allowsDelayedPaymentMethods: true,
			defaultBillingDetails: {
				name: "Jane Doe",
			},
		});
		if (!error) {
			setLoading(true);
		}
	};

	const openPaymentSheet = async () => {
		const { error } = await presentPaymentSheet();

		if (error) {
			Alert.alert(
				"Payment Error",
				`${error.message}. Please try again.`,
				[
					{
						text: "Back",
						style: "cancel",
					},
				]
			);
		} else {
			setOrderConfirmed(true);
		}
	};

	useEffect(() => {
		initializePaymentSheet();
	}, [cartTotal]);

	return (
		<Pressable
			disabled={!loading}
			onPress={openPaymentSheet}
			style={tw`bg-green-600 rounded px-2 py-2`}
		>
			<Text style={tw`text-white text-2xl`}>Checkout</Text>
		</Pressable>
	);
}
