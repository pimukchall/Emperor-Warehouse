<template>
  <v-dialog
    persistent
    :retain-focus="false"
    v-model="open"
    max-width="500"
    max-height="300"
    content-class="rounded-xl"
  >
    <v-card>
      <v-card-title class="text-h5"
        ><v-icon justify="left" class="mr-3" size="50">mdi-alert</v-icon>
        Error
      </v-card-title>
      <v-divider class="mb-3"></v-divider>
      <v-card-text>
        {{ message }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="confirm" class="rounded-xl font-weight-medium mt-3">
          ตกลง
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    method: { type: Function, default: null },
    open: {
      required: true,
    },
    message: {
      type: String,
      default: 'Somthing went wrong.',
    },
  },
  data() {
    return {}
  },
  methods: {
    confirm() {
      if (this.method === null) {
        this.$emit('update:error', false)
      } else {
        this.method()
        this.$emit('update:error', false)
      }
    },
  },
}
</script>