import React from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView } from 'react-native';

const questionsData = [
    { date: '08/16/2023', question: 'Something philosophical?' },
    { date: '08/17/2023', question: 'Example Question 1?' },
    { date: '08/18/2023', question: 'Example Question 2?' },
    { date: '08/20/2023', question: 'Example Question 3?' },
    { date: '08/21/2023', question: 'Example Question 4?' },
    { date: '08/22/2023', question: 'Example Question 5?' },
    { date: '08/23/2023', question: 'Example Question 6?' },
    { date: '08/24/2023', question: 'Example Question 7?' },
    { date: '08/25/2023', question: 'Example Question 8?' },
    { date: '08/26/2023', question: 'Example Question 9?' },
    { date: '08/27/2023', question: 'Example Question 10?' },
    { date: '08/28/2023', question: 'Example Question 11?' },
    { date: '08/29/2023', question: 'Example Question 12?' }
    // ... Add other questions here
];

const QuestionsScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={questionsData}
                keyExtractor={(item) => item.date}
                renderItem={({ item }) => (
                    <View style={styles.questionContainer}>
                        <Text style={styles.dateText}>{item.date}</Text>
                        <Text style={styles.questionText}>{item.question}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5e5e5',
    },
    questionContainer: {
        backgroundColor: '#fff',
        padding: 15,
        margin: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 3,
    },
    dateText: {
        fontSize: 14,
        color: '#777',
        marginBottom: 5,
    },
    questionText: {
        fontSize: 18,
        color: '#333',
    },
});

export default QuestionsScreen;
