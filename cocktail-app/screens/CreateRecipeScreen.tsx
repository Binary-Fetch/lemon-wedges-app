import * as React from 'react';
import { Button, NativeSyntheticEvent, NativeTouchEvent, StyleSheet, TextInput, Alert } from 'react-native';
import { Button as ThemedButton, ThemeProvider } from 'react-native-elements';
import { Text, View } from '../components/Themed';
import RecipesService from '../services/recipes';
import { CocktailRecipe, CreateRecipeComponent } from '../types';
import GenericUtils from '../utils/GenericUtil';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Yup from 'yup';

class CreateRecipeScreen extends React.Component<CreateRecipeComponent.Props, CreateRecipeComponent.State> {
    constructor(props: CreateRecipeComponent.Props) {
        super(props);
        // this.state = {
        //     newRecipe: this.createFreshState(),
        //     creationMessage: ''
        // };
        this.state = {
            submissionInProg: false,
            creationMessage: ' '
        }
    }

    // handleChange(evt: any, property: string) {
    //     const editedState = { [property]: evt.currentTarget.value }
    //     const curRecipeState: CocktailRecipe = { ...this.state.newRecipe, ...editedState }
    //     this.setState({ newRecipe: curRecipeState });
    // }

    // async handleSubmitBtn(e: NativeSyntheticEvent<NativeTouchEvent>) {
    //     try {
    //         const { name, desc } = this.state.newRecipe;
    //         if (name.trim().length && desc.trim().length) {
    //             const createCocktail = await RecipesService().createRecipe(this.state.newRecipe);
    //             if (createCocktail === 'Success') {
    //                 this.displayMessage(createCocktail);
    //                 this.setState({ newRecipe: this.createFreshState() });
    //             }
    //         } else {
    //             this.displayMessage("Please enter valid recipe details");
    //         }

    //     } catch (ex) {
    //         console.log(ex.getMessage());
    //         this.displayMessage(ex.getMessage());
    //     }
    // }

    // private displayMessage(message: string) {
    //     Alert.alert("Recipe Creation", message, [
    //         {
    //             text: "Ok"
    //         }
    //     ]);
    // }

    // private createFreshState(): CocktailRecipe {
    //     return { id: GenericUtils.generateUniqueId(), name: '', desc: '' };
    // }

    render() {
        const {submissionInProg, creationMessage } = this.state;
        const { authentication, navigation } = this.props; 
        const CreateRecipeValidationSchema = Yup.object().shape({
            name: Yup.string()
                .required('Required'),
            desc: Yup.string()
                .required('Required'),
            imageUrl: Yup.string()
                .required('Required')
        });
        let addButtonName = "Submit";
        return (
            <ThemeProvider>
                <Formik
                    initialValues={{ name: '', desc: '', imageUrl: '' }}
                    validationSchema={CreateRecipeValidationSchema}
                    onSubmit={ async values => {
                        try {
                            //console.log(values);
                            let finalValue: any = {...values};
                            finalValue.imageUrl = [values.imageUrl];
                            finalValue.owner = { username: authentication.userDetails.username };
                            this.setState({submissionInProg: true});
                            const createCocktail = await RecipesService().createRecipe(finalValue);
                            navigation.navigate("HomeScreen"); 
                        }catch(ex) {
                            this.setState({creationMessage: ex.message});
                        } finally{
                            this.setState({submissionInProg: false});
                        }
                        
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values,  errors, touched  }) => (
                        <>
                        <View style={styles.container}>
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
                            <ThemedButton style={{margin: 5}} title={submissionInProg ? 'Adding...' : 'Submit'} disabled={submissionInProg} onPress={(e: any) => handleSubmit(e)} />
                            {/* <Button onPress={handleSubmit} title="Submit" /> */}
                            {creationMessage && 
                                <Text style={{color: '#f00'}}>{creationMessage}</Text>
                            }
                        </View>
                        
                        </>
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
            </ThemeProvider>
        );
    }
}

const mapStateToProps = (state: any, ownProps: any) => {
    const { authentication } = state;
    return { authentication, ...ownProps };
}

export default connect(mapStateToProps)(CreateRecipeScreen);

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
    inputStyle: {
        marginTop: 20,
        width: 300,
        height: 40,
        paddingHorizontal: 10,
        borderRadius: 50,
        backgroundColor: '#DCDCDC',
    },
});
