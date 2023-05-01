import React, {useState} from 'react';
import {
  StatusBar,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import {Container, CardItem, Icon} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {COLORS} from '../../Component/Constant/Color';
import Navigation from '../../Service/Navigation';
import uuid from 'react-native-uuid';
import database from '@react-native-firebase/database';
import {useDispatch} from 'react-redux';
import {setUser} from '../../Redux/reducer/user';
import Auth from '../../Service/Auth';

const {width, height} = Dimensions.get('window');

function Register() {
  const dispatch = useDispatch();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');

  const loginUser = async (email, pass) => {
    database()
      .ref('users/')
      .orderByChild('emailId')
      .equalTo(email)
      .once('value')
      .then(async snapshot => {
        if (snapshot.val() == null) {
          return false;
        }
        let userData = Object.values(snapshot.val())[0];
        if (userData?.password != pass) {
          Alert.alert('Invalid Password!');
          return false;
        }
        dispatch(setUser(userData));
        await Auth.setAccount(userData);
      });
  };
  const registerUser = async () => {
    if (name == '' || email == '' || pass == '') {
      Alert.alert('Fill in all the fields!');
      return false;
    }
    let data = {
      id: uuid.v4(),
      name: name,
      emailId: email,
      password: pass,
      img: 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png',
    };

    database()
      .ref('/users/' + data.id)
      .set(data)
      .then(() => {
        setname('');
        setemail('');
        setpass('');
        loginUser(email, pass);
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
        <Text
          style={{
            color: '#fff',
            fontSize: 45,
          }}>
          PicPhrase
        </Text>
      </View>
      <View
        style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
        <KeyboardAwareScrollView
          style={{marginTop: 90}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: width - 30,
            }}>
            <CardItem style={styles.cardView}>
              <View style={{flex: 1}}>
                <Text style={styles.Login}>Register</Text>
                <Text style={styles.smallTxt}>
                  In order to Register your account please fill out all fields
                </Text>
                <View style={[styles.inputContainer, {marginTop: 40}]}>
                  <View style={styles.inputIconView}>
                    <Icon
                      name="person"
                      type="Ionicons"
                      style={{
                        color: '#fff',
                        fontSize: 18,
                        textAlign: 'center',
                      }}
                    />
                  </View>
                  <TextInput
                    style={styles.inputs}
                    placeholder="Enter Full Name"
                    underlineColorAndroid="transparent"
                    onChangeText={value => setname(value)}
                    value={name}
                    placeholderTextColor={COLORS.liteBlack}
                  />
                </View>
                <View style={styles.inputContainer}>
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
                    placeholder="Enter Email Id"
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    onChangeText={value => setemail(value)}
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
                    style={styles.inputs}
                    secureTextEntry={true}
                    placeholder="Enter Password"
                    underlineColorAndroid="transparent"
                    onChangeText={value => setpass(value)}
                    value={pass}
                    placeholderTextColor={COLORS.liteBlack}
                  />
                </View>
                <TouchableOpacity style={styles.btn} onPress={registerUser}>
                  <Text style={styles.btnText}>Register Now</Text>
                </TouchableOpacity>

                <View style={styles.contactView}>
                  <Text style={styles.smallTxt}>Existing user?</Text>
                  <TouchableOpacity
                    style={{marginLeft: 4}}
                    onPress={() => Navigation.navigate('Login')}>
                    <Text style={styles.register}>Login Now</Text>
                  </TouchableOpacity>
                </View>
                <View></View>
              </View>
            </CardItem>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Container>
  );
}

export default Register;

const styles = StyleSheet.create({
  upperCard: {
    height: height / 4,
    backgroundColor: COLORS.theme,
    borderBottomLeftRadius: height / 8,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderRadius: 15,
    paddingBottom: 20,
    paddingTop: 20,
  },
});
