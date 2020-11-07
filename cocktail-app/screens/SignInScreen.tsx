import { Formik } from 'formik';
import * as React from 'react';
import { Button, Image, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Yup from 'yup';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { authRestore, authSingIn } from '../actions/auth.action';
import { Text, View } from "../components/Themed";
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

function SignInScreen({
  navigation, authentication, doAuthSingIn, checkLogin
}: any) {
  useFocusEffect(React.useCallback(() => {
    if (!authentication.isSignout) {
      checkLogin();
    }
  }, []));

  const LoginFormSchema = Yup.object().shape({
    username: Yup.string()
      .min(1, 'Too Short!')
      .max(10, 'Too Long!')
      .required('Required'),
    password: Yup.string()
      .required('Required'),
  });

  const colorScheme = useColorScheme();

  const username: string = authentication.username? authentication.username:'';
  return (
    <Formik
      initialValues={{ username: username, password: '' }}
      validationSchema={LoginFormSchema}
      onSubmit={values => {
        //console.log(values);
        const { username, password } = values;
        doAuthSingIn(username, password);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <View>
            <Image source={require('../assets/images/lemon.png')} style={styles.image} />
          </View>
          <View>
            <Input
              label='Your Username'
              containerStyle={styles.inputStyle}
              leftIcon={
                <Icon
                  name='user'
                  size={24}
                  color={Colors[colorScheme].text}
                />
              }
              placeholder="User Name"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              errorMessage={touched.username && errors.username ? errors.username : undefined}
            />
            <Input
              label='Password'
              containerStyle={styles.inputStyle}
              leftIcon={
                <Icon
                  name='lock'
                  size={24}
                  color={Colors[colorScheme].text}
                />
              }
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry={true}
              errorStyle={{ color: 'red' }}
              errorMessage={touched.password && errors.password ? errors.password : undefined}
            />
            {authentication && authentication.error &&
              <Text style={{ color: "#f00" }}>{authentication.error}</Text>
            }
          </View>
          <View style={styles.separator}>
            <Button title="Login" onPress={(e: any) => handleSubmit(e)} />
          </View>
          <View>
            <Button title="Sign Up" onPress={e => navigation.navigate('UserRegistration')} />
          </View>
        </View>
      )}
    </Formik>
  );

}

const Item = ({ imageUri }: { imageUri: string[] | undefined }) => {
  return (
    <View style={styles.imageItem}>
      {!!imageUri && !!imageUri[0] && <Image source={require('../assets/images/lemon.png')} style={styles.image} />}
      {!imageUri || (imageUri && !imageUri[0]) && <Text >No Image Exists</Text>}
    </View>
  );

}
const mapStateToProps = (state: any, ownProps: any) => {
  const { authentication } = state;
  return { authentication, ...ownProps };
}

const mapDispatchToProps = (dispatch: any) => (
  bindActionCreators({
    doAuthSingIn: authSingIn,
    checkLogin: authRestore
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);

/* const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    }
  }); */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: "98%"
  },
  formLabel: {
    fontSize: 20
  },
  imageItem: {
    padding: 0,
    marginVertical: 0
  }, image: {
    height: 250,
    width: 250,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    resizeMode: 'contain',
  },
  formErrorMessage: {
    color: '#f00'
  },
  inputStyle: {
    margin: 25,
    width: 300,
    height: 60,
    paddingHorizontal: 10,
  },
  separator: {
    marginVertical: 8,
  },
});