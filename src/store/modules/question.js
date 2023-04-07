const question = {
  state: {
    question_list: [],
    keyword: '',
  },
  getters: {
    get_question_list: (state) => state.question_list,
    get_keyword: (state) => state.keyword,
  },
  mutations: {
    Update_Question_List(state, parameter) {
      state.question_list = parameter
    },
    Update_Keyword(state, parameter) {
      state.keyword = parameter
    },
  },
  actions: {},
}

export default question
