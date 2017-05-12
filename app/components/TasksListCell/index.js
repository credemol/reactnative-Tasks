import React, { Component, PropTypes } from 'react';

import {
    Text,
    TouchableHighlight,
    View
} from 'react-native';

import styles from './styles';

export default class TasksListCell extends Component {
    static propTypes = {
        completed: PropTypes.bool.isRequired,
        id: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired,
        onLongPress: PropTypes.func.isRequired,
        text: PropTypes.string.isRequired,
        formattedDate: PropTypes.string
    }

    constructor(props) {
        super(props);
    }

    render() {
        const isCompleted = this.props.completed ? 'line-through' : 'none';
        const textStyle = {
            fontSize: 20,
            textDecorationLine: isCompleted
        }

        return (
            <View style={styles.tasksListCellContainer}>
                <TouchableHighlight
                    onPress={ () => this.props.onPress(this.props.id) }
                    onLongPress={ () => this.props.onLongPress() }
                    underlayColor={ '#D5DBDE' }>
                    <View style={ styles.tasksListCellTextRow }>
                        <Text style={[styles.taskNameText, { textDecorationLine: isCompleted}]}>{ this.props.text }</Text>
                        <Text style={ styles.dueDateText }> { this._getDueDate() } </Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    _getDueDate() {
        if(this.props.formattedDate && ! this.props.isCompleted) {
            return 'Due ' + this.props.formattedDate;
        }
        return '';
    }
}

