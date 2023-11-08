import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, FlatList, SafeAreaView } from 'react-native';

const QuestionsScreen = ({ navigation, route }) => {
    const { userId } = route.params || {};
    const [questionsData, setQuestionsData] = useState([]);
    const [lastQuestionDate, setLastQuestionDate] = useState('');

    // Initial fetch for the latest question
    useEffect(() => {
        fetch('http://localhost:5098/api/questions/latest')
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setQuestionsData([{
                        id: data.id,
                        date: new Date(data.date).toLocaleDateString(),
                        question: data.content
                    }]);
                    setLastQuestionDate(data.date);
                }
            })
            .catch(error => console.error('Error fetching latest question:', error));
    }, [userId]);

    // Function to fetch more questions
    const fetchMoreQuestions = () => {
        if (lastQuestionDate) {
            fetch(`http://localhost:5098/api/questions/countDate?date=${lastQuestionDate}&number=5`)
                .then(response => response.json())
                .then(newQuestions => {
                    const moreQuestions = newQuestions.map(q => ({
                        id: q.id,
                        date: new Date(q.date).toLocaleDateString(),
                        question: q.content
                    }));
                    // Concatenate new questions to the current list
                    setQuestionsData(questionsData.concat(moreQuestions));
                    // Update lastQuestionDate to the date of the last question fetched
                    if (moreQuestions.length > 0) {
                        setLastQuestionDate(moreQuestions[moreQuestions.length - 1].date);
                    }
                })
                .catch(error => console.error('Error fetching more questions:', error));
        }
    };

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
                onEndReached={fetchMoreQuestions}
                onEndReachedThreshold={0.5} // You can adjust this value as needed
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
    shadowOffset: {width: 0, height: 2},
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
  },
});

export default QuestionsScreen;
