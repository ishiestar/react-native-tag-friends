import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderColor: 'green',
    borderWidth: 1,
  },
  textContainer: {
    alignSelf: 'stretch',
    position: 'relative',
    minHeight: 40,
    maxHeight: 140,
  },
  input: {
    fontSize: 16,
    fontWeight: '400',
    minHeight: 40,
    textAlignVertical: 'top',
    color: 'transparent',
    alignSelf: 'stretch',
    width: '100%',
  },
  androidInputMask: {
    marginTop: -10,
    marginStart: -4,
    width: '103%',
  },
  formmatedTextWrapper: {
    minHeight: 40,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  formmatedText: {
    fontSize: 16,
    fontWeight: '400',
  },
  mention: {
    fontSize: 16,
    fontWeight: '400',
    backgroundColor: 'rgba(36, 77, 201, 0.05)',
    color: '#244dc9',
  },
  placeholderText: {
    color: 'rgba(0, 0, 0, 0.1)',
    fontSize: 16,
  },
});
