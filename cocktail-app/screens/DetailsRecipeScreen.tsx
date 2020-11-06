import * as React from 'react';
import { StyleSheet, Image, SectionList, SafeAreaView, useColorScheme } from 'react-native';
import RecipeItem from '../components/RecipeItem';
import { View , Text} from '../components/Themed';
import Colors from '../constants/Colors';
import { DetailRecipeComponent, Ingredients } from '../types';

export default class DetailRecipeScreen extends React.Component<DetailRecipeComponent.Props, DetailRecipeComponent.State> {
    constructor(props: DetailRecipeComponent.Props) {
        super(props);
        
        
        
    }

    render() {
       
        const { recipeDetails }= this.props.route.params;
        let IngeredientSectionList;
        if (Array.isArray(recipeDetails.ingredients)) {
            IngeredientSectionList = recipeDetails.ingredients.map((ingredient: Ingredients) => {
                return {
                    data: [ingredient],
                    title: ingredient.ingredient.name,
                }
            });
        }
        return (
            <SafeAreaView style={styles.containerroot}>
                <Text style={styles.title}>{recipeDetails.name}</Text>
                <Item imageUri={recipeDetails.imageUrl}  />
                <Text style={styles.title2}>Ingredients</Text>
                <View style={styles.container}>
                 <SectionList<Ingredients>
                sections={IngeredientSectionList}
                keyExtractor={(item) => item.id}
        renderItem={({ item }) => <View style={ styles.ingredientrow}><Text style={styles.ingredient}>{item.ingredient.name}</Text><Text style={styles.amount}>{item.amount}</Text></View>}  
            />
            </View>
            <Text style={styles.title2}>Prepare Steps</Text>
            <View style={styles.container}>
            
            <Text>{recipeDetails.prepareSteps[0].description}</Text> 
            </View>
            <Text></Text>
               {/* <RecipeItem recipeDetails={this.state.coctailRecipe}></RecipeItem> */}
            </SafeAreaView>
        );
    }
}
const Item = ({ imageUri }: { imageUri: string[] | undefined }) => {
    return (
        <View style={styles.imageItem}>
            {imageUri && imageUri[0] && <Image  source={{ uri: imageUri[0] }} style={styles.image} />}
            {!imageUri || (imageUri && !imageUri[0]) && <Text style={styles.title}>No Image Exists</Text>}
        </View>
    );

}
const styles = StyleSheet.create({
    containerroot: {
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        padding: 5,
        marginTop: 50,
        marginBottom: 5,
        marginLeft: 20,
        marginRight: 20,
       
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'flex-start',
        overflow: "scroll"
    },container: {
        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 2,
        padding: 20,
        marginBottom: 5,
        marginLeft: 2,
        marginRight: 2,
        borderWidth: 0.5,
        justifyContent: 'flex-start',
    },title: {
        flex: 0.3,
        
        backgroundColor: "grey",
        borderWidth: 0.5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        fontSize: 24,
        textAlign: "center"
    },title2: {
        flex: 0.3,
        marginTop: 5,
        marginLeft: 2,
        marginRight: 2,
        backgroundColor: "grey",
        borderWidth: 0.5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        fontSize: 20,
        textAlign: "center"
    },image: {
        width: "100%",
        height: 250,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        overflow: "hidden",
        resizeMode:'contain'
    },
    formLabel: {
        fontSize: 20
    },
    imageItem: {
        padding: 0,
        marginVertical: 0
    },
    inputStyle: {
        marginTop: 20,
        width: 300,
        height: 40,
        paddingHorizontal: 10,
        borderRadius: 50,
        backgroundColor: '#DCDCDC',
    },
    ingredient: {
        flex: 0.6,
        //backgroundColor: "#c2d9ff",
        borderColor:"#c2d9ff",
        borderWidth:0.5,
        //color: "red",
        fontWeight:"500",
        fontSize: 10,
        textAlign: "center"
    },amount: {
        flex: 0.4,
        borderColor: "#fcffde",
        borderWidth:0.5,
        fontSize: 10,
        fontWeight:"500",
        //color:"red",
        textAlign: "center"
    },ingredientrow:{
        flexDirection: "row",
        height: 'auto'
    }
});
