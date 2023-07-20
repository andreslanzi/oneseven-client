import React from "react";
import { FlatList, View } from "react-native";
import { Meal } from "../../types";
import MealCard from "../../components/MealCard";
import { useScrollToTop } from "@react-navigation/native";
import tw from "twrnc";

type ProductsMenuProps = {
	meals: Meal[];
};

const ProductsMenu = ({ meals }: ProductsMenuProps) => {
	const ref = React.useRef(null);
	useScrollToTop(ref);
	return (
		<View style={tw`bg-gray-900 pt-4`}>
			<FlatList
				ref={ref}
				data={meals}
				numColumns={2}
				ItemSeparatorComponent={() => (
					<View style={{ height: 20, width: 20 }}></View>
				)}
				renderItem={({ item: meal }) => (
					<View style={tw`w-[45%] justify-center m-auto text-center`}>
						<MealCard meal={meal} />
					</View>
				)}
				keyExtractor={(item) => item.idMeal}
			/>
		</View>
	);
};

export default ProductsMenu;
