import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Upcomming from './Upcomming';
import Addevents from './Addevents';

const Stack = createNativeStackNavigator();

export default function Upstack() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName='upcomming'
      >
        <Stack.Screen
          name="upcomming"
          component={Upcomming}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="addevent"
          component={Addevents}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}