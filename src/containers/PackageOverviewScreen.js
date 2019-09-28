import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Selectors from 'selectors';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import * as Colors from 'themes/colors';
import { normalize } from 'utils/size';
import { Button, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-share';

class PackageOverviewScreen extends Component {
  onUrlPress = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  }

  onSharePress = () => {
    const { packageInfo } = this.props;
    const { homepage } = packageInfo;

    const shareOptions = {
      title: 'Share via',
      url: homepage,
    };
    Share.open(shareOptions);
  };

  render() {
    const { packageInfo, navigation } = this.props;

    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'chevron-left', onPress: () => navigation.navigate('DependencyExplorerScreen') }}
          centerComponent={{ text: 'PACKAGE OVERVIEW', style: styles.header }}
        />
        <Text style={styles.title}>{packageInfo.name}</Text>
        <View style={styles.contentContainer}>
          {packageInfo && packageInfo.dependencies && <Text style={styles.subtitle}>{`Found ${Object.keys(packageInfo.dependencies).length} dependencies for ${packageInfo.name}`}</Text>}
          {packageInfo && !packageInfo.dependencies && <Text style={styles.subtitle}>This package has no dependency</Text>}
          <FlatList
            style={styles.flatList}
            data={packageInfo && packageInfo.dependencies && Object.keys(packageInfo.dependencies)}
            renderItem={({ item }) => (
              <Text style={styles.flatListContent}>
                {item}
              </Text>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          {packageInfo && packageInfo.homepage
          && (
          <View>
            <TouchableOpacity onPress={() => this.onUrlPress(packageInfo.homepage)}>
              <Text style={styles.url}>{packageInfo.homepage}</Text>
            </TouchableOpacity>
            <Button
              icon={(
                <Icon
                  name="share"
                  size={normalize(18)}
                  color={Colors.primary}
                />
            )}
              title="SHARE"
              type="outline"
              titleStyle={styles.buttonLabel}
              onPress={this.onSharePress}
            />
          </View>
          )}
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
  subtitle: {
    fontSize: normalize(18),
  },
  flatList: {
    flexGrow: 0,
    height: '60%',
  },
  flatListContent: {
    borderWidth: 1,
    textAlign: 'center',
    fontSize: normalize(16),
    paddingVertical: normalize(5),
  },
  url: {
    textAlign: 'center',
    color: Colors.primary,
    textDecorationLine: 'underline',
    fontSize: normalize(14),
    marginVertical: normalize(10),
  },
  buttonLabel: {
    paddingLeft: normalize(5),
  },
});

PackageOverviewScreen.propTypes = {
  packageInfo: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const mapStateToProps = store => ({
  packageInfo: Selectors.getPackageInfo(store),
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(PackageOverviewScreen);
