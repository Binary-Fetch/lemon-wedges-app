import { Formik } from 'formik';
import * as React from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import { LoginButton, AccessToken } from 'react-native-fbsdk';
import * as Yup from 'yup';
/* import useAuthenticationContext from '../hooks/useAuthenticationContext';
import useAuthenticationReducer from '../hooks/useAuthenticationReducer';
import { AppRoot, RootStackParamList } from '../types'; */
import { authSingIn } from '../actions/auth.action';
import { Text, View } from "../components/Themed";

function SignInScreen({
  navigation, authentication, doAuthSingIn
}: any) {
  //const AuthContext = React.createContext<AppRoot.AppAuthContext|any>({});
  //const {signIn} = useAuthenticationContext();
  //const [state, dispatch] = useAuthenticationReducer();
  /* return (
      <View style={styles.container}>
         <Text>{authentication.userToken}</Text>
          <Text>Test</Text>
          <Button title="Sign In" onPress={(e) => doAuthSingIn('test-token')} />   
      </View>
  ); */
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
      {/* <TextInput
                        placeholder="Name" onChange={(e) => this.handleChange(e, 'name')}
                        value={newRecipe.name} style={styles.inputStyle}
                    />
                    <TextInput
                        placeholder="Description" onChange={(e) => this.handleChange(e, 'desc')} value={newRecipe.desc}
                        multiline={true} style={styles.inputStyle}
                    /> 
                    <View style={{ marginTop: 150, width: 100 }}>
                        
                    </View>*/}
    </Formik>
  );

}

const mapStateToProps = (state: any, ownProps: any) => {
  const { authentication } = state;
  return { authentication, ...ownProps };
}

const mapDispatchToProps = (dispatch: any) => (
  bindActionCreators({
    doAuthSingIn: authSingIn
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