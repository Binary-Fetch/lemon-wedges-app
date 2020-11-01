import Constants from "expo-constants";
import React from "react";
import {
    SafeAreaView,
    SectionList, SectionListData, StyleSheet
} from "react-native";
import { CocktailRecipe } from "../types";
import RecipeItem from "./RecipeItem";

export default function RecipeList({ recipes , navigation}: { recipes: CocktailRecipe[] , navigation : any}) {
    let recipeSectionList: SectionListData<CocktailRecipe>[] = [];
    if (Array.isArray(recipes)) {
        recipeSectionList = recipes.map(recipe => {
            return {
                data: [recipe],
                title: recipe.name,
            }
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <SectionList<CocktailRecipe>
                sections={recipeSectionList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <RecipeItem recipeDetails={item} navigation={navigation}/>}
                /* renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>{title}</Text>
                    </View>
                )} */
            />
        </SafeAreaView>
    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: (Constants.statusBarHeight -10),
        marginHorizontal: 2,
        flexGrow: 1,
        width: "95%",
    },
    item: {
        padding: 0,
        marginVertical: 0
    },
    headerContainer: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center"
    },
    header: {
        fontSize: 24,
        backgroundColor: "#fff",
        alignItems: "center"
    },
    title: {
        fontSize: 24
    },
    image: {
        width: "100%",
        height: 200
    }
});