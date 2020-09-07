
# react-native-mention-editor

Based on the code in https://github.com/mrazadar/react-native-mentions-editor. Still a work in progress.

#### Improvements: 
 - Removed backward typing bug
 - Can customize user objects as needed 
 - Can change the key with which to extract display name of user (**@Full Name** instead of **@username**, for instance)

## Getting started

`$ npm install react-native-mention-editor --save`

### Mostly automatic installation

`$ react-native link react-native-mention-editor`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-mention-editor` and add `RNMentionEditor.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNMentionEditor.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNMentionEditorPackage;` to the imports at the top of the file
  - Add `new RNMentionEditorPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-mention-editor'
  	project(':react-native-mention-editor').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-mention-editor/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-mention-editor')
  	```


## Usage
```javascript
import Editor from 'react-native-mention-editor';

<Editor
   list={this.state.userList} //send the list of user objects
   editorStyles={{
      mainContainer: style.textInputStyle,
      inputMaskText: { fontFamily: font.regular }, //important to make sure input and 
      input: { fontFamily: font.regular },         //inputMastText styles match exactly
   }}
   displayKey="name"   //specify which key in the user object to display
   extractionKey="username" //specify which key is to be treated as the unique ID of user objects
   showEditor
   onHideMentions={() =>
     this.setState({ showMentions: false })
   }
   clearInput={this.state.clearInput}
   placeholder={strings.common.say_something}
   onChange={({ text, displayText }) => {
     this.setState({ text, displayText });
   }}
   />
```
  Whatever `displayKey` and `extractionKey` are specified, those strings are mandatory as keys in the user objects in the list passed to the Editor. For example, here, `displayKey="name"` and `extractionKey="username"` so a user object must mandatorily be of the form `{"name": "Full Name", "username": "some_one", ...any other keys and values you want}`.
  
  The onChange() method will always return ```text``` in the form ```Hey @[username](id:1) this is good work```. ```displayText``` will be in the form ```Hey @Full Name this is good work``` if you have specified ```displayKey``` to be "name". 
  
  To format the text according to your api's needs, you can use the following code snippet:
  
  ```
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
        const formattedMention = `@{{${men.id}||${men.username}}}`; //You can format the mention text anyway you want here. Remember that text will always have id as the extractionKey you specified
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

**`clearInput: bool`** When true input will be clear automatically.

**`onChange: function`** This function will be called on input change event.

**`showEditor: bool`** Programmatically show/hide editor by using this property.

**`toggleEditor: function`** Use this to handle blur event on input.

**`showMentions: bool`** Use this property to programmatically trigger the mentionsList this will add @ character in the value.

**`onHideMentions: function`** This callback will be called when user stop tracking of mention.

**`placeholder: string`** placeholder for empty input.

**`editorStyles: object`** This object will contain the overriding styles for different nodes. Check the below object to see how you can override styles.

```editorStyles: {
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
}```
