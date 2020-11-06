import { connect } from 'react-redux';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { authSingOut } from '../actions/auth.action';
import RecipeList from '../components/RecipeList';
import ResourceLoader from '../components/ResourceLoader';
//import EditScreenInfo from '../components/EditScreenInfo';
import { View } from '../components/Themed';
import RecipesService from '../services/recipes';
import { MyRecipeComponent } from '../types';

class MyRecipieScreen extends React.Component<MyRecipeComponent.props, MyRecipeComponent.state> {
  detachNavigationSubscription: any;
  constructor(props: MyRecipeComponent.props) {
    super(props);
    this.state = {
      isLoading: false,
      user: {
        username: "",
        name: "",
        token: ""
      },
      coctailRecipeList: []
    };
  }

  async componentDidMount() {
    this.detachNavigationSubscription = this.props.navigation.addListener('focus', async () => {
      this.setState({ isLoading: true });
      try {
        const reciepes = await RecipesService().getMyRecipes();
        if (reciepes && reciepes.data) {
          this.setState({
            coctailRecipeList: reciepes.data.getUser.recipes, user: {
              name: reciepes.data.getUser.name,
              username: reciepes.data.getUser.username,
              token: ""
            }
          })
        }
        this.setState({ isLoading: false });
      } catch (ex) {
        console.log(ex.message);
        this.props.doSignout();
      }
    });
  }

  componentWillUnmount() {
    this.detachNavigationSubscription();
  }

  render() {
    const { isLoading, coctailRecipeList } = this.state;
    return (
      <View style={styles.container}>
        {isLoading && <ResourceLoader />}
        {!isLoading && coctailRecipeList && <RecipeList recipes={coctailRecipeList} navigation={this.props.navigation} />}
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyRecipieScreen)

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
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  receipeListContainer: {
    backgroundColor: '#ccc',
    width: "100%"
  }
});