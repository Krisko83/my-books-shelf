import { StyleSheet, Text, View } from "react-native";
import Header from "../components/Header.jsx";

export default function AboutAppScreen() {

    return (
        <>
            <Header screenName='About App' />

            <View style={styles.item}>
                <Text style={styles.logo}>&#128214;</Text>
            </View>
            <View style={styles.item}>
                <Text >App version: 1.0.12</Text>
            </View>

        </>
    );
}

const styles = StyleSheet.create({
    item: {
         flexDirection: 'row', 
         justifyContent: 'center' ,
         marginTop: 50
    },
    logo: {
        fontSize: 200,
    },
})