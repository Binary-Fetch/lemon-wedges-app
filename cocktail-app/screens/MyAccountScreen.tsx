import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authSingOut } from '../actions/auth.action';
import RecipeList from '../components/RecipeList';
import ResourceLoader from '../components/ResourceLoader';
import { Text, View } from '../components/Themed';
import RecipesService from '../services/recipes';
import { MyRecipeComponent } from '../types';
import GenericUtils from '../utils/GenericUtil';

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
    const { authentication, doSignout } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        {isLoading && <View style={styles.rcipeArea}><ResourceLoader /></View>}
        {!isLoading &&
          <View style={styles.avatarArea}>
            <Avatar rounded avatarStyle={{ borderColor: "#fff", borderWidth: 1 }} title={GenericUtils.generateAvatarTitle(authentication.userDetails.name)} size="large" />
            <Text style={{ fontSize: 16 }}>{authentication.userDetails.name}</Text>
            <Button
              icon={
                <Icon
                  name="sign-out"
                  size={15}
                  color="white"
                />
              }
              title="Logout"
              onPress={e => doSignout()}
            />
          </View>
        }
        {!isLoading && coctailRecipeList &&
          <View style={styles.rcipeArea}>
            <RecipeList recipes={coctailRecipeList} navigation={this.props.navigation} />
          </View>
        }
      </SafeAreaView>
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
  avatarArea: {
    height: 150,
    backgroundColor: "palegreen",
    width: "100%",
    alignItems: "center",
    padding: 5
  },
  rcipeArea: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginTop: 10
  },
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