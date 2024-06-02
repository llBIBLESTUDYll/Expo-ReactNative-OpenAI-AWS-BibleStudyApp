import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image
} from "react-native";
import { styled, withExpoSnack } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/SavedStyle';
import { useTheme } from '../../constants/ThemeProvider';
// This screen provides functionality for users to create a new Bible study session
const CreateSessionScreen = () => {
    const navigation = useNavigation();
    const { theme, toggleTheme } = useTheme();

    const goToBack = () => {
        navigation.goBack();
    }
    return (
        <View className={styles.container} style={{height: '100%', backgroundColor: theme.backgroundColor}}>
            <View className={styles.header}>
                <Ionicons name="arrow-back-sharp" size={30} color={theme.header.icon} onClick={() => goToBack()} />
                <Text className={styles.title} style={{color: theme.header.title}}>Community Studies</Text>
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

export default withExpoSnack(CreateSessionScreen);