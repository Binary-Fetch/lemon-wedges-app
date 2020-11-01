import * as React from 'react';
import { StyleSheet } from 'react-native';
//import EditScreenInfo from '../components/EditScreenInfo';
import RecipeList from '../components/RecipeList';
import ResourceLoader from '../components/ResourceLoader';
import { View } from '../components/Themed';
import RecipesService from '../services/recipes';
import { HomeComponent } from '../types';


export default class HomeScreen extends React.Component<HomeComponent.props, HomeComponent.state> {
  constructor(props:HomeComponent.props) {
    super(props);

    this.state = {
      isLoading: false,
      coctailRecipeList: []
    };
  }

  async componentDidMount() {
    this.setState({isLoading: true});
    try{
      const reciepes = await RecipesService().getRecipes();
      if(reciepes && reciepes.data ) {
        this.setState({coctailRecipeList: reciepes.data.coctailRecipe})
      }
    }catch(ex) {
      console.log(ex.message)
    }
    finally{
      setTimeout(() => this.setState({isLoading: false}));
    }
  }

  render() {
    const {isLoading, coctailRecipeList} = this.state;
    return (
      <View style={styles.container}>
        {isLoading && <ResourceLoader /> }
        {!isLoading &&  <RecipeList recipes={coctailRecipeList} navigation={this.props.navigation} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  receipeListContainer: {
    backgroundColor: '#ccc',
    width: "100%"
  }
});
