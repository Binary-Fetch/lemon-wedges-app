import React from "react";
import { StyleSheet, Image, Button } from "react-native";
import { CocktailRecipe } from "../types";
import { View, Text } from "./Themed";

export default function RecipeItem({ recipeDetails , navigation}: { recipeDetails: CocktailRecipe, navigation:any }) {
    return (
        <View style={styles.container}>
            <Item imageUri={recipeDetails.imageUrl}/>
            <Text style={styles.title}>{recipeDetails.name}</Text>
            <Button title="more" onPress={e=> navigation.navigate('DetailRecipe')}></Button>
            <Text style={styles.description}>In a highball glass almost filled with ice cubes, combine the gin and ginger ale.</Text>
        </View>
    );
}

const Item = ({ imageUri }: { imageUri: string[] | undefined }) => {
    return (
        <View style={styles.imageItem}>
            {imageUri && imageUri[0] && <Image source={{ uri: imageUri[0] }} style={styles.image} />}
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
        textAlign: "auto"
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