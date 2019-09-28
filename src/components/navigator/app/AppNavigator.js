import { createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import Initial from 'containers/Initial';
import DependencyExplorerScreen from 'containers/DependencyExplorerScreen';
import PackageOverviewScreen from 'containers/PackageOverviewScreen';

const routeConfiguration = {
  Initial: { screen: Initial },
  DependencyExplorerScreen: { screen: DependencyExplorerScreen },
  PackageOverviewScreen: { screen: PackageOverviewScreen },
};

const AppNavigator = createSwitchNavigator(routeConfiguration);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
