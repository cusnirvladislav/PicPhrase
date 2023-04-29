import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import AppStack from './src/Navigation/AppStack';
import AuthStack from './src/Navigation/AuthStack';
import {COLORS} from './src/Component/Constant/Color';
import Navigation from './src/Service/Navigation';
import {NativeBaseProvider} from 'native-base';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer ref={r => Navigation.setTopLevelNavigator(r)}>
      <NativeBaseProvider>
        <Stack.Navigator
          // headerMode="none"
          detachInactiveScreens={false}
          initialRouteName="Auth"
          screenOptions={{
            // headerMode: 'none',
            cardStyle: {backgroundColor: COLORS.white},
            gestureEnabled: true,
            // backgroundColor: COLORS.button,
            // gestureDirection: 'horizontal',
            ...TransitionPresets.SlideFromRightIOS,
          }}>
          <Stack.Screen name="Auth" component={AuthStack} />
          {/*<Stack.Screen name="AppStack" component={AppStack} />*/}
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
