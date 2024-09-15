const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER': {
      return action.payload
    }
    default:
      return state
  }
}

export const filterString = string => {
  return {
    type: 'SET_FILTER',
    payload: string,
  }
}

export default filterReducer
