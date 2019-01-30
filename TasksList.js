import React from 'react'
import {Text, StyleSheet, ScrollView, SectionList} from 'react-native'
import TasksSingleItem from './TasksSingleItem'

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        marginBottom: 40
    }
})

class TasksList extends React.Component {
    constructor(props) {
        super(props)
    }


    renderItem = ({item}) => (
        <TasksSingleItem
            onDelete={this.props.onDelete}
            onToggle={this.props.onToggle}
            task={item} 
        />
    )

    renderSection = ({section}) => 
        (section.data.length > 0) ? (
            <Text style={{fontWeight: 'bold', left: 10}}>{section.title} ({section.data.length})</Text>
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