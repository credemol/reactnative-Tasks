import { StyleSheet } from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';

const styles = StyleSheet.create({
    editTaskContainer: {
        flex: 1,
        paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight
    },
    expandableCellContainer: {
        flex: 1,
        overflow:'hidden'
    },
    editTaskText: {
        fontSize: 36
    },
    clearDateButtonContainer: {
        flex: 1
    },
    switchContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxHeight: 50,
        padding: 10
    },
    switchText: {
        fontSize: 16
    },
    textInput: {
        borderColor: 'gray',
        borderWidth: 1,
        height: 40,
        margin: 10,
        padding: 10
    }
});



export default styles;