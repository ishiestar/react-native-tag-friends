import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';

// Styles
const styles = StyleSheet.create({
  suggestionItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    color: 'rgba(0, 0, 0, 0.1)',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  text: {
    flex: 1,
    alignSelf: 'center',
    marginLeft: 12,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    marginEnd: 16,
    color: 'rgba(0, 0, 0, 0.8)',
  },
  thumbnailWrapper: {
    width: 35,
    height: 35,
  },
  thumbnailChar: {
    fontSize: 16,
  },
  wrapper: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export class MentionListItem extends React.PureComponent {
  onSuggestionTap = (user, hidePanel) => {
    this.props.onSuggestionTap(user);
  };

  render() {
    const {
      item: user,
      index,
      editorStyles,
      displayKey,
      secondaryKey,
    } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.suggestionItem, editorStyles.mentionListItemWrapper]}
        onPress={() => this.onSuggestionTap(user)}>
        <Image
          style={[styles.wrapper, styles.thumbnailWrapper]}
          resizeMode="cover"
          source={{ uri: user.avatar }}
        />
        <View style={[styles.text, editorStyles.mentionListItemTextWrapper]}>
          <Text style={[styles.title, editorStyles.mentionListItemTitle]}>
            {user[displayKey]}
          </Text>
          {secondaryKey ? (
            <Text
              style={[styles.username, editorStyles.mentionListItemUsername]}>
              {user[secondaryKey]}
            </Text>
          ) : (
            <></>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

export default MentionListItem;
