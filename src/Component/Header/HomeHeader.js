import {Icon} from 'native-base';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../Constant/Color';
import Auth from '../../Service/Auth';
import {removeUser} from '../../Redux/reducer/user';

const HomeHeader = () => {
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.User);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 15,
        backgroundColor: COLORS.white,
        elevation: 2,
        paddingVertical: 15,
      }}>
      <Text style={styles.logo}>PicPhrase</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          name="log-out-outline"
          type="Ionicons"
          style={{color: COLORS.theme, marginRight: 7}}
          onPress={async () => {
            await Auth.logout();
            dispatch(removeUser());
          }}
        />
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  logo: {
    // fontFamily: FONTS.Bold,
    color: COLORS.theme,
    fontSize: 22,
  },
});
