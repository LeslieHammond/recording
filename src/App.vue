<template>
  <Row id="app">
    <Col :lg="{span: 12, offset: 6}" :md="{span: 18, offset: 3}" :sm="{span: 18, offset: 3}" :xs="24">
      <h1>Recording platform</h1>
      <Row v-if="!supportsRecording">
        <p>Your browser does not support the recording feature.</p>
      </Row>
      <Row v-else>
        <Row v-if="allowsRecording == null">
          <Button type="primary" @click="askToAllowRecording()">Allow microphone capture</Button>
        </Row>
        <Row v-else-if="!allowsRecording">
          <p>You have denied microphone recording</p>
        </Row>
        <Row v-else>
          <!-- <Button icon="el-icon-service" @click="toggleRecording" circle v-bind:type="isRecording ? 'danger' : 'primary'"></Button> -->
          <!-- <span class="fa-layers" @click="toggleRecording">
            <FontAwesome icon="circle" transform="grow-10" style="color: crimson" />
            <FontAwesome icon="circle" transform="grow-8" style="color: #fff" />
            <FontAwesome icon="circle" transform="grow-4" style="color: crimson" />
            <FontAwesome icon="microphone" transform="shrink-2" style="color: #fff" />
          </span> -->

          <Test
            v-if="!hasTested"
          />
          <Recording
            v-else
          />
        </Row>
      </Row>
    </Col>
  </Row>
</template>

<script>
import Test from './components/Test'
import Recording from './components/Recording'
import { Button, Col, Row } from 'iview'

export default {
  components: {
    Button, Col, Recording, Row, Test
  },
  computed: {
    allowsRecording: function () {
      return this.$store.getters.getAllowsRecording
    },
    hasTested: function () {
      return this.$store.getters.getTested
    },
    supportsRecording: function () {
      return this.$store.getters.getSupportsRecording
    }
  },
  methods: {
    checkIfSupportsRecording: function () {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        this.$store.commit('setSupportsRecording', true)
      } else {
        this.$store.commit('setSupportsRecording', false)
      }
    },
    /* checkIfTested: function () {
      const tested = readCookie('tested')

      let boolean = false

      if (tested === true) {
        boolean = true
      }

      this.$store.commit('setTested', boolean)
    }, */
    askToAllowRecording: function () {
      const self = this
      navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then(function (stream) {
          self.$store.commit('setAllowsRecording', true)
          self.$store.commit('setMediaRecorder', new MediaRecorder(stream))
        })
        .catch(function (e) {
          self.$store.commit('setAllowsRecording', false)
        })
    }
  },
  created () {
    this.checkIfSupportsRecording()
    // this.checkIfTested()
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1 {
  margin-bottom: 32px;
}
</style>
