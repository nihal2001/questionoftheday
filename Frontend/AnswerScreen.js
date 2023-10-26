import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';


const AnswerScreen = ({ navigation, route }) => {
    const { question, date, answer } = route.params; // Get the question data from the route params
    const [answerText, setAnswerText] = useState('');

    

    useEffect(() => {
        const fetchSavedAnswer = async () => {
            console.log(`answer_${date}`);
            const savedAnswer = await AsyncStorage.getItem(`answer_${date}`);
            if (savedAnswer) {
                setAnswerText(savedAnswer);
            }
        };

        fetchSavedAnswer();
    }, [question]);

    const handleSave = async () => {
        await AsyncStorage.setItem(`answer_${date}`, answerText);
    };
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.questionText}>{question}</Text>
            <TextInput
                style={styles.answerInput}
                value={answerText}
                onChangeText={setAnswerText}
                placeholder="Write your answer here..."
                multiline={true} // Allow multiple lines
                numberOfLines={4} // Initially show 4 lines
            />
            <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.goBack()}>
                    <Icon name="chevron-back" size={30} color="#000" />
                </TouchableOpacity>                
                <TouchableOpacity style={styles.centerIcon} onPress={handleSave}>
                    <Icon name="checkmark" size={30} color="#000" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    questionText: {
        fontSize: 18,
        marginBottom: 10,
    },
    answerInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 16,
        flex: 1,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10
        },
    centerIcon: {
        alignItems: 'center',
        flex: 1,
    }
});

export default AnswerScreen;
