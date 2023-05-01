import {Icon} from 'native-base';
import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {COLORS} from '../Constant/Color';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import Navigation from '../../Service/Navigation';

// create a component
const ChatHeader = props => {
  const {data} = props;

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.theme}
        translucent={false}
      />
      <Icon
        style={{
          marginHorizontal: 10,
          color: COLORS.white,
        }}
        name="chevron-back"
        type="Ionicons"
        onPress={() => Navigation.back()}
      />
      <Avatar source={{uri: data.img}} rounded size="small" />

      <View style={{flex: 1, marginLeft: 10}}>
        <Text
          numberOfLines={1}
          style={{
            color: COLORS.white,
            fontSize: 16,
            textTransform: 'capitalize',
          }}>
          {data.name}
        </Text>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: COLORS.theme,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

//make this component available to the app
export default ChatHeader;
