import * as React from 'react';
import { View, Text, Image , Pressable, TextInput, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Ionicons from 'react-native-vector-icons/Ionicons';
import Upcomming from './Upcomming';
import Committee from './Committee';
import COLORS from '../constants/color';
import Addevents from './Addevents';
import Upstack from './Upstack';

//Screen names

const Committeename = "Committee";
const Upcommingname = "Upcommingstack";
const Eventname = "EventsCRUD";

const Tab = createBottomTabNavigator();

function MainContainer({ navigation }) {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName={Upcommingname}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === Committeename) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === Upcommingname) {
              iconName = focused ? 'list' : 'list-outline';

            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })
    }
        tabBarOptions={{
          activeTintColor: COLORS.black,
          inactiveTintColor: 'grey',
          labelStyle: { fontSize: 10 },
          style: { padding: 10, height: 30}
        }}>

        <Tab.Screen name={Upcommingname} component={Upstack} />
        <Tab.Screen name={Committeename} component={Committee} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
