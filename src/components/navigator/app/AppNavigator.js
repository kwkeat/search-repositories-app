import { createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import Initial from 'containers/Initial';
import DependencyExplorerScreen from 'containers/DependencyExplorerScreen';

const routeConfiguration = {
  Initial: { screen: Initial },
  DependencyExplorerScreen: { screen: DependencyExplorerScreen },
};

const AppNavigator = createSwitchNavigator(routeConfiguration);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
