import Svg, { Path, Circle, Line } from 'react-native-svg';

export default function EyeIcon({ isVisible }) {
    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
        >
            <Path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
            <Circle cx="12" cy="12" r="3" />

            {!isVisible && (
                <Line x1="3" y1="3" x2="21" y2="21" />
            )}
        </Svg>
    );
}