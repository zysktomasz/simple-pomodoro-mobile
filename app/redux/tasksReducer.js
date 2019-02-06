// import tasks' action types
import { ADD_TASK, DELETE_TASK, TOGGLE_CHECKED } from './tasksActions'

// tasks store cantains only array of tasks
const initialState = {
    nextTaskId: 0,
    tasksList: [
        {id: 1, name: "test", checked: false},
        {id: 2, name: "test", checked: false},
        {id: 3, name: "test", checked: false},
        {id: 4, name: "test", checked: false},
        {id: 5, name: "test", checked: false},
        {id: 6, name: "test", checked: false},
        {id: 7, name: "test", checked: false},
        {id: 8, name: "testtesttesttesttesttesttest testtesttesttest testtest", checked: false},
    ]
}

export default function tasksReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_TASK:
            return {
                ...state,
                tasksList: [
                    ...state.tasksList,
                    {
                        id: state.nextTaskId,
                        name: action.payload.name,
                        checked: false
                    }
                ],
                nextTaskId: state.nextTaskId + 1
            }
        case TOGGLE_CHECKED:
            // find updated task's index in array by its id sent in action.payload
            let taskIndex = state.tasksList.findIndex(function (task) { return task.id == action.payload.id })
            return {
                ...state,
                tasksList: state.tasksList.map((item, index) => {
                    if (index !== taskIndex) return item
                    return {
                        ...item,
                        checked: !item.checked
                    }
                })
            }
        case DELETE_TASK:
            // find updated task's index in array by its id sent in action.payload
            let tIndex = state.tasksList.findIndex(function (task) { return task.id == action.payload.id })
            return {
                ...state,
                tasksList: state.tasksList.filter((item, index) => index !== tIndex)
            }
        default: 
            return state;
    }
}