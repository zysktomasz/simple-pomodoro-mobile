import React from 'react'
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native'

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
})

class TasksList extends React.Component {
    constructor(props) {
        super(props)
    }


    renderItem = ({item}) => (
      <View style={styles.task}>
        <Text style={{ paddingLeft: 20, borderLeftWidth: 10, borderLeftColor: 'orange' }}>{item.name}</Text>
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