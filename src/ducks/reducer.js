// INITIAL STATE
const initialState = {
  email: "",
  user_id: 0,
  budgets: [],
  expenses:[],
  expenses_id: 0,
  budget: []
};

// ACTION CONSTANTS
const SET_USER = "SET_USER";
const LOGOUT_USER = "LOGOUT_USER";
const GET_BUDGET_BALANCE_INFO = "GET_BUDGET";
const GET_EXPENSES_INFO = 'GET_EXPENSES_INFO'
const GET_EXPENSE_ID = 'GET_EXPENSE_ID'
const GET_BUDGET = 'GET_BUDGET'
// ACTION BUILDERS
export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER
  };
}

export function getBudgetBalanceInfo(budget) {
  return { type: GET_BUDGET_BALANCE_INFO, payload: budget };
}

export function getBudgetExpenses(expenses){
  return {type: GET_EXPENSES_INFO, payload: expenses}
}

export function getExpenseId(expenses_id){
  return {type: GET_EXPENSE_ID, payload: expenses_id}
}

export function getBudget(budget){
  return {type: GET_BUDGET, payload: budget}
}

// REDUCER
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGOUT_USER:
      return initialState;
    case SET_USER:
      const { email, user_id, budgets } = payload;
      return { ...state, email, user_id, budgets };
    // case GET_BUDGET_BALANCE_INFO:
    //   const { totalExpenses, budget_balance } = payload;
    //   return { ...state, budget_balance , totalExpenses};
    case GET_EXPENSES_INFO:
      const { expenses } = payload;
      return { ...state, expenses};
 
    case GET_BUDGET:
      const { budget } = payload;
      return { ...state, budget};
    default:
      return state;
  }
};
