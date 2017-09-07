<template>
  <section>
    <div v-if="!result && currentStep > 0" class="steps">
      Step {{currentStep}}
      <q-progress :percentage="(currentStep / numberOfSteps) * 100" color="secondary" />
    </div>
    <div v-if="currentStep == 0">
      <p>
        There is only one answer possible for each questions.<br/>
        Once you validated a step you cannot change answers in previous steps.
        <br/>
        <br/>
        At the end of the investigation you will be able de see your personal result.
      </p>
      <br/>
      <br/>
      <q-btn @click="currentStep = 1" color="primary">
        Let's start!
      </q-btn>
    </div>
    <div v-if="currentStep > 0 && currentStep <= numberOfSteps && !result">
      <ul class="list-heroes">
        <li v-for="question in questions" v-if="currentStep == question.step">
          <div>{{question.number}}</div>
          <div>{{question.question}}</div>
          <div v-for="answer in question.answers">
            <div>
              <input type="radio" :name="answer.name" :value="answer.label" @click="check($event, answer)" :checked="answer.checked">{{answer.label}}
            </div>
          </div>
        </li>
      </ul>
      <q-btn :disabled="disableNext()" v-if="currentStep < numberOfSteps" @click="nextStep" color="primary">
        Next step
      </q-btn>
      <q-btn v-if="currentStep == numberOfSteps && !result" @click="seeResult" icon-right="check" color="primary" big>
        See your result!
      </q-btn>
    </div>
    <div v-if="result">
        Gender: {{gender}} / Hero: {{hero}} / Age: {{age}} / Color: {{color}}
        <br/>
        <br/>
        <q-btn v-if="result" @click="restart" color="primary">
          Restart
        </q-btn>
    </div>
  </section>
</template>

<script>
import {
  QLayout,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QListHeader,
  QItem,
  QItemSide,
  QItemMain,
  QProgress
} from 'quasar'

export default {
  components: {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QProgress
  },
  data () {
    return {
      result: false,
      currentStep: 0,
      numberOfSteps: 3,
      answered: false,
      value: '',
      label: '',
      gender: '',
      hero: '',
      age: '',
      questions: [
        {
          number: '1',
          step: 1,
          question: 'Are you a boy or a girl?',
          answers: [
            {
              label: 'Boy',
              name: 'gender',
              checked: false
            },
            {
              label: 'Girl',
              name: 'gender',
              checked: false
            },
            {
              label: 'Other',
              name: 'gender',
              checked: false
            }
          ]
        },
        {
          number: '2',
          step: 1,
          question: 'Are you a hero?',
          answers: [
            {
              label: 'Not at all',
              name: 'hero',
              checked: false
            },
            {
              label: 'Sometime',
              name: 'hero',
              checked: false
            },
            {
              label: 'Often',
              name: 'hero',
              checked: false
            },
            {
              label: 'I am born to be a hero!',
              name: 'hero',
              checked: false
            }
          ]
        },
        {
          number: '3',
          step: 2,
          question: 'How old are you?',
          answers: [
            {
              label: 'Less than 20',
              name: 'age',
              checked: false
            },
            {
              label: 'Between 20 & 40',
              name: 'age',
              checked: false
            },
            {
              label: 'Between 40 & 60',
              name: 'age',
              checked: false
            },
            {
              label: 'More than 60',
              name: 'age',
              checked: false
            }
          ]
        },
        {
          number: '4',
          step: 3,
          question: 'What is your favorite color?',
          answers: [
            {
              label: 'Red',
              name: 'color',
              checked: false
            },
            {
              label: 'Blue',
              name: 'color',
              checked: false
            },
            {
              label: 'Green',
              name: 'color',
              checked: false
            },
            {
              label: 'Yellow',
              name: 'color',
              checked: false
            }
          ]
        }
      ]
    }
  },
  methods: {
    nextStep: function () {
      this.currentStep++
    },
    check: function (e, a) {
      if (e.target.checked) {
        a.checked = true
        this.label = e.target.name
        this.value = e.target.value
        sessionStorage.setItem(this.label, this.value)
      }
    },
    seeResult: function () {
      this.result = true
      this.gender = sessionStorage.gender
      this.hero = sessionStorage.hero
      this.age = sessionStorage.age
      this.color = sessionStorage.color
    },
    restart: function () {
      this.result = false
      sessionStorage.clear()
      this.currentStep = 0
      this.initData()
    },
    disableNext: function () {
      var cpt = 0
      for (var i = 0; i < this.questions.length; i++) {
        var question = this.questions[i]
        if (question.step === this.currentStep) {
          for (var j = 0; j < question.answers.length; j++) {
            var answer = question.answers[j]
            if (answer.checked) {
              cpt++
            }
          }
        }
      }
      if (cpt === this.getCountQ()) {
        return false
      }
      return true
    },
    getCountQ: function () {
      var cpt = 0
      for (var i = 0; i < this.questions.length; i++) {
        var question = this.questions[i]
        if (question.step === this.currentStep) {
          cpt++
        }
      }
      return cpt
    },
    initData: function () {
      for (var i = 0; i < this.questions.length; i++) {
        var question = this.questions[i]
        for (var j = 0; j < question.answers.length; j++) {
          var answer = question.answers[j]
          if (answer.checked) {
            answer.checked = false
          }
        }
      }
    }
  }
}
</script>

<style scoped>
  li {
    text-align: left;
  }

  .steps {
    width: 200px;
  }
</style>
