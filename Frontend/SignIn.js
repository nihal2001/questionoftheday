import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const SignIn = ({ navigation }) => {
    const [username, setUsername] = useState('');

    const handleSignIn = async () => {

        // A temporary "sign in"
        if (username) {
            try {
                let response = await fetch(
                    `http://localhost:5098/api/users/getOrCreate?username=${username}`,
                    {
                        method: 'POST',
                    }
                );
    
                let data = await response.text();
                
                console.log(data);

                if (data && data.id) {
                    navigation.navigate('Question', { userId: data.id });
                } else {
                    // Handle any error or unexpected response here
                }

                navigation.navigate('Question', { userId: data });

            } catch (error) {
                console.error('There was an error calling the API', error);
            }
        }

        
    };
    

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Enter Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />
            <Button title="Sign In" onPress={handleSignIn} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
    },
});

export default SignIn;
