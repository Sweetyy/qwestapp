<template>
  <div>
    Investigation works fine !
    <ul class="list-heroes">
      <li v-for="question in questions" v-if="currentStep == question.step">
        <div>{{question.number}}</div>
        <div>{{question.question}}</div>
        <div v-for="answer in question.answers">
          <div>
            <input type="radio" :name="answer.name" @click="check($event)">{{answer.label}}
          </div>
        </div>
        <p v-if="answered == true">You answered correctly to this question! Congratulation man.</p>
      </li>
      <button v-if="currentStep != 4" :disabled="currentStep == 0" @click="prevStep" class="q-btn row inline flex-center q-focusable q-hoverable relative-position q-btn-rectangle q-btn-standard text-black">
        <span class="q-btn-inner row col flex-center">Previous step</span>
      </button>
      <button v-if="answered && currentStep != 4" @click="nextStep" class="q-btn row inline flex-center q-focusable q-hoverable relative-position q-btn-rectangle q-btn-standard bg-primary text-white">
        <span class="q-btn-inner row col flex-center">Next step</span>
      </button>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'investigation',
  data () {
    return {
      currentStep: 0,
      answered: false,
      questions: [
        {
          number: '1',
          step: 0,
          question: 'Are you a boy or a girl?',
          answers: [
            {
              label: 'Boy',
              name: 'gender'
            },
            {
              label: 'Girl',
              name: 'gender'
            },
            {
              label: 'Don\'t know yet!',
              name: 'gender'
            }
          ]
        },
        {
          number: '2',
          step: 1,
          question: 'Are you a hero ?',
          answers: [
            {
              label: 'Not at all',
              name: 'hero'
            },
            {
              label: 'A bit',
              name: 'hero'
            },
            {
              label: 'Often',
              name: 'hero'
            },
            {
              label: 'I am born to be a hero!',
              name: 'hero'
            }
          ]
        }
      ]
    }
  },
  methods: {
    nextStep: function () {
      this.currentStep++
      this.answered = false
    },
    prevStep: function () {
      this.currentStep--
    },
    check: function (e) {
      if (e.target.checked) {
        this.answered = true
      }
    }
  }
}
</script>

<style>
</style>
