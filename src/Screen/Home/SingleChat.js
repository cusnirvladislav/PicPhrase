//import liraries
import {Icon} from 'native-base';
import React, {Component, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  SectionList,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
} from 'react-native';
import moment from 'moment';
import MsgComponent from '../../Component/Chat/MsgComponent';
import {COLORS} from '../../Component/Constant/Color';
import ChatHeader from '../../Component/Header/ChatHeader';
import {useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import Dialog from 'react-native-dialog';

function isImageUrl(url) {
  // Verificați dacă este un URL valid
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  if (!urlRegex.test(url)) {
    return false;
  }

  const imageRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
  if (!imageRegex.test(url)) {
    return false;
  }

  return true;
}
const SingleChat = props => {
  const {userData} = useSelector(state => state.User);
  const textInputRef = useRef();
  const {receiverData} = props.route.params;

  const [msg, setMsg] = React.useState('');
  const [disabled, setdisabled] = React.useState(false);
  const [allChat, setallChat] = React.useState([]);
  const [visible, setVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  useEffect(() => {
    const onChildAdd = database()
      .ref('/messages/' + receiverData.roomId)
      .on('child_added', snapshot => {
        setallChat(state => [snapshot.val(), ...state]);
      });
    // Stop listening for updates when no longer required
    return () =>
      database()
        .ref('/messages' + receiverData.roomId)
        .off('child_added', onChildAdd);
  }, [receiverData.roomId]);

  const msgvalid = txt => txt && txt.replace(/\s/g, '').length;

  const sendMsg = () => {
    if (msg == '' || msgvalid(msg) == 0) {
      Alert.alert('Enter something....');
      return false;
    }
    setdisabled(true);
    let msgData = {
      roomId: receiverData.roomId,
      message: msg,
      from: userData?.id,
      to: receiverData.id,
      sendTime: moment().format(''),
      msgType: 'text',
    };

    const newReference = database()
      .ref('/messages/' + receiverData.roomId)
      .push();
    msgData.id = newReference.key;
    newReference.set(msgData).then(() => {
      let chatListupdate = {
        lastMsg: msg,
        sendTime: msgData.sendTime,
      };
      database()
        .ref('/chatlist/' + receiverData?.id + '/' + userData?.id)
        .update(chatListupdate)
        .then(() => console.log('Data updated.'));
      database()
        .ref('/chatlist/' + userData?.id + '/' + receiverData?.id)
        .update(chatListupdate)
        .then(() => console.log('Data updated.'));

      setMsg('');
      setdisabled(false);
    });
  };

  const handleSend = () => {
    if (isImageUrl(imageUrl)) {
      setdisabled(true);
      let msgData = {
        roomId: receiverData.roomId,
        message: `image:${imageUrl}`,
        from: userData?.id,
        to: receiverData.id,
        sendTime: moment().format(''),
        msgType: 'text',
      };

      const newReference = database()
        .ref('/messages/' + receiverData.roomId)
        .push();
      msgData.id = newReference.key;
      newReference.set(msgData).then(() => {
        let chatListupdate = {
          lastMsg: msg,
          sendTime: msgData.sendTime,
        };
        database()
          .ref('/chatlist/' + receiverData?.id + '/' + userData?.id)
          .update(chatListupdate)
          .then(() => console.log('Data updated.'));
        console.log(
          "'/chatlist/' + userData?.id + '/' + data?.id",
          receiverData,
        );
        database()
          .ref('/chatlist/' + userData?.id + '/' + receiverData?.id)
          .update(chatListupdate)
          .then(() => console.log('Data updated.'));

        setMsg('');
        setdisabled(false);
      });
    }
    setVisible(false);
  };

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <ChatHeader data={receiverData} />
        <ImageBackground
          source={require('../../Assets/Background.jpg')}
          style={{flex: 1}}>
          <FlatList
            style={{flex: 1}}
            data={allChat}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index}
            inverted
            renderItem={({item}) => {
              return (
                <MsgComponent sender={item.from == userData.id} item={item} />
              );
            }}
          />
        </ImageBackground>

        <View
          style={{
            backgroundColor: COLORS.theme,
            elevation: 5,
            height: 60,
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 7,
            justifyContent: 'space-evenly',
          }}>
          <TextInput
            style={{
              backgroundColor: COLORS.white,
              width: '80%',
              height: 40,
              borderRadius: 25,
              borderWidth: 0.5,
              borderColor: COLORS.white,
              paddingHorizontal: 15,
              fontSize: 20,
              color: COLORS.black,
            }}
            placeholder="type a message"
            placeholderTextColor={COLORS.black}
            multiline={true}
            value={msg}
            onChangeText={val => setMsg(val)}
          />
          <TouchableOpacity disabled={disabled} onPress={showDialog}>
            <Icon
              style={{
                color: COLORS.white,
              }}
              name="add-circle-outline"
              type="Ionicons"
            />
          </TouchableOpacity>

          <TouchableOpacity disabled={disabled} onPress={sendMsg}>
            <Icon
              style={{
                color: COLORS.white,
              }}
              name="paper-plane-sharp"
              type="Ionicons"
            />
          </TouchableOpacity>
        </View>
      </View>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Send Image</Dialog.Title>
        <Dialog.Description>Insert image url</Dialog.Description>
        <Dialog.Input
          textInputRef={textInputRef}
          onChangeText={text => {
            setImageUrl(text);
          }}
        />
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Send" onPress={handleSend} />
      </Dialog.Container>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default SingleChat;
