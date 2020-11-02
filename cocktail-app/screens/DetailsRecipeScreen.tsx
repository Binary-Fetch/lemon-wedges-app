import * as React from 'react';
import { StyleSheet, Image, SectionList, SafeAreaView } from 'react-native';
import RecipeItem from '../components/RecipeItem';
import { View , Text} from '../components/Themed';
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
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>{recipeDetails.name}</Text>
                <Item imageUri={recipeDetails.imageUrl}  />
                <Text>Ingredients</Text>
                <SectionList<Ingredients>
                sections={IngeredientSectionList}
                keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text> {item.ingredient.name}-{item.amount}</Text>}
                
            />
            <Text>Prepare Steps</Text>
            <Text>{recipeDetails.prepareSteps[0].description}</Text> 
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
    container: {
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
        marginLeft: 2,
        marginRight: 2,
        borderRadius: 5
    },title: {
        fontSize: 24,
        textAlign: "center"
    },image: {
        width: "100%",
        height: 200,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        overflow: "hidden",
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
});
