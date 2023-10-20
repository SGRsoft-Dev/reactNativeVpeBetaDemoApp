import * as Ph from "phosphor-react-native";
import * as React from "react";
import { Pressable, SafeAreaView, StatusBar, Text, useColorScheme, View } from "react-native";

export default function header(props) {
	const isDarkMode = useColorScheme() === 'dark';
	return (
		<View>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
			<SafeAreaView />
			<View className="bg-white  dark:bg-neutral-900 px-3 py-1 flex flex-row  items-center ">
				<View>
					<Pressable onPress={()=>props.navigation.goBack()} className="p-3">
						<Ph.CaretLeft color={isDarkMode ? '#ffffff' : '#000000'} size={20} />
					</Pressable>
				</View>
				<View className="flex-auto ">
					<Text className="text-center font-bold dark:text-white">{props.title}</Text>
				</View>
				<View className="px-3"></View>
			</View>
		</View>

	)
}
