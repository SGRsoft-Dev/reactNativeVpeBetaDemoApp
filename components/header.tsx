import * as Ph from "phosphor-react-native";
import * as React from "react";
import { Pressable, SafeAreaView, StatusBar, Text, useColorScheme, View ,StyleSheet } from "react-native";

export default function header(props) {
	const isDarkMode = useColorScheme() === 'dark';
	return (
		<View>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
			<SafeAreaView />
			<View style={{
				backgroundColor:isDarkMode ? '#1f1f1f' : '#ffffff',
				display:'flex',
				flexDirection:'row',
				alignItems:'center',
				padding:15,
				gap:10
			}}>
				<View>
					<Pressable onPress={()=>props.navigation.goBack()} className="p-3">
						<Ph.CaretLeft color={isDarkMode ? '#ffffff' : '#000000'} size={20} />
					</Pressable>
				</View>
				<View style={{flex:1}}>
					<Text style={{
						textAlign:'center',
						fontWeight:'bold',
						color:isDarkMode ? '#ffffff' : '#000000',
					}}>{props.title}</Text>
				</View>
				<View
					style={{
						width:20,
					}}
				></View>
			</View>
		</View>

	)
}
