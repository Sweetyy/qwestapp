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
