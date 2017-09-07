<template>
  <section>
    <!-- Explanation's message for the investigation -->
    <q-card v-if="currentStep == 0">
      <q-card-title class="align-center">
        Are you a hero?
      </q-card-title>
      <q-card-main class="align-center">
        <p>There is only one answer possible for each questions.<br/>
        Once you validated a step you cannot change answers in previous steps.</p>
        <br/>
        <br/>
        <p class="text-faded">At the end of the investigation you will be able to see your personal result.</p>
      </q-card-main>
      <q-card-separator />
      <q-card-actions class="align-center">
        <!-- Run the investigation -->
        <q-btn @click="currentStep = 1" color="primary" big class="full-width">
          Let's start!
        </q-btn>
      </q-card-actions>
    </q-card>

    <!-- Show the current step of the investigation -->
    <div v-if="!result && currentStep > 0" class="steps align-center non-selectable">
      Step {{currentStep}}/{{numberOfSteps}}
      <q-progress :percentage="(currentStep / numberOfSteps) * 100" color="secondary" />
    </div>

    <!-- Main content of the investigation that contains the questions -->
    <div v-if="currentStep > 0 && currentStep <= numberOfSteps && !result" style="max-width: 480px; width: 100%">
      <q-card v-for="question in questions" v-bind:key="question.data" v-if="currentStep == question.step">
        <q-card-title>
          {{question.number}}. {{question.question}}
        </q-card-title>
        <q-card-main class="answer-content flexbox flexstart flexspacearound">
            <label v-for="answer in question.answers" v-bind:key="answer.data" v-bind:class="answer.checked ? 'checked' : ''" class="flexbox flexcenter check-custom">
              <input type="radio" :name="answer.name" :value="answer.label" @click="check($event, answer,question.answers)" :checked="answer.checked">
              <div></div>
              <span>{{answer.label}}</span>
            </label>
        </q-card-main>
      </q-card>
      <div class="align-center">
        <!-- Go to the next step only if the user answered to all the questions -->
        <q-btn :disabled="disableNext()" v-if="currentStep < numberOfSteps" @click="nextStep" color="primary" standard>
          Next step
        </q-btn>
        <!-- See the results after all the steps / Only displayed in the last step -->
        <q-btn :disabled="disableNext()" v-if="currentStep == numberOfSteps && !result" @click="seeResult" icon-right="check" color="primary" big>
          See your result!
        </q-btn>
      </div>
    </div>

    <!-- The result -->
    <div v-if="result" class="align-center">
        Gender: {{gender}} / Hero: {{hero}} / Age: {{age}} / Color: {{color}}
        <br/>
        <br/>

        <!-- Restart the investigation -->
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
  QProgress,
  QCardTitle,
  QCard,
  QCardMain,
  QCardActions,
  QCardSeparator,
  QRadio,
  Toast
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
    QProgress,
    QCardTitle,
    QCardMain,
    QCard,
    QCardActions,
    QCardSeparator,
    QRadio,
    Toast
  },

  data () {
    return {
      option: '',
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
    check: function (e, a, answers) {
      if (e.target.checked) {
        for (var i = 0; i < answers.length; i++) {
          var ans = answers[i]
          ans.checked = false
        }
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

  .check-custom {
    position: relative;
    flex-direction: column;
    cursor: pointer;
    margin: 4px;
    width: 60px;
  }

  .check-custom input {
    display: none;
  }

  .check-custom span {
    position: relative;
    text-align: center;
    font-size: 0.9em;
    transition: all 0.25s;
  }

  .check-custom.checked span {
    color: #26a69a;
  }

  .check-custom div {
    position: relative;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: white;
    border: solid 2px #26a69a;
    display: block;
    margin: 0 auto;
    margin-bottom: 8px;
  }

  .check-custom div:after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    left: 50%;
    top: 50%;
    border-radius: 50%;
    background: #26a69a;
    display: block;
    transition: all 0.25s;
  }

  .check-custom.checked div:after {
    width: 26px;
    height: 26px;
    left: -1px;
    top: -1px;
  }

  @media screen and (max-width: 500px) {
      .answer-content {
        display: block;
      }

      .check-custom {
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        width: auto;
      }

      .check-custom div {
        margin: 0;
        margin-right: 8px;
      }
  }

</style>
