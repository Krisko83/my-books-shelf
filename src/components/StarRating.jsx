import { Pressable, View } from "react-native"
import { colors } from "../../theme.js";
import { Ionicons } from "@expo/vector-icons";

export default function StarRating({ onChange, rating }) {
    const stars = [1, 2, 3, 4, 5];
 
    return (
        <View style={{ color: colors.gold, fontSize: 29, marginBottom: 22, flexDirection: 'row', gap: 20 }}>
            {stars.map(star => (
                <Pressable
                    key={star}
                    onPress={() => onChange(star)}
                >
                    <Ionicons
                        name={star <= rating ? 'star' : 'star-outline'}
                        size={32}
                        color='#F5B50A'
                    />
                </Pressable>
            ))}

        </View>
    );
}