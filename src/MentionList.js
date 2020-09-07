import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Animated,
  View,
  StyleSheet,
} from 'react-native';

import MentionListItem from './MentionListItem';
// Styles
const styles = StyleSheet.create({
  container: {
    // flex:1,
    maxHeight: 300,
  },
  suggestionsPanelStyle: {},
  loaderContainer: {},
  mentionsListContainer: {
    height: 100,
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
        ? list.filter(user => user.username.includes(withoutAtKeyword))
        : list;
    if (!isTrackingStarted) {
      return null;
    }
    return (
      <Animated.View
        style={[
          { ...styles.suggestionsPanelStyle },
          this.props.editorStyles.mentionsListWrapper,
        ]}>
        <FlatList
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
