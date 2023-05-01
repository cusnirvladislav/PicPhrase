import moment from 'moment';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../Constant/Color';

const TimeDelivery = props => {
  const {sender, item} = props;

  return (
    <View
      style={[
        styles.mainView,
        {
          justifyContent: sender ? 'flex-end' : 'flex-start',
        },
      ]}>
      <Text
        style={{
          fontSize: 7,
          color: sender ? COLORS.white : COLORS.black,
        }}>
        {moment(item.send_time).format('LLL')}
      </Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
});

//make this component available to the app
export default TimeDelivery;
