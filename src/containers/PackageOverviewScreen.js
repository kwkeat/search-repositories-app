import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Actions from 'actions';
import Selectors from 'selectors';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';
import * as Colors from 'themes/colors';
import { normalize } from 'utils/size';
import { Button, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class PackageOverviewScreen extends Component {
  render() {
    const { packageinfo, navigation } = this.props;

    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'chevron-left', onPress: () => navigation.navigate('DependencyExplorerScreen') }}
          centerComponent={{ text: 'PACKAGE OVERVIEW', style: styles.header }}
        />
        <Text style={styles.title}>{packageinfo.name}</Text>
        <View style={styles.contentContainer}>
          {packageinfo && packageinfo.dependencies && <Text>{`Found ${Object.keys(packageinfo.dependencies).length} dependencies for ${packageinfo.name}`}</Text>}
          {packageinfo && !packageinfo.dependencies && <Text>This package has no dependency</Text>}
          <FlatList
            data={packageinfo && packageinfo.dependencies && Object.keys(packageinfo.dependencies)}
            renderItem={({ item }) => (
              <Text style={styles.flatListContent}>
                {item}
              </Text>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <Button
            icon={(
              <Icon
                name="search"
                size={normalize(18)}
                color={Colors.primary}
              />
            )}
            title="SEARCH"
            type="outline"
            titleStyle={styles.buttonLabel}
            onPress={this.onSearchPress}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    alignItems: 'center',
  },
  header: {
    fontSize: normalize(20),
    fontWeight: 'bold',
  },
  title: {
    textAlign: 'center',
    fontSize: normalize(20),
    fontWeight: '500',
    marginVertical: normalize(15),
    marginTop: normalize(20),
  },
  contentContainer: {
    margin: normalize(10),
  },
  flatListContent: {
    borderWidth: 1,
    textAlign: 'center',
  },
  buttonLabel: {
    paddingLeft: normalize(5),
  },
});

PackageOverviewScreen.propTypes = {
  packageinfo: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const mapStateToProps = store => ({
  packageinfo: Selectors.getPackageInfo(store),
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(PackageOverviewScreen);
