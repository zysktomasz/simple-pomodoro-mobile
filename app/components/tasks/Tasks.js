import React from 'react'
import { StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import { View, Text } from 'native-base'
import { connect } from 'react-redux'
import { addTask, toggleChecked, deleteTask } from './../../redux/actions/tasksActions'

import TasksList from './TasksList'

const styles = StyleSheet.create({
    textInput: {
        padding: 15,
        borderTopWidth:2,
        borderTopColor: 'red'
    },
      addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 5,
        bottom: 5,
        backgroundColor: '#E91E63',
        width: 60,
        height: 50,
        // borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24
    }
})

class Tasks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            taskText: null
        }
    }

    onAddTask() {
        if (this.state.taskText)
        {
            this.props.addTask(this.state.taskText)
            this.setState({ taskText: null })
        }
    }

    render() {
        // displays tasks list and input w/ button to add new task
        return (
            <View style={{flex: 1}}>
                <TasksList 
                    tasks={this.props.tasks.tasksList}
                    onDelete={this.props.deleteTask}
                    onToggle={this.props.toggleChecked}
                />
                <View>
                    <TextInput 
                        style={styles.textInput}
                        onChangeText={(taskText) => this.setState({taskText})}
                        value={this.state.taskText}
                        placeholder=">task"
                        placeholderTextColor="black">
                    </TextInput>
                </View>
                {/* button to submit new task */}
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => this.onAddTask()}>
                        <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTask: (name) => dispatch(addTask(name)),
        toggleChecked: (id) => dispatch(toggleChecked(id)),
        deleteTask: (id) => dispatch(deleteTask(id))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Tasks);