import { Formik } from 'formik';
import * as React from 'react';
import { Button, Image, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Yup from 'yup';
import { authRestore, authSingIn } from '../actions/auth.action';
import { Text, View } from "../components/Themed";
import { useFocusEffect } from '@react-navigation/native';
import RecipesService from '../services/recipes';

function UserRegistrationScreen({
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
    name: Yup.string()
      .required('Required'),
    email: Yup.string()
      .required('Required'),
    gender: Yup.string()
      .required('Required'),
  });

  return (
    <Formik
      initialValues={{ username: '', password: '', name: '', email: '', gender: '' }}
      validationSchema={LoginFormSchema}
      onSubmit={async values => {
        console.log(values);
        const createUser = await RecipesService().createUser(values);
        navigation.navigate("SignIn");
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Image  source={require('../assets/images/lemon.png')} style={styles.image} />
          <Text style={styles.formLabel}>Register Yourself</Text>
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
          <TextInput
            placeholder="Name"
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            style={styles.inputStyle}
          />
          {errors.name && touched.name ? (
            <Text style={{ color: "#f00" }}>{errors.name}</Text>
          ) : null}
          <TextInput
            placeholder="Email"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            style={styles.inputStyle}
          />
          {errors.email && touched.email ? (
            <Text style={{ color: "#f00" }}>{errors.email}</Text>
          ) : null}
          <TextInput
            placeholder="Gender"
            onChangeText={handleChange('gender')}
            onBlur={handleBlur('gender')}
            value={values.gender}
            style={styles.inputStyle}
          />
          {errors.gender && touched.gender ? (
            <Text style={{ color: "#f00" }}>{errors.gender}</Text>
          ) : null}
          <View style={styles.separator}>
            <Button title="Register" onPress={(e: any) => handleSubmit(e)} />
          </View>
        </View>
      )}
    </Formik>
  );

}

const mapStateToProps = (state: any, ownProps: any) => {
  const { authentication } = state;
  return { authentication, ...ownProps };
}

// const mapDispatchToProps = (dispatch: any) => (
//   bindActionCreators({
//     doAuthSingIn: authSingIn,
//     checkLogin: authRestore
//   }, dispatch)
// )

export default connect(mapStateToProps)(UserRegistrationScreen);

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
  },image: {
    height:150,
    width: 150,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    resizeMode:'contain',
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
  separator: {
    marginVertical: 8,
  },
});