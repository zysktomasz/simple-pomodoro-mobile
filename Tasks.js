import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import TasksList from './TasksList'

let taskID = 4

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10
    },
    textInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 15,
        backgroundColor: 'white',
        borderTopWidth:2,
        borderTopColor: 'red'
    },
      addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 60,
        backgroundColor: '#E91E63',
        width: 70,
        height: 70,
        borderRadius: 35,
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
            taskText: null,
            tasks: [
                {id: 1, name: "testowy1", checked: false},
                {id: 2, name: "testowy2", checked: false},
                {id: 3, name: "testowy3", checked: false},
            ]
        }
    }

    addTask() {
        if (this.state.taskText)
        {
            taskID++
            this.setState({
                tasks: [  
                    ...this.state.tasks, 
                    {
                        id: taskID,
                        name: this.state.taskText,
                        checked: false
                    }
                ]
            })
        }
    }

    deleteTask(id) {
        this.setState(prevState => ({
            tasks: prevState.tasks.filter(task => task.id !== id)
        }))
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <TasksList 
                    tasks={this.state.tasks}
                    onDelete={this.deleteTask.bind(this)}
                />
                <View style={styles.footer}>
                    <TextInput 
                        style={styles.textInput}
                        onChangeText={(taskText) => this.setState({taskText})}
                        value={this.state.taskText}
                        placeholder=">task"
                        placeholderTextColor="black">
                    </TextInput>
                </View>
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => this.addTask()}>
                        <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Tasks;

