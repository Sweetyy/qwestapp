<script>
  import { default as script } from './InvestigationScript.js'
  export default script
</script>

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