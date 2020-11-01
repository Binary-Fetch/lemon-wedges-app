import * as React from 'react';
import { StyleSheet } from 'react-native';
import RecipeItem from '../components/RecipeItem';
import { View } from '../components/Themed';
import { DetailRecipeComponent } from '../types';

export default class DetailRecipeScreen extends React.Component<DetailRecipeComponent.Props, DetailRecipeComponent.State> {
    constructor(props: DetailRecipeComponent.Props) {
        super(props);

        this.state = {
            isLoading: false,
            user: {
                username:"",
                name:"",
                token:""
            },
            coctailRecipe: {
                id: "",
                name: "Martini",
                desc: " Martini",
                owner: {
                    username:"",
                    name: "",
                    token: ""
                }
                
            }
        };
    }



    render() {
       
        return (
            <View style={styles.container}>
               <RecipeItem recipeDetails={this.state.coctailRecipe}></RecipeItem>
            </View>
        );
    }
}

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
