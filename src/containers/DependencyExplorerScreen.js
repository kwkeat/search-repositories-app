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
  SafeAreaView,
  Alert,
} from 'react-native';
import * as Colors from 'themes/colors';
import { normalize } from 'utils/size';
import Autocomplete from 'react-native-autocomplete-input';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class DependencyExplorerScreen extends Component {
  state = {
    searchValue: '',
  }

  onSearchPress = () => {
    const { suggestionList } = this.props;
    const { searchValue } = this.state;

    if (suggestionList.some(suggestion => suggestion === searchValue)) {
      console.log('same');
    } else {
      Alert.alert(
        'Package name does not exist',
        'Please input a different package name.',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
      );
    }
  }

  onChangeText = (value) => {
    const { fetchSuggestions } = this.props;
    this.setState({ searchValue: value });
    fetchSuggestions(value);
  }

  render() {
    const { isLoading, suggestionList } = this.props;
    const { searchValue } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>DEPENDENCY EXPLORER</Text>
        <View style={styles.contentContainer}>
          <Autocomplete
            containerStyle={styles.autocomplete}
            data={suggestionList}
            defaultValue={searchValue}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={value => this.onChangeText(value)}
            renderItem={({ item, i }) => (
              <TouchableOpacity onPress={() => this.setState({ query: item })}>
                <Text style={styles.listText}>{item}</Text>
              </TouchableOpacity>
            )}
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
            onPress={this.onSearchPress}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: normalize(20),
    fontWeight: 'bold',
    marginVertical: normalize(20),
  },
  contentContainer: {
    marginHorizontal: normalize(20),
    flexDirection: 'row',
  },
  autocomplete: {
    flex: 1,
  },
  listText: {
    paddingVertical: normalize(3),
    fontSize: normalize(16),
    color: Colors.gray,
  },
  buttonLabel: {
    paddingLeft: normalize(5),
  },
});

DependencyExplorerScreen.propTypes = {
  fetchSuggestions: PropTypes.func.isRequired,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(DependencyExplorerScreen);
