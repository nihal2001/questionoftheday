import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AnswerScreen = ({ navigation, route }) => {
    const { question, date, answer } = route.params; // Get the question data from the route params
    const [answerText, setAnswerText] = useState('');

    useEffect(() => {
        const fetchSavedAnswer = async () => {
            console.log(date);
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
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <TextInput
              style={styles.answerInput}
              value={answerText}
              onChangeText={setAnswerText}
              placeholder="Write your answer here..."
              multiline={true} // Allow multiple lines
              numberOfLines={4} // Initially show 4 lines
            />
            <View style={styles.buttonContainer}>
              <Button title="Back" onPress={() => navigation.goBack()} />
              <Button title="Save" onPress={handleSave} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: 'white'
  },
  questionText: {
    fontSize: 24,
    padding: 10,
    textAlign: 'center',
  },
  answerInput: {
    fontSize: 24,
    paddingTop: 10,
    padding: 10,
    fontSize: 16,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row', // Horizontal layout
    justifyContent: 'space-between'
  },
});

export default AnswerScreen;
