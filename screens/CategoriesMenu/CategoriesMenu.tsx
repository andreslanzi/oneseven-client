import React from "react";
import { FlatList, View } from "react-native";
import { Category, Meal } from "../../types";
import CategoryCard from "../../components/CategoryCard";
import CategoryMenu from "../CategoryMenu";
import { useScrollToTop, useFocusEffect } from "@react-navigation/native";
import tw from "twrnc";

type CategoriesMenuProps = {
	meals: Meal[];
	categories: Category[];
	setSelectedCategory: React.Dispatch<
		React.SetStateAction<string | undefined>
	>;
	selectedCategory: string | undefined;
};

const CategoriesMenu = ({
	meals,
	categories,
	setSelectedCategory,
	selectedCategory,
}: CategoriesMenuProps) => {
	const ref = React.useRef(null);
	useScrollToTop(ref);

	useFocusEffect(
		React.useCallback(() => {
			return () => setSelectedCategory(undefined);
		}, [])
	);

	const getCategoryProducts = () => {
		return meals.filter((p) => p.category === selectedCategory);
	};

	return selectedCategory ? (
		<CategoryMenu categoryMeals={getCategoryProducts()} />
	) : (
		<View style={tw`bg-teal-800`} ref={ref}>
			<FlatList
				ref={ref}
				data={categories}
				ItemSeparatorComponent={() => (
					<View style={{ height: 20 }}></View>
				)}
				renderItem={({ item: category }) => (
					<View style={tw`w-full items-center justify-center m-auto`}>
						<CategoryCard
							idCategory={category.idCategory}
							strCategory={category.strCategory}
							strCategoryThumb={category.strCategoryThumb}
							strCategoryDescription={
								category.strCategoryDescription
							}
							setSelectedCategory={setSelectedCategory}
						/>
					</View>
				)}
				keyExtractor={(item) => item.idCategory}
			/>
		</View>
	);
};

export default CategoriesMenu;
