<template>
  <div>
    <ModalConfirm
      :open="modal.confirm.open"
      :message="modal.confirm.message"
      :method="create"
      :confirm.sync="modal.confirm.open"
    />
    <ModalComplete
      :open="modal.complete.open"
      :message="modal.complete.message"
      :method="goBack"
      :complete.sync="modal.complete.open"
    />
    <ModalError
      :open="modal.error.open"
      :message="modal.error.message"
      :error.sync="modal.error.open"
    />
    <v-container>
      <v-card
        class="mx-auto text-center mt-12 pa-2 pt-10 justify-center rounded-xl"
        max-width="800"
        max-height="auto"
      >
        <v-card-title class="headline">ลงทะเบียนอุปกรณ์</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.brand"
                  :rules="[(v) => !!v || 'กรุณากรอกชื่อยี่ห้อ']"
                  label="ชื่อยี่ห้อ"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.model"
                  :rules="[(v) => !!v || 'กรุณากรอกชื่อรุ่น']"
                  label="ชื่อรุ่น"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.cpu"
                  :rules="[(v) => !!v || 'กรุณากรอกชื่อ CPU']"
                  label="ชื่อ CPU"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.gpu"
                  :rules="[(v) => !!v || 'กรุณากรอกชื่อ GPU']"
                  label="ชื่อ GPU"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.ram"
                  :rules="[(v) => !!v || 'กรุณากรอกหน่วยความจำ']"
                  label="หน่วยความจำ"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.storage"
                  :rules="[(v) => !!v || 'กรุณากรอกพื้นที่จัดเก็บข้อมูล']"
                  label="พื้นที่จัดเก็บข้อมูล"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.os"
                  :rules="[(v) => !!v || 'กรุณากรอกระบบปฏิบัติการ']"
                  label="ระบบปฏิบัติการ"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.license"
                  :rules="[(v) => !!v || 'กรุณากรอกหมายเลขลิขสิทธิ์']"
                  label="หมายเลขลิขสิทธิ์"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.asset_number"
                  :rules="[(v) => !!v || 'กรุณากรอกรหัสทรัพย์สิน']"
                  label="รหัสทรัพย์สิน"
                  outlined
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="userOptions"
                  v-model="form.user_id"
                  item-text="fname"
                  item-value="id"
                  :rules="[(v) => !!v || 'กรุณาเลือกผู้รับผิดชอบ']"
                  label="ผู้รับผิดชอบ"
                  outlined
                  required
                >
                </v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="storeOptions"
                  v-model="form.store_id"
                  item-text="name"
                  item-value="id"
                  :rules="[(v) => !!v || 'กรุณาเลือกสาขาที่ซื้อ']"
                  label="สาขาที่ซื้อ"
                  outlined
                  required
                >
                </v-select>
              </v-col>
              <v-col cols="12" sm="6">
                  <v-select
                    :items="locationOptions"
                    v-model="form.location_id"
                    item-text="name"
                    item-value="id"
                    :rules="[(v) => !!v || 'กรุณาเลือกสถานที่ตั้ง']"
                    label="สถานที่ตั้ง"
                    outlined
                    required
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    :items="statusOptions"
                    v-model="form.status_id"
                    item-text="name"
                    item-value="id"
                    :rules="[(v) => !!v || 'กรุณาเลือกสถานะ']"
                    label="สถานะ"
                    outlined
                    required
                  >
                  </v-select>
               </v-col>
              <v-col cols="12" sm="6">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="form.date_in"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="formattedDate"
                      label="วันที่ลงทะเบียน"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="[(v) => !!v || 'กรุณากรอกวันที่ลงทะเบียน']"
                      outlined
                      required
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false"
                      >ยกเลิก</v-btn
                    >
                    <v-btn text color="primary" @click="$refs.menu.save(date)"
                      >ยืนยัน</v-btn
                    >
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12">
                  <v-textarea
                      v-model="form.note"
                      label="หมายเหตุ"
                      outlined
                      >
                  </v-textarea>
              </v-col>
              <v-col cols="12">
                <v-divider></v-divider>
              </v-col>
              <v-col cols="12">
                <v-checkbox
                  v-model="agree"
                  label="ยอมรับข้อตกลงและเงื่อนไข"
                ></v-checkbox>
                <v-card-actions class="justify-center">
                  <v-btn
                    @click="confirm"
                    :disabled="!valid"
                    depressed
                    color="secondary"
                    class="font-weight-medium mt-3"
                    >เพิ่ม
                  </v-btn>
                  <v-btn 
                    color="error" 
                    @click="goBack"
                    class="font-weight-medium mt-3"
                    >ยกเลิก
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import moment from 'moment'
moment.locale('th')
export default {
  layout: 'admin',
  middleware: 'auth',
  head() {
    return {
      title: 'ลงทะเบียนอุปกรณ์',
    }
  },
  data() {
    return {
      form: {
        brand: '',
        model: '',
        cpu: '',
        gpu: '',
        ram: '',
        storage: '',
        os: '',
        license: '',
        asset_number: '',
        user_id: '',
        store_id: '',
        location_id: '',
        status_id: '',
        date_in: new Date().toISOString().substr(0, 10),
        note: '',
        category_id: 1,
      },
      userOptions: [],
      storeOptions: [],
      locationOptions: [],
      statusOptions: [],

      menu: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      modal: {
        confirm: {
          open: false,
          message: 'คุณต้องการเพิ่มรายการหรือไม่?',
        },
        complete: {
          open: false,
          message: 'เพิ่มรายการสำเร็จ',
        },
        error: {
          open: false,
          message: '',
        },
        loading: {
          open: false,
          message: 'กำลังโหลด...',
        },
      },
      valid: false,
      agree: false,
    }
  },

  computed: {
    formattedDate() {
      return moment(this.form.date_in).format('Do MMMM YYYY')
    },
  },

  async fetch() {
    await this.fetchUserData()
    await this.fetchStoreData()
    await this.fetchLocationData()
    await this.fetchStatusData()
    
  },

  methods: {
    async confirm() {
      try {
        if (!this.$refs.form.validate() || !this.agree) {
          this.modal.error.message = 'กรุณากรอกข้อมูลให้ครบถ้วน'
          this.modal.error.open = true
          return
        }
        this.modal.confirm.open = true
      } catch (error) {
        this.modal.error.message = 'เกิดข้อผิดพลาด'
      }
    },
    async create() {
      try {
        const req = await this.$store.dispatch('api/product/postProducts',this.form)
        console.log(req)
        this.modal.complete.open = true
        this.recordLog()
      } catch (error) {
        this.modal.error.message = 'เกิดข้อผิดพลาด'
      }
    },
    goBack() {
      this.$router.push('/admin/notebook')
    },
    async fetchUserData() {
      const user = await this.$store.dispatch('api/user/getUsers')
      this.userOptions = user
    },
    async fetchStoreData() {
      const store = await this.$store.dispatch('api/store/getStores')
      this.storeOptions = store
    },
    async fetchLocationData() {
      const location = await this.$store.dispatch('api/location/getLocations')
      this.locationOptions = location
    },
    async fetchStatusData() {
      const status = await this.$store.dispatch('api/status/getStatus')
      this.statusOptions = status
    },
    recordLog(){
      const log = {
        user_id: this.$auth.user.id,
        product_id: this.form.id,
        action: 'เพิ่มข้อมูล',
        description: this.$auth.user.email + ' ' + 'เพิ่มอุปกรณ์' + ' ' + this.form.brand + ' ' + this.form.model + ' ' + 'เวลา ' + moment(new Date()).format('HH:mm:ss'),
        time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      }
      this.$store.dispatch('api/log/postLogs', log);
    },
  },
}
</script>
