import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme.js"; 

export default function ActivityItem({
    action = 'Loading...'
}) {

    return (
        <View style={styles.activityIndicator}>
            <ActivityIndicator size='Large' color={colors.primary} />
            <Text>{action}</Text>
        </View>
    );
} 


const styles = StyleSheet.create({
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})