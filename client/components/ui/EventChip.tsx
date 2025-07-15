import { lightTheme } from '@/constants/theme';
import { formatDate } from '@/utils/formatDate';
import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-paper';

type IconSource = React.ComponentProps<typeof Icon>['source'];
interface EventChipProps {
	title: string;
	iconSrc: IconSource;
	date: string;

}


const EventChip = ({ title, iconSrc, date }: EventChipProps) => {
	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<View style={styles.title}>
					<Icon source={iconSrc} size={18} />
					<Text
						style={styles.titleText}
						variant="bodyLarge"
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						{title}
					</Text>
				</View>
				<Text style={styles.date} variant="bodySmall">{formatDate(date)}</Text>
			</View>
		</View>
	)
}

export default EventChip;

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderRadius: 12,
		paddingHorizontal: 10,
		paddingVertical: 8
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	title: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	titleText: {
		flexShrink: 1,
		maxWidth: 150,
	},
	date: {
		color: lightTheme.colors.gray,
		fontWeight: "700",
		marginRight: 4
	}
})