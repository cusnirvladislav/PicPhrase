import React, {useState} from 'react';
import {
  StatusBar,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import {Container, CardItem, Icon} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {COLORS} from '../../Component/Constant/Color';
import Navigation from '../../Service/Navigation';
import database from '@react-native-firebase/database';
import {useDispatch} from 'react-redux';
import {setUser} from '../../Redux/reducer/user';
import Auth from '../../Service/Auth';

const {width, height} = Dimensions.get('window');

function Login() {
  const dispatch = useDispatch();
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');

  const loginUser = async () => {
    if (email === '' && pass === '') {
      return Alert.alert('The fields is required');
    }

    if (email === '') {
      return Alert.alert('The email field is required');
    }

    if (pass === '') {
      return Alert.alert('The passcode field is required');
    }

    database()
      .ref('users/')
      .orderByChild('emailId')
      .equalTo(email)
      .once('value')
      .then(async snapshot => {
        if (snapshot.val() == null) {
          Alert.alert('Invalid Email!');
          return false;
        }
        let userData = Object.values(snapshot.val())[0];
        if (userData?.password !== pass) {
          Alert.alert('Invalid Password!');
          return false;
        }
        dispatch(setUser(userData));
        await Auth.setAccount(userData);
      });
  };

  return (
    <Container>
      <StatusBar
        backgroundColor={COLORS.theme}
        barStyle="light-content"
        hidden={false}
      />
      <View style={styles.upperCard}>
        <Text style={styles.upperCardTitle}>PicPhrase</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
        <KeyboardAwareScrollView
          style={{marginTop: 90}}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: width - 30,
            }}>
            <CardItem style={styles.cardView}>
              <View style={{flex: 1}}>
                <Text style={styles.Login}>Login</Text>
                <Text style={styles.smallTxt}>
                  In order to login your account please enter credentials
                </Text>

                <View style={[styles.inputContainer, {marginTop: 40}]}>
                  <View style={styles.inputIconView}>
                    <Icon
                      name="gmail"
                      type="MaterialCommunityIcons"
                      style={{
                        color: '#fff',
                        fontSize: 18,
                        textAlign: 'center',
                      }}
                    />
                  </View>
                  <TextInput
                    style={styles.inputs}
                    autoCapitalize="none"
                    placeholder="Enter Email Id"
                    keyboardType="email-address"
                    underlineColorAndroid="transparent"
                    onChangeText={value => {
                      setemail(value);
                    }}
                    value={email}
                    placeholderTextColor={COLORS.liteBlack}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.inputIconView}>
                    <Icon
                      name="key"
                      type="MaterialCommunityIcons"
                      style={{
                        color: '#fff',
                        fontSize: 18,
                        textAlign: 'center',
                      }}
                    />
                  </View>
                  <TextInput
                    secureTextEntry={true}
                    style={styles.inputs}
                    placeholder="Enter Password"
                    underlineColorAndroid="transparent"
                    onChangeText={value => {
                      setpass(value);
                    }}
                    value={pass}
                    placeholderTextColor={COLORS.liteBlack}
                  />
                </View>
                <TouchableOpacity style={styles.btn} onPress={loginUser}>
                  <Text style={styles.btnText}>Login Now</Text>
                </TouchableOpacity>
                <View style={styles.contactView}>
                  <Text style={styles.smallTxt}>New user?</Text>
                  <TouchableOpacity
                    style={{marginLeft: 4}}
                    onPress={() => Navigation.navigate('Register')}>
                    <Text style={styles.register}>Register Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </CardItem>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Container>
  );
}

export default Login;

const styles = StyleSheet.create({
  upperCard: {
    height: height / 4,
    backgroundColor: COLORS.theme,
    borderBottomRightRadius: height / 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperCardTitle: {
    color: '#fff',
    fontSize: 45,
  },
  logo: {
    height: height / 2 - 50,
    width: '95%',
    resizeMode: 'cover',
    borderRadius: 13,
  },
  loginBtn: {
    height: 48,
    width: '95%',
    backgroundColor: COLORS.theme,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  loginText: {
    color: COLORS.lightgray,
    fontSize: 18,
  },
  buttonSec: {marginTop: 20, justifyContent: 'center', alignItems: 'center'},
  inputs: {
    borderBottomColor: COLORS.white,
    flex: 1,
    color: COLORS.liteBlack,
    paddingLeft: 10,
  },
  inputContainer: {
    borderRadius: 30,
    borderColor: COLORS.theme,
    borderWidth: 1,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginBottom: 10,
    elevation: 2,
  },
  inputIconView: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.theme,
    height: '100%',
    borderRadius: 30,
    alignSelf: 'center',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    elevation: 2,
  },
  smallTxt: {
    fontSize: 13,
    color: COLORS.black,
    marginTop: 10,
    opacity: 0.5,
    textAlign: 'center',
  },
  register: {
    fontSize: 13,
    marginTop: 12,
    textAlign: 'center',
    color: COLORS.textInput,
    textDecorationLine: 'underline',
  },
  contactView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 2,
  },
  btn: {
    backgroundColor: COLORS.theme,
    width: '100%',
    height: 50,
    borderRadius: 30,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Login: {
    alignSelf: 'center',
    color: COLORS.textInput,
    fontSize: 20,
    marginTop: 10,
  },
  cardView: {
    backgroundColor: '#fff',
    paddingBottom: 20,
    paddingTop: 20,
  },
});
