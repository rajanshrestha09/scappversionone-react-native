import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import type {RootState} from '../store/store';
import {logout} from '../store/authSlice';
import appwrite from '../appwrite/appWrite';
import {globalStyles} from './style/defaultStyle';

export default function HomeScreen({navigation}: any) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const handleLogout = async () => {
    await appwrite
      .logout()
      .then((response: any) => {
        console.log('Response==> HomeScreen :: ', response);
        dispatch(logout());
      })
      .catch((e: any) => {
        console.log('Error ==> HomeScreen :: ', e);
        dispatch(logout());
      });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[globalStyles.darkBackground, styles.homeContainer]}>
          <View style={styles.textWrapper}>
            <Text
              style={[
                globalStyles.defaultText,
                styles.homeText,
                styles.homeTextGreet,
              ]}>
              Welcome to home page
            </Text>
            <Text style={styles.userName}>{user?.name}</Text>
            <View style={styles.buttonStyle}>
              <Button title="Logout" onPress={handleLogout} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    borderWidth: 2,
    borderColor: 'white',
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeText: {
    fontSize: 16,
  },
  homeTextGreet: {},
  homeTextNameWrapper: {},
  userName: {
    color: '#FC4100',
  },
  buttonStyle: {
    backgroundColor: '#fff',
    width: 200,
    marginTop: 20,
    marginHorizontal: 'auto',
  },
});
