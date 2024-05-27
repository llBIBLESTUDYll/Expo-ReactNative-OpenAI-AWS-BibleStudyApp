import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert,
    ActivityIndicator,
    ScrollView,
    Image
} from "react-native";
import { styled, withExpoSnack } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";
import { styles } from '../styles/SavedStyle';
import { em } from '../config/layout';
import Constants from 'expo-constants';
import { useTheme } from '../../constants/ThemeProvider';
// This screen provides functionality for users to create a new Bible study session
const CreateSessionScreen = () => {
    const navigation = useNavigation();

    // State hooks to manage form inputs and other variables
    const [groupType, setGroupType] = useState("");
    const [numberQuestions, setNumberQuestions] = useState("");
    const [numberVerses, setNumberVerses] = useState("");
    const [focusTopic, setFocusTopic] = useState("");
    const [bible, setBible] = useState("");

    // State to ensure component is mounted before setting state on async operations
    const [isMounted, setIsMounted] = useState(true);

    // States to manage API call status
    const [apiResponse, setApiResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { theme, toggleTheme } = useTheme();

    // Effect hook to manage component mount state
    useEffect(() => {
        // No operations to be carried out on mount
        return () => {
            // Component will unmount logic
            setIsMounted(false);
        };
    }, []);

    // Handles the form submission, creating a new session

    const goToBack = () => {
        navigation.goBack();
    }
    return (
        <View className={styles.container} style={{height: '100%', backgroundColor: theme.backgroundColor}}>
            <View className={styles.header}>
                <Ionicons name="arrow-back-sharp" size={30} color={theme.header.icon} onClick={() => goToBack()} />
                <Text className={styles.title} style={{color: theme.header.title}}>My Studies</Text>
                <Image className={styles.avatar} source={require('../../design/avatar.png')}></Image>
            </View>
            <Text className={styles.postar} style={{color: theme.poster}}>Let's Study!</Text>

            <ScrollView showsVerticalScrollIndicator={false} className={styles.scroll}>
                <TouchableOpacity className={styles.questionBox}>
                    <Text className={styles.questionText}>
                        Group Type: Family
                    </Text>
                    <Text className={styles.questionText}>
                        Number of Questions: 4
                    </Text>
                    <Text className={styles.questionText}>
                        Number of Verses per Question: 7
                    </Text>
                    <Text className={styles.questionText}>
                        Focus Topic: Forgiveness
                    </Text>
                    <Text className={styles.questionText}>
                        Preferred Bible: NIV
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity className={styles.questionBox}>
                    <Text className={styles.questionText}>
                        Group Type: Family
                    </Text>
                    <Text className={styles.questionText}>
                        Number of Questions: 4
                    </Text>
                    <Text className={styles.questionText}>
                        Number of Verses per Question: 7
                    </Text>
                    <Text className={styles.questionText}>
                        Focus Topic: Forgiveness
                    </Text>
                    <Text className={styles.questionText}>
                        Preferred Bible: NIV
                    </Text>
                </TouchableOpacity>      
                <TouchableOpacity className={styles.questionBox}>
                    <Text className={styles.questionText}>
                        Group Type: Family
                    </Text>
                    <Text className={styles.questionText}>
                        Number of Questions: 4
                    </Text>
                    <Text className={styles.questionText}>
                        Number of Verses per Question: 7
                    </Text>
                    <Text className={styles.questionText}>
                        Focus Topic: Forgiveness
                    </Text>
                    <Text className={styles.questionText}>
                        Preferred Bible: NIV
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity className={styles.questionBox}>
                    <Text className={styles.questionText}>
                        Group Type: Family
                    </Text>
                    <Text className={styles.questionText}>
                        Number of Questions: 4
                    </Text>
                    <Text className={styles.questionText}>
                        Number of Verses per Question: 7
                    </Text>
                    <Text className={styles.questionText}>
                        Focus Topic: Forgiveness
                    </Text>
                    <Text className={styles.questionText}>
                        Preferred Bible: NIV
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity className={styles.questionBox}>
                    <Text className={styles.questionText}>
                        Group Type: Family
                    </Text>
                    <Text className={styles.questionText}>
                        Number of Questions: 4
                    </Text>
                    <Text className={styles.questionText}>
                        Number of Verses per Question: 7
                    </Text>
                    <Text className={styles.questionText}>
                        Focus Topic: Forgiveness
                    </Text>
                    <Text className={styles.questionText}>
                        Preferred Bible: NIV
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity className={styles.questionBox}>
                    <Text className={styles.questionText}>
                        Group Type: Family
                    </Text>
                    <Text className={styles.questionText}>
                        Number of Questions: 4
                    </Text>
                    <Text className={styles.questionText}>
                        Number of Verses per Question: 7
                    </Text>
                    <Text className={styles.questionText}>
                        Focus Topic: Forgiveness
                    </Text>
                    <Text className={styles.questionText}>
                        Preferred Bible: NIV
                    </Text>
                </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity className={styles.pagenation} disabled>
                <Ionicons className={styles.tag} name="play-skip-back" size={28} color="black" />
                <Ionicons className={styles.tag} name="chevron-back" size={28} color="black" />
                <Text className={styles.pageNum}>1 / 3</Text>
                <Ionicons className={styles.tag} name="chevron-forward" size={28} color="black" />
                <Ionicons className={styles.tag} name="play-skip-forward" size={28} color="black" />
            </TouchableOpacity>
        </View>
        );
};

    // Styles for the CreateSessionScreen
    export default withExpoSnack(CreateSessionScreen);