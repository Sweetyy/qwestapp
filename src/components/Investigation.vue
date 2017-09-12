<template>
  <q-layout ref="layout" view="hHr LpR lFf" :right-breakpoint="1100">
      <!-- Header -->
      <q-toolbar slot="header">
        <q-btn flat @click="$refs.layout.toggleLeft()">
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          HeroApp
          <span slot="subtitle">Searching for heroes</span>
        </q-toolbar-title>
      </q-toolbar>
      <!-- Left Side Panel -->
      <div slot="left">
        <q-list no-border link inset-separator>
          <q-list-header>Where to go?</q-list-header>
          <q-side-link item to="/home">
            <q-item-side icon="home" />
            <q-item-main label="Home" sublabel="Home page" />
          </q-side-link>
          <q-side-link item to="/comingsoon">
            <q-item-side icon="stars" />
            <q-item-main label="All the heroes" sublabel="List of the heroes" />
          </q-side-link>
          <q-side-link item to="/investigation">
            <q-item-side icon="playlist add check" />
            <q-item-main label="Become a hero" sublabel="Investigation" />
          </q-side-link>
          <q-side-link item to="/comingsoon">
            <q-item-side icon="insert emoticon" />
            <q-item-main label="About us" sublabel="Who are we?" />
          </q-side-link>
        </q-list>
      </div>

      <!-- Content of the view -->
      <div class="main-content">
        <h4 class="align-center">Investigation</h4>
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
            <q-btn @click="currentStep = 1" color="primary" big style="margin: 0 auto">
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
        <div v-if="currentStep > 0 && currentStep <= numberOfSteps && !result" style="max-width: 480px; width: 100%; margin: 0 auto">
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
            <b>Your result</b>
            <br/>
            <br/>
            Gender: {{gender}} / Ability: {{ability}} / Age: {{age}} / Color: {{color}} / Favorite hero: {{hero}} / Your dream: {{dream}}
            <br/>
            <br/>
            We will let you know by telepathy if you are a real hero...
            <br/>
            <br/>
            <!-- Restart the investigation -->
            <q-btn v-if="result" @click="restart" color="primary">
              Restart
            </q-btn>
        </div>
      </div>

      <!-- Footer -->
      <q-toolbar slot="footer">
        <q-toolbar-title>
          HeroApp - HeroTeam 2017
        </q-toolbar-title>
      </q-toolbar>
    </q-layout>
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
  QSideLink
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
    QSideLink
  },

  data () {
    return {
      option: '',
      result: false,
      currentStep: 0,
      numberOfSteps: 4,
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
          question: 'What is your gender?',
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
          question: 'What is your best ability?',
          answers: [
            {
              label: 'Strength',
              name: 'ability',
              checked: false
            },
            {
              label: 'Intelligence',
              name: 'ability',
              checked: false
            },
            {
              label: 'Mental',
              name: 'ability',
              checked: false
            },
            {
              label: 'Vision',
              name: 'ability',
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
              label: 'More than 20',
              name: 'age',
              checked: false
            },
            {
              label: 'More than 80',
              name: 'age',
              checked: false
            },
            {
              label: 'More than 1000',
              name: 'age',
              checked: false
            }
          ]
        },
        {
          number: '4',
          step: 2,
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
              label: '#ffd700',
              name: 'color',
              checked: false
            }
          ]
        },
        {
          number: '5',
          step: 3,
          question: 'What is your favorite superhero?',
          answers: [
            {
              label: 'Superman',
              name: 'hero',
              checked: false
            },
            {
              label: 'Wonderwoman',
              name: 'hero',
              checked: false
            },
            {
              label: 'Spiderman',
              name: 'hero',
              checked: false
            },
            {
              label: 'VueJS 2',
              name: 'hero',
              checked: false
            }
          ]
        },
        {
          number: '6',
          step: 4,
          question: 'What is your dream?',
          answers: [
            {
              label: 'Travel around the world',
              name: 'dream',
              checked: false
            },
            {
              label: 'Save people',
              name: 'dream',
              checked: false
            },
            {
              label: 'Fly like a bird',
              name: 'dream',
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
      this.ability = sessionStorage.ability
      this.age = sessionStorage.age
      this.color = sessionStorage.color
      this.hero = sessionStorage.hero
      this.dream = sessionStorage.dream
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

<style lang="scss" scoped>
  li {
    text-align: left;
  }

  .steps {
    width: 200px;
    margin: 0 auto;
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
    width: 24px;
    height: 24px;
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
    transition: all 0.4s;
    transition-timing-function: cubic-bezier(.17,.86,.41,1.8);
    opacity: 0;
  }

  .check-custom.checked div:after {
    width: 22px;
    height: 22px;
    left: -1px;
    top: -1px;
    opacity: 1;
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
