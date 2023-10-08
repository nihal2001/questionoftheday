import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import QuestionScreen from './QuestionScreen';
import AnswerScreen from './AnswerScreen';  // You'll create this next.
import { enableScreens } from 'react-native-screens';

enableScreens();
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Question">
        <Stack.Screen name="Question" component={QuestionScreen} />
        <Stack.Screen name="Answer" component={AnswerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
