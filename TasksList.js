import React from 'react'
import {View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity} from 'react-native'

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
    }
})

class TasksList extends React.Component {
    constructor(props) {
        super(props)
    }


    renderItem = ({item}) => (
      <View style={styles.task}>
        <Text style={{ paddingLeft: 20, borderLeftWidth: 10, borderLeftColor: 'orange' }}>{item.name}</Text>
        <TouchableOpacity 
              style={styles.taskDelete}
              onPress={() => this.props.onDelete(item.id)}>
                <Text style={styles.taskDeleteText}>X</Text>
        </TouchableOpacity>
      </View>
    )

    render() {
        return (
            <ScrollView style={styles.scrollContainer}>
                <FlatList 
                    data={this.props.tasks}
                    renderItem={this.renderItem}
                    keyExtractor={(item, id) => id.toString()}
                />
            </ScrollView>
        )
    }
}

export default TasksList;