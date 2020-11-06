import { FieldArray, Formik } from 'formik';
import * as React from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import { Button as ThemedButton, ThemeProvider } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Yup from 'yup';
import { authSingOut } from '../actions/auth.action';
import { Text, View } from '../components/Themed';
import RecipesService from '../services/recipes';
import { CreateRecipeComponent } from '../types';

class CreateRecipeScreen extends React.Component<CreateRecipeComponent.Props, CreateRecipeComponent.State> {
    constructor(props: CreateRecipeComponent.Props) {
        super(props);
        this.state = {
            submissionInProg: false,
            creationMessage: ' '
        }
    }

    render() {
        const { submissionInProg, creationMessage } = this.state;
        const { authentication, navigation } = this.props;
        const CreateRecipeValidationSchema = Yup.object().shape({
            name: Yup.string()
                .required('Required'),
            desc: Yup.string()
                .required('Required'),
            imageUrl: Yup.string()
                .required('Required')
        });
        let initialValues = {
            name: '',
            desc: '',
            imageUrl: '',
            prepareSteps: [
                {
                    description: '',
                    order: 1,
                },
            ],
            ingredients: [
                {
                    amount: '',
                    type: '',
                    ingredient: {
                        name: '',
                    },
                },
            ],
        };
        return (
            <ThemeProvider>
                <Formik
                    initialValues={initialValues}
                    validationSchema={CreateRecipeValidationSchema}
                    onSubmit={async values => {
                        try {
                            //console.log(values);
                            let finalValue: any = { ...values };
                            finalValue.imageUrl = [values.imageUrl];
                            finalValue.owner = { username: authentication.userDetails.username };
                            this.setState({ submissionInProg: true });
                            const createCocktail = await RecipesService().createRecipe(finalValue);
                            navigation.navigate("MyAccount");
                        } catch (ex) {
                            this.setState({ creationMessage: ex.message });
                            this.setState({ submissionInProg: false });
                            console.log(ex.message);
                            this.props.doSignout();
                        }

                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={styles.container}>
                            <View>
                                <Text style={styles.formLabel}>Add Recipe</Text>
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
                                    placeholder="Description"
                                    onChangeText={handleChange('desc')}
                                    onBlur={handleBlur('desc')}
                                    value={values.desc}
                                    multiline={true}
                                    style={styles.inputStyle}
                                />
                                {errors.desc && touched.desc ? (
                                    <Text style={{ color: "#f00" }}>{errors.desc}</Text>
                                ) : null}
                                <TextInput
                                    placeholder="Image Url"
                                    onChangeText={handleChange('imageUrl')}
                                    onBlur={handleBlur('imageUrl')}
                                    value={values.imageUrl}
                                    multiline={true}
                                    style={styles.inputStyle}
                                />
                                {errors.imageUrl && touched.imageUrl ? (
                                    <Text style={{ color: "#f00" }}>{errors.imageUrl}</Text>
                                ) : null}
                            </View>
                            <FieldArray name="ingredients">
                                {({ insert, remove, push }) => (
                                    <View style={{ borderWidth: 0.5, padding: 5, marginTop: 5 }}>
                                        <Text style={styles.headerContent}>Ingredients</Text>
                                        {values.ingredients.length > 0 &&
                                            values.ingredients.map((ingredient, index) => (
                                                <View key={index}>
                                                    <TextInput
                                                        placeholder="Name"
                                                        onChangeText={handleChange(`ingredients[${index}].ingredient.name`)}
                                                        onBlur={handleBlur(`ingredients[${index}].ingredient.name`)}
                                                        value={ingredient.ingredient.name}
                                                        style={styles.inputStyle}
                                                    />
                                                    <TextInput
                                                        placeholder="Amount"
                                                        onChangeText={handleChange(`ingredients[${index}].amount`)}
                                                        onBlur={handleBlur(`ingredients[${index}].amount`)}
                                                        value={ingredient.amount}
                                                        style={styles.inputStyle}
                                                    />
                                                    <TextInput
                                                        placeholder="Type"
                                                        onChangeText={handleChange(`ingredients[${index}].type`)}
                                                        onBlur={handleBlur(`ingredients[${index}].type`)}
                                                        value={ingredient.type}
                                                        style={styles.inputStyle}
                                                    />
                                                    <View style={styles.separator}>
                                                        <Button title="Remove Ingredient" onPress={() => remove(index)} />
                                                    </View>
                                                </View>
                                            ))}
                                        <View style={styles.separator}>
                                            <Button title="Add Ingredient" onPress={() => push({ amount: '', type: '', ingredient: { name: '' } })} />
                                        </View>
                                    </View>
                                )}
                            </FieldArray>
                            <FieldArray name="prepareSteps">
                                {({ insert, remove, push }) => (
                                    <View style={{ borderWidth: 0.5, padding: 5, marginTop: 5 }}>
                                        <Text style={styles.headerContent}>Preparation Steps</Text>
                                        {values.prepareSteps.length > 0 &&
                                            values.prepareSteps.map((prepareStep, index) => (
                                                <View key={index}>
                                                    <TextInput
                                                        placeholder="Description"
                                                        onChangeText={handleChange(`prepareSteps[${index}].description`)}
                                                        onBlur={handleBlur(`prepareSteps[${index}].description`)}
                                                        value={prepareStep.description}
                                                        multiline={true}
                                                        style={styles.inputStyle}
                                                    />
                                                    <View style={styles.separator}>
                                                        <Button title="Remove Preparation Step" onPress={() => remove(index)} />
                                                    </View>
                                                </View>
                                            ))}
                                        <View style={styles.separator}>
                                            <Button title="Add Preperation Step" onPress={() => push({ description: '', order: 1 })} />
                                        </View>
                                    </View>
                                )}
                            </FieldArray>
                            <ThemedButton style={{ margin: 5 }} title={submissionInProg ? 'Adding...' : 'Submit'} disabled={submissionInProg} onPress={(e: any) => handleSubmit(e)} />
                            {/* <Button onPress={handleSubmit} title="Submit" /> */}
                            {creationMessage &&
                                <Text style={{ color: '#f00' }}>{creationMessage}</Text>
                            }
                        </View>
                    )}
                </Formik>
            </ThemeProvider>
        );
    }
}

const mapStateToProps = (state: any, ownProps: any) => {
    const { authentication } = state;
    return { authentication, ...ownProps };
}

const mapDispatchToProps = (dispatch: any) => (
    bindActionCreators({
        doSignout: authSingOut
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(CreateRecipeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: "98%",
        overflow: "scroll",
        justifyContent: 'flex-start',
    },
    formLabel: {
        fontSize: 20
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
        marginTop: 8,
    },
    headerContent: {
        fontWeight: "600",
        fontSize: 20,
        textAlign: "center"
    }
});
