import React, { Component } from 'react'

import {
    ListView,
    Text,
    TextInput,
    View,
    AsyncStorage
} from 'react-native'

import TasksListCell from '../TasksListCell';
import EditTask from '../EditTask';

import styles from './styles';


export default class TasksList extends Component {
    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            currentEditedTaskObject: undefined,
            ds: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }),
            listOfTasks: [],
            text: ''
        };
    }

    componentDidMount() {
        this._updateList();
    }

    render() {
        const _dataSource = this.state.ds.cloneWithRows(this.state.listOfTasks);

        return (
            <View style={styles.container}>
          
                <TextInput 
                    autoCorrect={false}
                    onChangeText={ (text) => this._changeTextInputValue(text) }
                    onSubmitEditing={ () => this._addTask() }
                    returnKeyType={'done'}
                    style={ styles.textInput }
                    value={ this.state.text }
                />
                <ListView
                    dataSource={ _dataSource }
                    enableEmptySections={true}
                    automaticallyAdjustContentInsets={false}
                    style={ styles.listView }
                    renderRow={ (rowData, sectionID, rowID) => this._renderRowData(rowData, rowID) }
                />                      

            </View>
        )
    } // end of render

    async _addTask () {
        const singleTask = {
            completed: false,
            text: this.state.text
        }
        const listOfTasks = [...this.state.listOfTasks, singleTask];

        await AsyncStorage.setItem('listOfTasks', JSON.stringify(listOfTasks));

        this._updateList();

    } // end of _addTask

    async _updateList() {
        let response = await AsyncStorage.getItem('listOfTasks')
        let listOfTasks = await JSON.parse(response) || [];

        this.setState({
            listOfTasks
        });

        this._changeTextInputValue('')        
    }

    _changeTextInputValue(text) {
        this.setState({
            text
        });
    } // end of _changeTextInputValue
    
    _completeTask(rowID) {
        const singleUpdatedTask = {
            ...this.state.listOfTasks[rowID],
            completed: !this.state.listOfTasks[rowID].completed
        }
        this._saveAndUpdateSelectedTask(singleUpdatedTask, rowID);
    }

    _renderRowData (rowData, rowId) {
        //console.log("renderRowData", rowData, rowId);
        return (
            <TasksListCell
                completed={rowData.completed}
                formattedDate={rowData.formattedDate}
                id={rowId}
                onPress={ (rowId) => this._completeTask(rowId) }
                onLongPress={ () => this._editTask(rowData, rowId) }
                text={rowData.text}
            />
        )
    }

    _editTask(rowData, rowID) {
        this.setState({
            currentEditedTaskObject: rowData
        });
        //console.log("_editTask")
        this.props.navigator.push({
            component: EditTask,
            title: 'Edit',
            passProps: {
                changeTaskCompletionStatus: (status) => this._updateCurrentEditedTaskObject('completed', status),
                changeTaskDueDate: (date, formattedDate) => this._updateCurrentEditTaskDueDate(date, formattedDate),
                changeTaskName: (name) => this._updateCurrentEditedTaskObject('text', name),
                clearTaskDueDate: () => this._updateCurrentEditTaskDueDate(undefined, undefined),
                completed:this.state.currentEditedTaskObject.completed,
                due:this.state.currentEditedTaskObject.due,
                formattedDate:this.state.currentEditedTaskObject.formattedDate,
                text: this.state.currentEditedTaskObject.text
            },
            onRightButtonPress: ()=> this._saveCurrentEditedTask(rowID),
            rightButtonTitle: 'Save'
        })
    }

    async _saveAndUpdateSelectedTask(newTaskObject, rowID) {
        const listOfTasks = this.state.listOfTasks.slice();
        listOfTasks[rowID] = newTaskObject;

        console.log("newTaskObject", newTaskObject);

        await AsyncStorage.setItem('listOfTasks', JSON.stringify(listOfTasks));

        this._updateList();        
    }

    _saveCurrentEditedTask(rowID) {
        console.log("_saveCurrentEditedTask", rowID, this.state.currentEditedTaskObject);

        this._saveAndUpdateSelectedTask(this.state.currentEditedTaskObject, rowID);
        this.props.navigator.pop();
    }

    _updateCurrentEditTaskDueDate(date, formattedDate) {
        this._updateCurrentEditedTaskObject('due', date);
        this._updateCurrentEditedTaskObject('formattedDate', formattedDate);
    }

    _updateCurrentEditedTaskObject(key,value) {
        let newTaskObject = Object.assign({}, this.state.currentEditedTaskObject);

        newTaskObject[key] = value;

        this.setState({
            currentEditedTaskObject: newTaskObject
        });
    }
}