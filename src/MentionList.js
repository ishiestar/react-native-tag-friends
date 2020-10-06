import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Animated,
  View,
  StyleSheet,
} from 'react-native';
import MentionListItem from './MentionListItem';
import { isEmpty } from 'lodash';
// Styles
const styles = StyleSheet.create({
  container: {
    maxHeight: 300,
  },
  suggestionsPanelStyle: {},
  loaderContainer: {},
  mentionsListContainer: {
    // maxHeight: 100,
  },
});

export class MentionList extends React.PureComponent {
  constructor() {
    super();
    this.previousChar = ' ';
  }

  renderSuggestionsRow = ({ item }) => {
    return (
      <MentionListItem
        secondaryKey={this.props.secondaryKey}
        displayKey={this.props.displayKey}
        onSuggestionTap={this.props.onSuggestionTap}
        item={item}
        editorStyles={this.props.editorStyles}
      />
    );
  };
  render() {
    const { props } = this;
    const { keyword, isTrackingStarted } = props;

    const withoutAtKeyword = keyword.substr(1, keyword.length);
    const list = this.props.list;
    const suggestions =
      withoutAtKeyword !== ''
        ? list.filter(user => {
            return user[props.displayKey]
              .toLowerCase()
              .includes(withoutAtKeyword.toLowerCase());
          })
        : list;

    if (!isTrackingStarted) {
      return null;
    }
    if (!props.loading && isEmpty(suggestions)) return null;

    return (
      <Animated.View
        style={[
          { ...styles.suggestionsPanelStyle },
          this.props.editorStyles.mentionsListWrapper,
        ]}>
        <FlatList
          nestedScrollEnabled
          style={styles.mentionsListContainer}
          keyboardShouldPersistTaps={'always'}
          horizontal={false}
          ListEmptyComponent={
            <View style={styles.loaderContainer}>
              <ActivityIndicator />
            </View>
          }
          enableEmptySections={true}
          data={suggestions}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={rowData => {
            return this.renderSuggestionsRow(rowData);
          }}
        />
      </Animated.View>
    );
  }
}

export default MentionList;
