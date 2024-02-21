<template>
  <v-card width="80vw">
    <v-form @submit.prevent class="pb-5">
      <v-row class="ma-0 mt-5">
        <v-col cols="12" class="d-flex justify-center">
          <h1>Create New Word</h1>
        </v-col>
      </v-row>
      <v-row class="ma-0 mt-5 mb-5 d-flex justify-center">
        <v-col cols="5">
          <v-card flat>
            <v-textarea
              label="Question"
              v-model="question"
              no-resize
              rows="9"
              counter
              :maxlength="maxLength"
              :rules="qRules"
              hide-details="auto"
            >
            </v-textarea>
            <v-progress-linear
              absolute
              :height="5"
              v-model="questionLength"
              :color="progressColor(questionLength)"
            >
            </v-progress-linear>
          </v-card>
        </v-col>
        <v-col cols="5">
          <v-card flat>
            <v-textarea
              label="Answer"
              v-model="answer"
              no-resize
              rows="9"
              counter
              :maxlength="maxLength"
              :rules="aRules"
              hide-details="auto"
            >
            </v-textarea>
            <v-progress-linear
              absolute
              :height="5"
              v-model="answerLength"
              :color="progressColor(answerLength)"
            >
            </v-progress-linear>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="ma-0 mt-5 d-flex justify-center">
        <v-col cols="3">
          <v-hover>
            <template v-slot:default="{ isHovering, props }">
              <v-btn
                @click="handleAction('add')"
                type="submit"
                class="w-100"
                v-bind="props"
                :color="isHovering ? 'green-accent-3' : undefined"
                >Add</v-btn
              >
            </template>
          </v-hover>
        </v-col>
        <v-col cols="3">
          <v-btn @click="handleAction('cancel')" class="w-100">Cancel</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
export default {
  props: ["isActive", "groupId"],
  data: function () {
    return {
      answer: "",
      question: "",
      maxLength: 400,
      qRules: [
        (value) => {
          if (value && value.length >= 1) return true;
          else if (!value) return "Question is required.";
        },
      ],
      aRules: [
        (value) => {
          if (value && value.length >= 1) return true;
          else if (!value) return "Answer is required.";
        },
      ],
    };
  },
  computed: {
    questionLength: function () {
      return this.question.length / (this.maxLength / 100);
    },
    answerLength: function () {
      return this.answer.length / (this.maxLength / 100);
    },
  },
  methods: {
    handleAction: function (action) {
      if (action === "cancel") {
        // cancel btn
        this.isActive.value = false;
      } else if (action === "add") {
        // add btn
        if (
          this.qRules[0](this.question) === true &&
          this.aRules[0](this.answer) === true
        ) {
          // Do Action
          const newWord = {
            groupId: this.groupId,
            question: this.question,
            answer: this.answer,
          };
          this.$store.dispatch("submitNewWord", newWord);

          // Close Dialog
          this.isActive.value = false;
        }
      }
    },
    progressColor: function (length) {
      if (length === 0 || length === 100) return "red";
      else if (length < 100 && length > 70) return "orange";
      else return "green";
    },
  },
};
</script>
