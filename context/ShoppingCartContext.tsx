import { ReactNode, createContext, useContext, useState } from "react";
import { CartItem, Meal } from "../types";

type ShoppingCartProps = {
	children: ReactNode;
};

type ShoppingCartContextProps = {
	getTotalQuantity: () => number;
	getItemQuantity: (id: string) => number;
	increaseCartQuantity: (meal: Meal) => void;
	decreaseCartQuantity: (meal: Meal) => void;
	removeFromCart: (id: string) => void;
	getCartTotalPrice: () => number;
	cartItems: CartItem[];
	clearCart: () => void;
	orderConfirmed: boolean;
	setOrderConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

export const useShoppingCart = () => {
	return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({ children }: ShoppingCartProps) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [orderConfirmed, setOrderConfirmed] = useState(false);

	const getTotalQuantity = () => {
		let total = 0;
		cartItems.forEach((item) => (total += item.quantity));
		return total;
	};

	const getItemQuantity = (id: string) => {
		return cartItems.find((item) => item.idMeal === id)?.quantity || 0;
	};

	const increaseCartQuantity = async (meal: Meal) => {
		setCartItems((currItems) => {
			if (currItems.find((item) => item.idMeal === meal.idMeal) == null) {
				return [...currItems, { ...meal, quantity: 1 }];
			} else {
				return currItems.map((item) => {
					if (item.idMeal === meal.idMeal) {
						return { ...item, quantity: item.quantity + 1 };
					} else {
						return item;
					}
				});
			}
		});
	};

	const decreaseCartQuantity = (meal: Meal) => {
		setCartItems((currItems) => {
			if (
				currItems.find(
					(item) => item.idMeal === meal.idMeal && item.quantity === 1
				)
			) {
				return currItems.filter((item) => item.idMeal !== meal.idMeal);
			} else {
				return currItems.map((item) => {
					if (item.idMeal === meal.idMeal) {
						return { ...item, quantity: item.quantity - 1 };
					} else {
						return item;
					}
				});
			}
		});
	};

	const removeFromCart = (id: string) => {
		setCartItems((currItems) => {
			return currItems.filter((item) => item.idMeal !== id);
		});
	};

	const getCartTotalPrice = () => {
		return cartItems.reduce(
			(acc, current) => acc + current.quantity * Number(current.price),
			0
		);
	};

	const clearCart = () => {
		return setCartItems([]);
	};

	return (
		<ShoppingCartContext.Provider
			value={{
				getItemQuantity,
				increaseCartQuantity,
				decreaseCartQuantity,
				removeFromCart,
				getTotalQuantity,
				getCartTotalPrice,
				cartItems,
				clearCart,
				orderConfirmed,
				setOrderConfirmed,
			}}
		>
			{children}
		</ShoppingCartContext.Provider>
	);
};
