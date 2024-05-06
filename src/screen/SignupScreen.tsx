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
import {login} from '../store/authSlice';
import appwrite from '../appwrite/appWrite';
import {LoginScreen} from './LoginScreen';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

export const SignupScreen = ({navigation}: any) => {
  const [error, setError] = useState(false);
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
                Email already exists
              </Text>
            ) : null}
            <Formik
              initialValues={{
                name: '',
                email: '',
                password: '',
              }}
              validationSchema={SignupSchema}
              onSubmit={async (value: {
                name: string;
                password: string;
                email: string;
              }) => {
                try {
                  const user = await appwrite.createAccount(value);
                  if (user) {
                    setError(false);
                    dispatch(login(user));
                    navigation.navigate(LoginScreen);
                    console.log('here');
                  } else {
                    setError(true);
                  }
                } catch (error) {
                  console.log('Error ===> SignupScreen ::', error);
                }
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
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        placeholder="Name"
                        style={styles.textInputStyle}
                      />
                      {errors.name && touched.name ? (
                        <Text style={styles.errors}>{errors.name}</Text>
                      ) : null}
                    </View>

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
                      <Button title="Register" onPress={() => handleSubmit()} />
                    </View>
                    <View style={{marginTop: 6}}>
                      <Button
                        title="Login"
                        onPress={() => navigation.navigate('Login')}
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
    flex: 1,
    paddingVertical: 60,
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
