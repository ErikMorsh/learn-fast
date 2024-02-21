export default {
  state() {
    return {
      onboardStage: null,
      wordSelectedStates: [],
      words: [
        {
          id: 1,
          groupId: 1,
          stage: 1,
          reviewTime: 1706634253201,
          question: "apple",
          answer: "an eatable friut often suiet in red or green color.",
        },
        {
          id: 2,
          groupId: 1,
          stage: 1,
          reviewTime: 1706634253201,
          question: "Car",
          answer: "A viechel that can carry persons of things",
        },
        {
          id: 3,
          groupId: 2,
          stage: 2,
          reviewTime: 1706634253201,
          question: "phone",
          answer: "Something that we can use to call other people",
        },
        {
          id: 4,
          groupId: 2,
          stage: 2,
          reviewTime: 1706634253201,
          question: "Ruler",
          answer: "An instument used to draw straght lines.",
        },
        {
          id: 5,
          groupId: 1,
          stage: 1,
          reviewTime: 1706634253201,
          question: "clean",
          answer: "free from dirt, marks, or stains.",
        },
        {
          id: 6,
          groupId: 3,
          stage: 1,
          reviewTime: 1706634253201,
          question: "house",
          answer:
            "A building for human habitation, especially one that consists of a ground floor and one or more upper storeys.",
        },
        {
          id: 7,
          groupId: 1,
          stage: 3,
          reviewTime: 1706634253201,
          question: "perpendicular",
          answer:
            "at an angle of 90° to a given line, plane, or surface or to the ground.",
        },
        {
          id: 8,
          groupId: 3,
          stage: 4,
          reviewTime: 1706634253201,
          question: "rain",
          answer:
            "the condensed moisture of the atmosphere falling visibly in separate drops.",
        },
      ],
      groups: [
        {
          id: 1,
          name: "Animals",
        },
        {
          id: 2,
          name: "Colors",
        },
        {
          id: 3,
          name: "Foods",
        },
      ],
    };
  },
  mutations: {
    updateWordState: function (state, payload) {
      const wordIndex = state.words.findIndex(
        (word) => word.id === payload.wordId
      );
      const newWord = {
        ...state.words[wordIndex],
        reviewTime: payload.reviewTime,
        stage: payload.stage,
      };
      state.words.splice(wordIndex, 1);
      state.words.push(newWord);
    },
    clearWST: function (state) {
      state.wordSelectedStates = [];
    },
    clearOS: function (state) {
      state.onboardStage = null;
    },

    // New Word
    setNewWord: function (state, payload) {
      state.words.push(payload);
    },

    // New Group
    setNewGroup: function (state, payload) {
      state.groups.push(payload);
    },
  },
  actions: {
    // State Actions
    submitStatedWords: function (context, payload) {
      // payload event property arguments' posible values are: 'stage-change', 'page-refresh', 'stage-finish'

      context.state.wordSelectedStates.forEach((item) => {
        if (item.state) {
          // word must go next stage
          item.stage++;
        } else {
          // word must return stage 1
          item.stage = 1;
        }
        context.commit("updateWordState", item);
      });
      // EMPTY STORE
      // Word Selected State
      context.commit("clearWST");
      // onboardStage
      if (payload.event === "stage-finish") context.commit("clearOS");
    },

    // ---- submit new word
    submitNewWord: function (context, payload) {
      const newWord = {
        id: Date.now(),
        groupId: payload.groupId,
        stage: 1,
        reviewTime: 0,
        question: payload.question,
        answer: payload.answer,
      };

      context.commit("setNewWord", newWord);
    },

    // Group Actions
    submitNewGroup: function (context, payload) {
      const newGroup = {
        id: Date.now(),
        name: payload.groupName,
      };
      context.commit("setNewGroup", newGroup);
    },
  },
  getters: {
    getGroups: function (state) {
      return state.groups;
    },
    getGroupWords: (state) => (groupId) => {
      return state.words.filter((word) => word.groupId === groupId);
    },
    getGroupActiveWords: (state, getters) => (groupId) => {
      const groupWords = getters.getGroupWords(groupId);
      return groupWords.filter((word) =>
        getters.checkExpireTime(word.reviewTime, word.stage)
      );
    },

    // function
    checkExpireTime: (state) => (time, level) => {
      const now = Date.now();
      let oneDay = 60 * 60 * 1000;
      if (level === 1) oneDay = 1;
      return now - time > oneDay * level;
    },
  },
};
