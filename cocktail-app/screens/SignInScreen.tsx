import { Formik } from 'formik';
import * as React from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Yup from 'yup';
import { authRestore, authSingIn } from '../actions/auth.action';
import { Text, View } from "../components/Themed";
import { useFocusEffect } from '@react-navigation/native';

function SignInScreen({
  navigation, authentication, doAuthSingIn, checkLogin
}: any) {
  useFocusEffect(React.useCallback(() => {
    if(!authentication.isSignout) {
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
  
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={LoginFormSchema}
      onSubmit={values => {
        //console.log(values);
        const { username, password } = values;
        doAuthSingIn(username, password);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Text style={styles.formLabel}>Login before you proceed</Text>
          <TextInput
            placeholder="User Name"
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
            style={styles.inputStyle}
          />
          {errors.username && touched.username ? (
            <Text style={{ color: "#f00" }}>{errors.username}</Text>
          ) : null}
          <TextInput
            placeholder="Password"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            style={styles.inputStyle}
            secureTextEntry={true}
          />
          {errors.password && touched.password ? (
            <Text style={{ color: "#f00" }}>{errors.password}</Text>
          ) : null}
          {/* <ThemedButton title="Submit" onPress={(e: any) => handleSubmit(e)} /> */}
          {authentication && authentication.error &&
            <Text style={{ color: "#f00" }}>{authentication.error}</Text>
          }
          <Button title="Submit" onPress={(e: any) => handleSubmit(e)} />
        </View>
      )}
    </Formik>
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
    justifyContent: 'center',
    width: "98%"
  },
  formLabel: {
    fontSize: 20
  },
  formErrorMessage: {
    color: '#f00'
  },
  inputStyle: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#DCDCDC',
  },
});