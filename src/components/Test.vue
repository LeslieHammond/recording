<template>
  <Row>
    <RecordingButton
      :onClick="toggleTest"
      :text="currentText"
    />
    <Modal
      v-model="testModalVisible"
      title="Is the audio OK?"
    >
      <span>Listen to the audio and confirm your microphone settings:
        <Button shape="circle" :icon="isPlaying !== false ? 'stop' : 'play'" :type="isPlaying !== false ? 'success' : 'primary'" @click="toggleAudioTest">Play</Button>
        <audio :src="testAudioUrl" :ref="testAudioRef"></audio></span>
      <span slot="footer" class="dialog-footer">
        <Button type="warning" @click="testModalVisible = false">No, retry</Button>
        <Button type="success" @click="approveTest">Yes</Button>
      </span>
    </Modal>
  </Row>
</template>

<script>
import { Button, Modal, Row } from 'iview'
import RecordingButton from './RecordingButton'

export default {
  components: {
    Button, Modal, RecordingButton, Row
  },
  data () {
    return {
      currentText: 'Test before continuing',
      isPlaying: false,
      testAudioRef: 'testAudioRef',
      testAudioUrl: null,
      testModalVisible: false
    }
  },
  methods: {
    approveTest: function () {
      this.testModalVisible = false

      if (this.isPlaying !== false) {
        this.isPlaying.pause()
        this.isPlaying.currentTime = 0

        this.isPlaying = false
      }

      this.$store.commit('setTested', true)
    },
    playAudioTest: function (audio) {
      const self = this

      audio.onended = function () {
        self.isPlaying = false
      }

      this.isPlaying = audio

      this.isPlaying.play()
    },
    toggleAudioTest: function () {
      const audio = this.$refs[this.testAudioRef]

      if (this.isPlaying === false) {
        this.playAudioTest(audio)
      } else {
        this.isPlaying.pause()
        this.isPlaying.currentTime = 0

        if (this.isPlaying === audio) {
          this.isPlaying = false
        } else {
          this.playAudioTest(audio)
        }
      }
    },
    toggleTest: function () {
      const mediaRecorder = this.$store.getters.getMediaRecorder

      if (!this.$store.getters.getIsRecording) {
        mediaRecorder.start()
      } else {
        mediaRecorder.stop()

        const self = this
        mediaRecorder.ondataavailable = function (e) {
          const blob = e.data

          self.testAudioUrl = window.URL.createObjectURL(blob)
          self.testModalVisible = true
        }
      }

      this.$store.commit('setIsRecording', !this.$store.getters.getIsRecording)
    }
  }
}
</script>
