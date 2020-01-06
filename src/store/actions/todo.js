import { todoTypes } from "../actionTypes";

const addItem = ({ item }) => {
  return {
    type: todoTypes.ADD_ITEM,
    payload: {
      item
    }
  };
};

const removeItem = ({ item }) => {
  return {
    type: todoTypes.REMOVE_ITEM,
    payload: {
      item
    }
  };
};

const clearCompleteItem = () => {
  return {
    type: todoTypes.CLEAR_COMPLETE_ITEM,
    payload: {}
  };
};

const changeIsCompleteAll = ({ isComplete }) => {
  return {
    type: todoTypes.CHANGE_IS_COMPLETED_ALL,
    payload: {
      isComplete
    }
  };
};

const changeIsComplete = ({ item, isComplete }) => {
  return {
    type: todoTypes.CHANGE_IS_COMPLETE,
    payload: {
      item,
      isComplete
    }
  };
};

export default {
  addItem,
  removeItem,
  clearCompleteItem,
  changeIsComplete,
  changeIsCompleteAll
};
