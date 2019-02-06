import React from 'react'
import {Text, SectionList} from 'react-native'
import TasksSingleItem from './TasksSingleItem'

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
            <SectionList
                renderItem={this.renderItem}
                renderSectionHeader={this.renderSection}
                sections={[
                    {title: 'To do', data: this.props.tasks.filter(task => !task.checked)},
                    {title: 'Done', data: this.props.tasks.filter(task => task.checked)},
                ]}
                keyExtractor={(item, index) => item + index}
                />
        )
    }
}

export default TasksList;