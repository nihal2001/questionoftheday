import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import QuestionScreen from './QuestionScreen';
import AnswerScreen from './AnswerScreen';  // You'll create this next.
import { enableScreens } from 'react-native-screens';
import SignIn from './SignIn';

enableScreens();
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="Question" component={QuestionScreen} options={ { headerShown: false } }/>
        <Stack.Screen name="Answer" component={AnswerScreen} options={ { headerShown: false } }/>
        <Stack.Screen name="SignIn" component={SignIn} options={ { headerShown: false } }/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;