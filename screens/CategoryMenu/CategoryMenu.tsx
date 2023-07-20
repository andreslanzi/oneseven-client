import React from "react";
import { FlatList, View } from "react-native";
import { Meal } from "../../types";
import MealCard from "../../components/MealCard";
import { useScrollToTop } from "@react-navigation/native";
import tw from "twrnc";

type CategoryMenuProps = {
	categoryMeals: Meal[];
};
const CategoryMenu = ({ categoryMeals }: CategoryMenuProps) => {
	const ref = React.useRef(null);
	useScrollToTop(ref);
	return (
		<View style={tw`bg-teal-800`}>
			<FlatList
				ref={ref}
				data={categoryMeals}
				ItemSeparatorComponent={() => (
					<View style={{ height: 20 }}></View>
				)}
				renderItem={({ item: meal }) => (
					<View>
						<MealCard meal={meal} expanded />
					</View>
				)}
				keyExtractor={(meal) => meal.idMeal}
			/>
		</View>
	);
};

export default CategoryMenu;
