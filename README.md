
# react-native-mention-editor

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

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNMentionEditor.sln` in `node_modules/react-native-mention-editor/windows/RNMentionEditor.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Mention.Editor.RNMentionEditor;` to the usings at the top of the file
  - Add `new RNMentionEditorPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNMentionEditor from 'react-native-mention-editor';

// TODO: What to do with the module?
RNMentionEditor;
```
  