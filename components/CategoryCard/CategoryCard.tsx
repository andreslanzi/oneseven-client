import { View, Text, Image, TouchableOpacity } from "react-native";
import { Category } from "../../types";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import tw from "twrnc";

type CategoryCardProps = Category & {
	setSelectedCategory: React.Dispatch<
		React.SetStateAction<string | undefined>
	>;
};

const CategoryCard = ({
	strCategory,
	strCategoryThumb,
	setSelectedCategory,
}: CategoryCardProps) => {
	const [fontsLoaded] = useFonts({
		Monserrat: require("../../assets/fonts/Montserrat-Medium.ttf"),
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
			style={tw`flex bg-gray-800 w-full flex-col items-center py-8 px-2 border-b-2`}
			onLayout={onLayoutRootView}
		>
			<TouchableOpacity onPress={() => setSelectedCategory(strCategory)}>
				<Text
					style={[
						tw`text-center text-white font-bold text-3xl mb-6`,
						{ fontFamily: "Monserrat" },
					]}
				>
					{strCategory.toUpperCase()}
				</Text>
				<Image
					source={{ uri: strCategoryThumb }}
					resizeMode={"stretch"}
					style={tw`m-auto rounded-xl w-[300px] h-[150px]`}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default CategoryCard;
