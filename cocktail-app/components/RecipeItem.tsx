import React from "react";
import { StyleSheet, Image } from "react-native";
import { CocktailRecipe } from "../types";
import { View, Text } from "./Themed";

export default function RecipeItem({ recipeDetails , navigation}: { recipeDetails: CocktailRecipe, navigation:any }) {
    return (
        <View style={styles.container}>
            <Item imageUri={recipeDetails.imageUrl} navigation={navigation} />
            <Text style={styles.title} onPress={e=> navigation.navigate('DetailRecipe',{recipeDetails})}>{recipeDetails.name}</Text>
            <Text style={{textAlign:"right"}}>@<Text style={styles.description}>{recipeDetails.owner.name}</Text> </Text>
        </View>
    );
}

const Item = ({ imageUri,navigation }: { imageUri: string[] | undefined , navigation:any}) => {
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
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 2,
        marginRight: 2,
        borderRadius: 5
    },
    imageItem: {
        padding: 0,
        marginVertical: 0
    },
    headerContainer: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center"
    },
    description: {
        fontSize: 14,
        textAlign: "auto",
        textDecorationLine:"underline"
    },
    title: {
        fontSize: 24,
        textAlign: "center"
    },
    image: {
        width: "100%",
        height: 200,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        overflow: "hidden",
    }
});