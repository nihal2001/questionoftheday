import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AnswerScreen = ({ navigation, route }) => {
    const { question } = route.params; // Get the question data from the route params
    const [answerText, setAnswerText] = useState('');

    useEffect(() => {
        const fetchSavedAnswer = async () => {
            const savedAnswer = await AsyncStorage.getItem(`answer_${question.date}`);
            if (savedAnswer) {
                setAnswerText(savedAnswer);
            }
        };

        fetchSavedAnswer();
    }, [question]);

    const handleSave = async () => {
        await AsyncStorage.setItem(`answer_${question.date}`, answerText);
    };
    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.answerInput}
                value={answerText}
                onChangeText={setAnswerText}
                placeholder="Write your answer here..."
                multiline={true} // Allow multiple lines
                numberOfLines={4} // Initially show 4 lines
            />
            <Button title="Save" onPress={handleSave} />
            <Button title="Back" onPress={() => navigation.goBack()} />
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
});

export default AnswerScreen;
