import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import TasksList from './TasksList'

let taskID = 4

const styles = StyleSheet.create({
    textInput: {
        padding: 15,
        borderTopWidth:2,
        borderTopColor: 'red'
    },
      addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 70,
        backgroundColor: '#E91E63',
        width: 50,
        height: 50,
        borderRadius: 25,
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
                ],
                taskText: null
            })
            
        }
    }

    deleteTask(id) {
        this.setState(prevState => ({
            tasks: prevState.tasks.filter(task => task.id !== id)
        }))
    }

    toggleChecked(id) {
        this.setState(prevState => ({
            tasks: prevState.tasks.map(task => {
              if (task.id !== id) return task
              return {
                id: task.id,
                name: task.name,
                checked: !task.checked
              }
            })
          }))
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <TasksList 
                    tasks={this.state.tasks}
                    onDelete={this.deleteTask.bind(this)}
                    onToggle={this.toggleChecked.bind(this)}
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
                    onPress={() => this.addTask()}>
                        <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Tasks;

