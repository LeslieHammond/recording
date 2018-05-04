<template>
  <Row v-if="recordings.length > 0">
    <h2>Recordings:</h2>
    <Table
      :columns="recordingsColumns"
      :data="recordings"
    >
    </Table>
    <div
      v-for="(recording, index) in recordings"
      :key="index"
    >
      <audio :src="recording.src" :ref="'audio' + index" />
    </div>
  </Row>
</template>

<script>
import { Button, Col, Row, Table } from 'iview'

export default {
  components: {
    Button, Col, Row, Table
  },
  data () {
    return {
      isPlaying: false,
      recordings: this.$store.getters.getRecordings,
      recordingsColumns: [
        {
          title: 'Text',
          key: 'text'
        },
        {
          title: 'Actions',
          key: 'src',
          width: 150,
          align: 'center',
          render: (h, params) => {
            const ref = 'audio' + params.index
            return h('div', [
              h(Button, {
                props: {
                  type: this.isPlaying !== false && this.isPlaying.ref === ref ? 'success' : 'primary',
                  shape: 'circle',
                  icon: this.isPlaying !== false && this.isPlaying.ref === ref ? 'stop' : 'play'
                },
                on: {
                  click: () => {
                    this.toggleRecording(ref)
                  }
                }
              }, (this.isPlaying !== false && this.isPlaying.ref === ref ? 'Stop' : 'Play'))
            ])
          }
        }
      ]
    }
  },
  methods: {
    playAudio: function (audio, ref) {
      const self = this

      audio.onended = function () {
        self.isPlaying = false
      }

      this.isPlaying = {
        audio, ref
      }

      this.isPlaying.audio.play()
    },
    toggleRecording: function (ref) {
      const audio = this.$refs[ref][0]

      if (this.isPlaying === false) {
        this.playAudio(audio, ref)
      } else {
        this.isPlaying.audio.pause()
        this.isPlaying.audio.currentTime = 0

        if (this.isPlaying.audio === audio) {
          this.isPlaying = false
        } else {
          this.playAudio(audio, ref)
        }
      }
    }
  }
}
</script>

<style>
h2 {
  font-size: 1.75em;
  margin: 12px 0 8px 0;
}
</style>
