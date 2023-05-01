import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import AppStack from './src/Navigation/AppStack';
import AuthStack from './src/Navigation/AuthStack';
import Navigation from './src/Service/Navigation';
import Auth from './src/Service/Auth';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from './src/Redux/reducer/user';

const Stack = createStackNavigator();

export default function App() {
  const dispatch = useDispatch();
  const {login} = useSelector(state => state.User);

  const [loginCheck, setLoginCheck] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      let data = await Auth.getAccount();
      if (data != null) {
        dispatch(setUser(data));
        setLoginCheck(false);
      } else {
        setLoginCheck(false);
      }
    };

    (async () => {
      await getUser();
    })();
  }, []);

  if (loginCheck) {
    return null;
  }

  return (
    <NavigationContainer ref={r => Navigation.setTopLevelNavigator(r)}>
      <Stack.Navigator
        detachInactiveScreens={false}
        initialRouteName="Auth"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        {!login ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          <Stack.Screen name="AppStack" component={AppStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
