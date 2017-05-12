import { StyleSheet } from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight
    },
    textInput: {
        borderColor: 'gray',
        borderWidth: 1,
        height: 40
    },
    listView: {
        borderColor: 'gray',
        borderWidth: 1,        
    }
})

export default styles;
