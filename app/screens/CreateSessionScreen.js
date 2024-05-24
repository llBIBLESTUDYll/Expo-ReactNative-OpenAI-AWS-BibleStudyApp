import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert,
    ActivityIndicator
} from "react-native";
import axios from "axios";
import Constants from 'expo-constants';
// This screen provides functionality for users to create a new Bible study session
const CreateSessionScreen = ({ navigation }) => {

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

    // Effect hook to manage component mount state
    useEffect(() => {
        // No operations to be carried out on mount
        return () => {
            // Component will unmount logic
            setIsMounted(false);
        };
    }, []);

    // Handles the form submission, creating a new session
    const handleCreateSession = async () => {
        // Indicate loading and reset error state
        setLoading(true);
        setError(null);
        let session_focus = ""; // Initialize session focus string
        // Append focus topic to the session focus if provided
        if (focusTopic) {
            session_focus = "Focus the questions on the topic of " + focusTopic + ".";
        }
        try {
            // Make an API call to generate session questions and verses
            const completion = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    messages: [
                        {
                            role: "system",
                            content:
                                "You are an experienced Christian Pastor that assists users in creating bible studies. Your job is to take the given instructions and generate relevant questions and verses and return it in JSON format",
                        },
                        // Example hardcoded message, should be adjusted according to real application logic
                        {
                            role: "user",
                            content:
                                `Generate ${numberQuestions} thought-provoking Bible Study questions for ${groupType}. Provide the question and ${numberVerses} of the most relevant bible verses that help the group answer the question. Provide the bible text from the ${bible} bible. ${session_focus}`,
                        },
                    ],
                    model: "gpt-4-0125-preview",
                    response_format: { type: "json_object" },
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Headers':
                        'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                        'Access-Control-Allow-Methods': 'OPTIONS,POST',
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Origin': '*',
                        'X-Requested-With': '*',
                        Authorization: `Bearer sk-proj-vEC7LFZKrZmlyJwOUwMeT3BlbkFJXI6I5oxlbNddcqP46ayg`,
                    },
                }
            );
            // Assuming API call succeeded and you got the response
            // Extract and navigate with the question data
            const question_data = JSON.parse(completion.data.choices[0].message.content);
            //completion.data.choices[0].message.content;
            if (isMounted && (!question_data.error && !question_data.Error) ) {
                navigation.navigate("ActiveSession", { questions: question_data });
            }
            if(isMounted && (question_data.error || question_data.Error)) {
                let errorMessage = question_data.error;
                setError(errorMessage);
                Alert.alert("Error", errorMessage);
            }
            setLoading(false);
        } catch (e) {
            // Handle any errors that occur during session creation
            console.log(e);

            let errorMessage = "An unexpected error occurred. Please try again later.";

            if (e.response) {

                // The request was made and the server responded with a status code that falls out of the range of 2xx
                errorMessage = `Server responded with status ${e.response.status}: ${e.response.statusText}`;

            } else if (e.request) {

                // The request was made but no response was received
                errorMessage = "No response from server. Please check your network connection.";

            } else if (e.message.includes("network")) {
                errorMessage = "Network error. Please check your internet connection.";
            }

            if (isMounted) {
                setError(errorMessage);
                Alert.alert("Error", errorMessage);
            }

        } finally {

            // Ensure we don't set state if the component has unmounted
            if (isMounted) {
                setLoading(false);
            }
        };
    }
        return (

            <View style={styles.container}>
                {error && <Text style={styles.errorMessage}>{error}</Text>}

                {/* Form fields to create a new Bible study session */}
                <Text style={styles.inputLabel}>Group Type</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setGroupType}
                    value={groupType}
                    placeholder="Enter Group Type (eg. Family)"
                    placeholderTextColor="grey"
                />

                <Text style={styles.inputLabel}>Number of Questions</Text>
                <TextInput
                    keyboardType="numeric"
                    style={styles.input}
                    onChangeText={setNumberQuestions}
                    value={numberQuestions}
                    placeholder="Enter Desired Number of Questions (eg. 3)"
                    placeholderTextColor="grey"
                />

                <Text style={styles.inputLabel}>Number of Verses per Question</Text>
                <TextInput
                    keyboardType="numeric"
                    style={styles.input}
                    onChangeText={setNumberVerses}
                    value={numberVerses}
                    placeholder="Enter Desired Number of Verses per Question (eg. 5)"
                    placeholderTextColor="grey"
                />

                <Text style={styles.inputLabel}>Focus Topic (Optional)</Text>
                <TextInput
                    multiline
                    numberOfLines={2}
                    style={styles.input}
                    onChangeText={setFocusTopic}
                    value={focusTopic}
                    placeholder="Enter Focus Topic (eg. Forgiveness) (Leave Blank for Program to Select Suitable Topic)"
                    placeholderTextColor="grey"
                />

                <Text style={styles.inputLabel}>Preferred Bible</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setBible}
                    value={bible}
                    placeholder="Enter Preferred Bible (eg. NIV)"
                    placeholderTextColor="grey"
                />

                {/* Button to submit the form and create a new session */}
                <TouchableOpacity style={styles.button} onPress={handleCreateSession}>
                {loading ? <ActivityIndicator animating = {true} size="small" color="#fff" /> : 
                    <Text style={styles.buttonText}>Create Session</Text>
                }
                </TouchableOpacity>
            </View>
        );
    };

    // Styles for the CreateSessionScreen
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "white",
            padding: 10,
        },
        inputLabel: {
            fontSize: 13,
            marginTop: 10,
            marginBottom: 10,
        },
        input: {
            paddingVertical: 4,
            borderColor: "#444444",
            borderWidth: 1,
            borderRadius: 10,
            paddingLeft: 10,
            placeholderTextColor: 'grey'
        },
        button: {
            backgroundColor: "#444444",
            padding: 15,
            borderRadius: 10,
            marginTop: 20,
        },
        buttonText: {
            color: "#fff",
            textAlign: "center",
            fontSize: 16,
        },
        errorMessage: {
            color: "red",
            fontSize: 16,
            marginTop: 20,
            marginBottom: 20,
            textAlign: "center",
        },
    });
    export default CreateSessionScreen;