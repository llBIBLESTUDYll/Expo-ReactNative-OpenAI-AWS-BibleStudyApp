import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert,
    ActivityIndicator,
    ScrollView,
    Image,
    FlatList,
} from "react-native";
import { fontScale, styled, withExpoSnack } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";
import { styles } from '../styles/SavedStyle';
import { em } from '../config/layout';
import Constants from 'expo-constants';
import { useTheme } from '../../constants/ThemeProvider';
import  {Auth, API}  from 'aws-amplify';
// This screen provides functionality for users to create a new Bible study session
const CreateSessionScreen = () => {
    const navigation = useNavigation();

    // State hooks to manage form inputs and other variables
    const [sessions, setSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const nextPageIdentifierRef = useRef(1);
    const [isFirstPageReceived, setIsFirstPageReceived] = useState(false);
    const { theme, toggleTheme } = useTheme();

    // Effect hook to manage component mount state
    useEffect(() => {
        fetchData()
        return () => {
            // Component will unmount logic
            setIsMounted(false);
        };
    }, []);

    const fetchData = () => {
        console.log('fetchdata')
        setIsLoading(true);

        Auth.currentAuthenticatedUser().then( async user => {
            const data = await API.get('secondTestForBible', `/session?username=${user.username}&page=${nextPageIdentifierRef.current}`)
            const preData = await API.get('secondTestForBible', `/session?username=${user.username}&page=${nextPageIdentifierRef.current + 1}`)
            preData.length ? nextPageIdentifierRef.current = nextPageIdentifierRef.current + 1 : nextPageIdentifierRef.current = null;
            console.log('this is the fetchdata', data, preData.length, nextPageIdentifierRef);
            await setSessions([...sessions, ...data]);
        })
        setIsLoading(false);
        !isFirstPageReceived && setIsFirstPageReceived(true);
    };
    
    const fetchNextPage = () => {
        console.log('this is fetchNextPage', nextPageIdentifierRef)
        if (nextPageIdentifierRef.current == null) {
          // End of data.
          return;
        }
        fetchData();
    };

    const getRestion = async (item) => {
        let restion = []
        let questions = await API.get('secondTestForBible', `/session/question?session_id=${item.id}`)
        questions = questions.map(async question => {
            question['verses'] = API.get('secondTestForBible', `/session/verses?question_id=${question.id}`)
            return question
        })
        console.log('this is the getRestion', questions)
        let i = 0;
        for (const promise of questions) {
            const questionData = await promise;
            restion[i] = {}
            restion[i]['question'] = questionData.question;
            restion[i++]['verses'] = await questionData.verses;
        }
        console.log('this is the getRestion', restion)

        navigation.navigate("ActiveSession", { questions: {BibleStudy: {questions: restion}}, from: 'mystudies' });
    }

    const renderItem = ({ item }) => {
        return  <TouchableOpacity className={styles.questionBox} onPress={() => getRestion(item)}>
                    <View style={{width: '100%', justifyContent: 'center', borderBlockColor: '#fff', borderBottomWidth: 0.1, paddingBottom: 10, marginBottom: 10}}>
                        <Text className={styles.questionTitle}>
                            {item.title}
                        </Text>
                    </View>
                    <Text className={styles.questionText}>
                        Group Type: {item.groupType}
                    </Text>
                    <Text className={styles.questionText}>
                        Number of Questions: {item.questionCount}
                    </Text>
                    <Text className={styles.questionText}>
                        Number of Verses per Question: {item.versesCount}
                    </Text>
                    <Text className={styles.questionText}>
                        Focus Topic: {item.topic}
                    </Text>
                    <Text className={styles.questionText}>
                        Preferred Bible: {item.prefered}
                    </Text>
                </TouchableOpacity>;
      };
    
    const ListEndLoader = () => {
        if (!isFirstPageReceived && isLoading) {
            return <ActivityIndicator animating = {true} size="small" color={theme.loading} />;
        }
    };

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
            {(!isFirstPageReceived) ?
                <View style={{marginTop: 100}}>
                    <ActivityIndicator animating = {true} size="small" color={theme.loading} />
                </View>
                :
                <FlatList
                    data={sessions}
                    renderItem={renderItem}
                    onEndReached={fetchNextPage}
                    onEndReachedThreshold={0.8}
                    ListFooterComponent={ListEndLoader}
                />
            }
        </View>
        );
};

    // Styles for the CreateSessionScreen
    export default withExpoSnack(CreateSessionScreen);