import { View, Text, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const em = height / width;
