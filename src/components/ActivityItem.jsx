import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme.js";
import {Classic} from "@/components/loading-ui/classic"

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

// export default function ActivityItem() {

//     return (
//         <View style={styles.activityIndicator}>
//             <Classic size='Large' color={colors.primary} />
//             <Text>{action}</Text>
//         </View>
//     )


// }



const styles = StyleSheet.create({
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})