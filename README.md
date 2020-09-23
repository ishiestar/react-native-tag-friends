# react-native-mention-editor

Based on the code in https://github.com/mrazadar/react-native-mentions-editor. Still a work in progress.

#### Improvements:

- Removed backward typing bug
- Fixed cursor not showing on Android
- Can edit existing text with @ mentions
- Can customize user objects as needed
- Can show custom secondary text in mention items
- Can change the key with which to extract display name of user (**@Full Name** instead of **@username**, for instance)
- Can show mention list above or below editor as needed

## Getting started

`$ npm install react-native-mention-editor --save`

## Usage

```javascript
import Editor from 'react-native-mention-editor';

<Editor
  list={this.state.userList} //send the list of user objects
  editorStyles={{
    mainContainer: style.textInputStyle,
    inputMaskText: { fontFamily: font.regular }, //important to make sure input and
    input: { fontFamily: font.regular }, //inputMaskText styles match exactly
  }}
  displayKey="name" //specify which key in the user object to display
  extractionKey="username" //specify which key is to be treated as the unique ID of user objects
  secondaryKey="speciality" //specify what to show in the second line. Omit this prop if you don't need a second line
  showEditor
  onHideMentions={() => this.setState({ showMentions: false })}
  clearInput={this.state.clearInput}
  placeholder={strings.common.say_something}
  onChange={({ text, displayText }) => {
    this.setState({ text, displayText });
  }}
/>;
```

Whatever `displayKey` and `extractionKey` are specified, those strings are mandatory as keys in the user objects in the list passed to the Editor. For example, here, `displayKey="name"` and `extractionKey="username"` so a user object must mandatorily be of the form `{"name": "Full Name", "username": "some_one", ...any other keys and values you want}`.

The onChange() method will always receive two params:

- `text` in the form `Hey @[username](id:1) this is good work`
- `displayText` in the form `Hey @Full Name this is good work` (if you have specified `displayKey` to be "name").

To format the text according to your api's needs, you can use the following code snippet:

```javascript
import { EU } from 'react-native-mention-editor';

export const formatMentionTextToApiFormat = inputText => {
  const retLines = inputText.split('\n');
  const formattedText = [];
  retLines.forEach((retLine, rowIndex) => {
    const mentions = EU.findMentions(retLine);
    if (mentions.length) {
      let lastIndex = 0;
      mentions.forEach((men, index) => {
        const initialStr = retLine.substring(lastIndex, men.start);
        lastIndex = men.end + 1;
        formattedText.push(initialStr);
        const formattedMention = `@{{${men.id}||${men.username}}}`; //You can format the mention text any way you want here. Remember that inputText will always have the value of the extractionKey you specified as the value of the id key in this object.
        formattedText.push(formattedMention);
        if (mentions.length - 1 === index) {
          const lastStr = retLine.substr(lastIndex); //remaining string
          formattedText.push(lastStr);
        }
      });
    } else {
      formattedText.push(retLine);
    }
  });
  return formattedText.join('');
};
```

**Other Properties:**

**`list: array`** This should be the list of objects to be used as options for the mentions list. Note This must contain id and username properties to uniqely identify object in the list.

**`initialValue: string`** Use this to initialize TextInput with the initial value. Usage. initalValue: "Hey @[mrazadar](id:1) this is good work"

**`clearInput: bool`** When true input will be cleared automatically.

**`onChange: function`** This function will be called on input change event.

**`showEditor: bool`** Programmatically show/hide editor by using this property.

**`toggleEditor: function`** Use this to handle blur event on input.

**`showMentions: bool`** Use this property to programmatically trigger the mentionsList this will add @ character in the value.

**`shouldShowMentionsBelow: bool`** When true, the list of mentions will be shown below the editor instead of above.

**`onHideMentions: function`** This callback will be called when user stop tracking of mention.

**`placeholder: string`** placeholder for empty input.

**`editorStyles: object`** This object will contain the overriding styles for different nodes. Check the object below to see how you can override styles.

```javascript
editorStyles: {
    mainContainer: {},
    editorContainer: {...},
    inputMaskTextWrapper: {},
    inputMaskText: {},
    input: {},
    mentionsListWrapper:{},
    mentionListItemWrapper: {}
    mentionListItemTextWrapper: {},
    mentionListItemTitle: {}
    mentionListItemUsername: {}
}
```
