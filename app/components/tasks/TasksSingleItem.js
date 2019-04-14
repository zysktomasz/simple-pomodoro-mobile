import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "native-base";

const styles = StyleSheet.create({
  task: {
    position: "relative",
    padding: 10,
    paddingRight: 100,
    borderBottomWidth: 3,
    borderBottomColor: "#ededed"
  },
  taskButtonProps: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    top: 10,
    bottom: 10
  },
  taskDeleteButton: {
    backgroundColor: "red",
    right: 10
  },
  taskDeleteText: {
    color: "white"
  },
  taskMarkAsDoneButton: {
    backgroundColor: "green",
    right: 50
  },
  taskMarkAsUndoneButton: {
    backgroundColor: "orange",
    right: 50
  }
});

class TasksSingleItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.task}>
        <Text
          style={{
            paddingLeft: 20,
            borderLeftWidth: 10,
            borderLeftColor: !this.props.task.checked ? "orange" : "green"
          }}
        >
          {this.props.task.name}
        </Text>
        <TouchableOpacity
          style={[styles.taskButtonProps, styles.taskDeleteButton]}
          onPress={() => this.props.onDelete(this.props.task.id)}
        >
          <Text style={styles.taskDeleteText}>X</Text>
        </TouchableOpacity>
        {!this.props.task.checked && (
          <TouchableOpacity
            style={[styles.taskButtonProps, styles.taskMarkAsDoneButton]}
            onPress={() => this.props.onToggle(this.props.task.id)}
          >
            <Text style={styles.taskDeleteText}>done</Text>
          </TouchableOpacity>
        )}
        {this.props.task.checked && (
          <TouchableOpacity
            style={[styles.taskButtonProps, styles.taskMarkAsUndoneButton]}
            onPress={() => this.props.onToggle(this.props.task.id)}
          >
            <Text style={styles.taskDeleteText}>undone</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default TasksSingleItem;
