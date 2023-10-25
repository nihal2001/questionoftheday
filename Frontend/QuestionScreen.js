import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, View, Text, FlatList, SafeAreaView } from 'react-native';

const QuestionsScreen = ({ navigation, route }) => {
    const { userId } = route.params || {};
    
    const [questionsData, setQuestionsData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5098/api/questions/user/${userId}`)
            .then(response => response.json())
            .then(data => {
                const formattedData = data.questions.map(q => ({
                    id: q.id,
                    date: new Date(q.date).toLocaleDateString(),
                    question: q.question,
                    answer: q.answer !== null ? q.answer : undefined
                }));
                setQuestionsData(formattedData);
            })
            .catch(error => console.error('Error fetching questions:', error));
    }, [userId]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.userIdText}>ID: {userId}</Text>
            <FlatList
                data={questionsData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.questionContainer}
                        onPress={() => navigation.navigate('Answer', {
                            question: item.question,
                            date: item.date,
                            answer: item.answer 
                        })}
                    >
                        <Text style={styles.dateText}>{item.date}</Text>
                        <Text style={styles.questionText}>{item.question}</Text>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity 
                style={styles.signInButton}
                onPress={() => navigation.navigate('SignIn')}
            >
                <Text>Sign In</Text>
            </TouchableOpacity>
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
    signInButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        padding: 15,
        backgroundColor: 'lightgray',
        borderRadius: 8,
    }   
});

export default QuestionsScreen;
