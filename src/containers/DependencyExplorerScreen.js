import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Actions from 'actions';
import Selectors from 'selectors';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as Colors from 'themes/colors';
import { normalize } from 'utils/size';
import Autocomplete from 'react-native-autocomplete-input';
import { Button, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class DependencyExplorerScreen extends Component {
  state = {
    searchValue: '',
  }

  onSearchPress = (value) => {
    const { fetchInfo } = this.props;
    const { searchValue } = this.state;

    fetchInfo(value || searchValue, this.callbackFail);
  }


  onChangeText = (value) => {
    const { fetchSuggestions } = this.props;
    this.setState({ searchValue: value });
    fetchSuggestions(value);
  }

  callbackFail = () => {
    Alert.alert(
      'Package name does not exist',
      'Please input a different package name.',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
    );
  }

  render() {
    const { isLoading, suggestionList } = this.props;
    const { searchValue } = this.state;

    const filteredSuggestionList = suggestionList.filter(suggestion => suggestion !== searchValue);

    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: 'PACKAGE OVERVIEW', style: styles.header }}
        />
        <View style={styles.contentContainer}>
          <Autocomplete
            containerStyle={styles.autocomplete}
            data={filteredSuggestionList}
            defaultValue={searchValue}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={value => this.onChangeText(value)}
            listStyle={styles.listStyle}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.onSearchPress(item)} key={item}>
                <Text style={styles.listText}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, i) => i.toString()}
          />
          <Button
            icon={(
              <Icon
                name="search"
                size={normalize(18)}
                color={Colors.primary}
              />
            )}
            loading={isLoading}
            title="SEARCH"
            type="outline"
            titleStyle={styles.buttonLabel}
            onPress={() => this.onSearchPress('')}
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
  },
  header: {
    fontSize: normalize(20),
    fontWeight: 'bold',
  },
  contentContainer: {
    margin: normalize(20),
    flexDirection: 'row',
  },
  autocomplete: {
    flex: 1,
  },
  listStyle: {
    margin: 0,
    paddingHorizontal: normalize(5),
  },
  listText: {
    paddingVertical: normalize(3),
    width: '100%',
    fontSize: normalize(16),
    color: Colors.gray,
  },
  buttonLabel: {
    paddingLeft: normalize(5),
  },
});

DependencyExplorerScreen.propTypes = {
  fetchSuggestions: PropTypes.func.isRequired,
  fetchInfo: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  suggestionList: PropTypes.array,
};

DependencyExplorerScreen.defaultProps = {
  suggestionList: [],
};

const mapStateToProps = store => ({
  isLoading: Selectors.isFetchSuggestionsLoading(store),
  suggestionList: Selectors.getSuggestionsList(store),
});

const mapDispatchToProps = {
  fetchSuggestions: Actions.fetchSuggestions,
  fetchInfo: Actions.fetchInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(DependencyExplorerScreen);
