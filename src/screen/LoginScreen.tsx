import {
  Button,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from './style/defaultStyle';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {login, logout} from '../store/authSlice';
import appwrite from '../appwrite/appWrite';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

export const LoginScreen = ({navigation}: any) => {
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[globalStyles.darkBackground, styles.container]}>
          <View>
            {error ? (
              <Text
                style={{
                  color: 'red',
                  textAlign: 'center',
                  textTransform: 'capitalize',
                }}>
                Please enter valid email and password.
              </Text>
            ) : null}
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={LoginSchema}
              onSubmit={async values => {
                await appwrite
                  .login(values)
                  .then(session => {
                    if (!session) {
                      setError(true);
                      console.log('Session Error');
                    } else {
                      setError(false);
                      console.log('Response => LoginScreen :: ', session);
                      dispatch(login(values));
                    }
                  })
                  .catch(e => {
                    console.log('Error => LoginScreen :: ', e);
                    setError(true);
                    dispatch(logout());
                  });
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={styles.formWrapper}>
                  <KeyboardAvoidingView
                    behavior={Platform.OS === 'android' ? 'padding' : 'height'}
                    style={styles.keyboardContainer}>
                    <View>
                      <TextInput
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        placeholder="email"
                        style={styles.textInputStyle}
                      />
                      {errors.email && touched.email ? (
                        <Text style={styles.errors}>{errors.email}</Text>
                      ) : null}
                    </View>
                    <View>
                      <TextInput
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        placeholder="Password"
                        secureTextEntry
                        style={styles.textInputStyle}
                      />
                      {errors.password && touched.password ? (
                        <Text style={styles.errors}>{errors.password}</Text>
                      ) : null}
                    </View>
                    <View style={{marginTop: 8}}>
                      <Button onPress={() => handleSubmit()} title="Login" />
                    </View>
                    <View style={{marginTop: 6}}>
                      <Button
                        onPress={() => navigation.navigate('Signup')}
                        title="Register"
                      />
                    </View>
                  </KeyboardAvoidingView>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    marginVertical: 10,
  },
  container: {
    paddingTop: 120,
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
  },
  formWrapper: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  textInputStyle: {
    backgroundColor: '#fff',
    height: 45,
    width: 300,
    marginVertical: 10,
    paddingLeft: 8,
  },
  errors: {
    color: '#C40C0C',
  },
});
