import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import TasksList from './TasksList'

let taskID = 1

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
        backgroundColor: '#252525',
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
            tasks: []
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

    render() {
        return (
            <View style={{flex: 1}}>
                <TasksList tasks={this.state.tasks} />
                <View style={styles.footer}>
                    <TextInput 
                        style={styles.textInput}
                        onChangeText={(taskText) => this.setState({taskText})}
                        value={this.state.taskText}
                        placeholder=">note"
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

