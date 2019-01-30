import React from 'react'
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, SectionList} from 'react-native'

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        marginBottom: 60
    },
    task: {
        position: 'relative',
        padding: 10,
        paddingRight: 100,
        borderBottomWidth:3,
        borderBottomColor: '#ededed'
    },
    taskDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10
    },
    taskDeleteText: {
        color: 'white'
    },
    taskMarkAsDone: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 50
    },
    taskMarkAsUndone: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 50
    },
})

class TasksList extends React.Component {
    constructor(props) {
        super(props)
    }


    renderItem = ({item}) => (
      <View style={styles.task}>
        <Text style={{ paddingLeft: 20, borderLeftWidth: 10, 
                        borderLeftColor: (!item.checked) ? 'orange' : 'green' }}>
            {item.name}
        </Text>
        <TouchableOpacity 
              style={styles.taskDelete}
              onPress={() => this.props.onDelete(item.id)}>
                <Text style={styles.taskDeleteText}>X</Text>
        </TouchableOpacity>
        {!item.checked && 
            <TouchableOpacity 
            style={styles.taskMarkAsDone}
            onPress={() => this.props.onToggle(item.id)}>
              <Text style={styles.taskDeleteText}>done</Text>
            </TouchableOpacity>}
        {item.checked && 
            <TouchableOpacity 
            style={styles.taskMarkAsUndone}
            onPress={() => this.props.onToggle(item.id)}>
              <Text style={styles.taskDeleteText}>undone</Text>
            </TouchableOpacity>}
    </View>
    )

    renderSection = ({section}) => 
        (section.data.length > 0) ? (
            <Text style={{fontWeight: 'bold'}}>{section.title} ({section.data.length})</Text>
        ) : null

    render() {
        return (
            <ScrollView style={styles.scrollContainer}>
                <SectionList
                    renderItem={this.renderItem}
                    renderSectionHeader={this.renderSection}
                    sections={[
                        {title: 'Todo', data: this.props.tasks.filter(task => !task.checked)},
                        {title: 'Done', data: this.props.tasks.filter(task => task.checked)},
                    ]}
                    keyExtractor={(item, index) => item + index}
                    />
            </ScrollView>
        )
    }
}

export default TasksList;