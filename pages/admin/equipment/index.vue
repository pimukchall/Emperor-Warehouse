<template>
  <div>
    <ModalConfirm
      :open="modal.confirm.open"
      :message="modal.confirm.message"
      :confirm.sync="modal.confirm.open"
      :method="deleteData"
    />
    <ModalComplete
      :open="modal.complete.open"
      :message="modal.complete.message"
      :complete.sync="modal.complete.open"
    />
    <ModalError
      :open="modal.error.open"
      :message="modal.error.message"
      :error.sync="modal.error.open"
    />
    <EquipmentEditDialog
      :open="editDialog"
      :edit.sync="editDialog"
      :data="editData"
    />
    <EquipmentEditUpload
      :open="editUploadDialog"
      :edit.sync="editUploadDialog"
      :data="editUploadData"
    />
    <p v-if="$fetchState.pending">กำลังเชื่อมต่อ ...</p>
    <p v-else-if="$fetchState.error">ขออภัยเกิดข้อผิดพลาด :(</p>
    <div v-else>
      <h1>รายการอุปกรณ์</h1>
      <div>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="ค้นหา"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="text-right">
            <v-btn elevation="2" rounded @click="gotoCreate"
              >เพิ่มรายการ</v-btn
            >
            <v-btn elevation="2" rounded @click="exportToExcel"
              >ออกรายงาน</v-btn
            >
          </v-col>
        </v-row>
      </div>
      <div>
        <v-row>
          <v-col
            v-for="product in filtered"
            :key="product.id"
            cols="12"
            md="4"
          >
            <v-card elevation="6" shaped>
              <v-card-actions>
                <v-card-title>
                  {{ product.name }} <br>
                  {{ product.asset_number }}
                </v-card-title>
                <v-spacer></v-spacer>
                <v-chip :color="colorCheck(product.status_id)">
                  {{ mapStatus(product.status_id) }}
                </v-chip>
              </v-card-actions>
              <v-card-subtitle>
                  ผู้รับผิดชอบ: {{ mapUser(product.user_id) }} <br>
                  แผนก: {{ mapDepartment(product.user_id) }} <br>
                  สถานที่: {{ mapLocation(product.location_id) }}
              </v-card-subtitle>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="toggleExpansion(product.id)">
                  <v-icon>{{
                    isExpanded(product.id)
                      ? 'mdi-chevron-up'
                      : 'mdi-chevron-down'
                  }}</v-icon>
                </v-btn>
                <v-btn class="mr-2" @click="gotoProfile(product.id)">
                  ดูรายละเอียด
                </v-btn>
                <v-btn class="mr-2">
                  <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                      <v-btn icon v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="openEditEquipmentDialog(product)">
                        <v-icon class="ml-2">mdi-pencil</v-icon>
                        <v-list-item-title class="ml-2" dense>แก้ไข</v-list-item-title>
                      </v-list-item>                      
                      <v-list-item @click="openEditUploadDialog(product)">
                        <v-icon class="ml-2">mdi-upload</v-icon>
                        <v-list-item-title class="ml-2" dense
                          >อัพโหลด</v-list-item-title
                        >
                      </v-list-item>
                      <v-list-item @click="confirmDelete(product.id)">
                        <v-icon class="ml-2">mdi-delete</v-icon>
                        <v-list-item-title class="ml-2" dense>ลบ</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-btn>
              </v-card-actions>
              <v-expand-transition>
                <div v-show="isExpanded(product.id)">
                  <v-divider></v-divider>
                  <v-card-text>
                    <p>จำนวน: {{ product.quantity }}</p>
                    <p>ราคา: {{ product.price }}</p>
                    <p>เลขที่เอกสาร: {{ product.document_number }}</p>
                    <p>ร้านที่ซื้อ: {{ mapStore(product.store_id) }}</p>
                    <p>วันที่ลงทะเบียน: {{ formatDate(product.date_in) }}</p>
                    <p>วันที่จัดส่ง: {{ formatDate(product.date_out) }}</p>
                    <p>หมายเหตุ: {{ product.note }}</p>
                    <p>ไฟล์ที่แนบ: {{ product.file }}</p>
                      <v-btn
                        v-if="product.file"
                        color="primary"
                        @click="openFile(product.file)"
                      >เปิด</v-btn>
                  </v-card-text>
                  <v-divider></v-divider>
                  <div>
                    <div class="text-center">
                      <qrcode-vue 
                        v-if="showQR" 
                        :value="'http://localhost:3000/admin/equipment/profile?id=' + product.id"
                        :size="200"
                      ></qrcode-vue>

                      <vue-barcode
                        v-else
                        :value="product.asset_number"
                        :options="{ width: 1, height: 30 }"
                      ></vue-barcode>
                    </div>
                    <div class="text-center">
                      <v-btn @click="toggleDisplay">{{
                        showQR ? 'แสดง Barcode' : 'แสดง QR Code'
                      }}</v-btn>
                    </div>
                  </div>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
moment.locale('th')
import * as XLSX from 'xlsx'
import QrcodeVue from 'qrcode.vue'
import VueBarcode from 'vue-barcode'
export default {
  layout: 'admin',
  middleware: 'auth',
  data() {
    return {
      search: '',
      products: [],
      location: [],
      users: [],
      store: [],
      status: [],
      departments: [],
      showQR: true,

      currentExpanded: null,

      editDialog: false,
      editData: {},

      editUploadDialog: false,
      editUploadData: {},

      modal: {
        confirm: {
          open: false,
          message: 'คุณต้องการลบข้อมูลหรือไม่?',
        },
        complete: {
          open: false,
          message: 'ลบข้อมูลเรียบร้อย',
        },
        error: {
          open: false,
          message: 'เกิดข้อผิดพลาด',
        },
      },
    }
  },
  components: {
    QrcodeVue,
    VueBarcode,
  },
  computed: {
    filtered() {
      return this.products.filter((product) => {
        return (
          product.name.toLowerCase().includes(this.search.toLowerCase()) ||
          product.asset_number.toLowerCase().includes(this.search.toLowerCase()) ||
          this.mapUser(product.user_id).toLowerCase().includes(this.search.toLowerCase()) ||
          this.mapDepartment(product.user_id).toLowerCase().includes(this.search.toLowerCase()) ||
          this.mapStore(product.store_id).toLowerCase().includes(this.search.toLowerCase()) ||
          this.mapLocation(product.location_id).toLowerCase().includes(this.search.toLowerCase()) ||
          this.mapStatus(product.status_id).toLowerCase().includes(this.search.toLowerCase()) ||
          this.formatDate(product.date_in).toLowerCase().includes(this.search.toLowerCase()) ||
          this.formatDate(product.date_out).toLowerCase().includes(this.search.toLowerCase())
        )
      })
    },
  },
  async fetch() {
    await this.fetchProductData()
    await this.fetchUserData()
    await this.fetchDepartmentData()
    await this.fetchStoreData()
    await this.fetchLocationData()
    await this.fetchStatusData()
  },
  methods: {
    async fetchProductData() {
      this.products = await this.$store.dispatch(
        'api/product/getEquipment'
      )
    },
    async fetchUserData() {
      this.users = await this.$store.dispatch('api/user/getUsers')
    },

    async fetchDepartmentData() {
      this.departments = await this.$store.dispatch('api/department/getDepartments')
    },

    async fetchStoreData() {
      this.store = await this.$store.dispatch('api/store/getStores')
    },

    async fetchLocationData() {
      this.location = await this.$store.dispatch('api/location/getLocations')
    },

    async fetchStatusData() {
      this.status = await this.$store.dispatch('api/status/getStatus')
    },
    mapUser(id) {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id === id) {
          return this.users[i].fname + ' ' + this.users[i].lname
        }
      }
      return 'ไม่มีข้อมูลผู้ใช้'
    },
    mapDepartment(userId) {
      const user = this.users.find(user => user.id === userId);
      if (user) {
        const departmentId = user.department_id;
        if (departmentId !== undefined && departmentId !== null) {
          const department = this.departments.find(department => department.id === departmentId);
          if (department) {
            return department.name;
          } else {
            return 'ไม่มีข้อมูลแผนก';
          }
        } else {
          return 'ไม่มีข้อมูลแผนก';
        }
      } else {
        return 'ไม่มีข้อมูลผู้ใช้';
      }
    },
    mapStore(id) {
      for (let i = 0; i < this.store.length; i++) {
        if (this.store[i].id === id) {
          return this.store[i].name
        }
      }
      return 'ไม่มีข้อมูลสาขา'
    },
    mapLocation(id) {
      for (let i = 0; i < this.location.length; i++) {
        if (this.location[i].id === id) {
          return this.location[i].name
        }
      }
      return 'ไม่มีข้อมูลสถานที่'
    },
    mapStatus(id) {
      for (let i = 0; i < this.status.length; i++) {
        if (this.status[i].id === id) {
          return this.status[i].name
        }
      }
      return 'ไม่มีข้อมูลสถานะ'
    },
    confirmDelete(id) {
      this.modal.confirm.open = true;
      this.modal.confirm.message = 'ยืนยันการลบข้อมูลหรือไม่?';
      this.modal.confirm.id = id;
    },
    async deleteData() {
      try {
        const req = await this.$store.dispatch('api/product/deleteProducts', { params: { id: this.modal.confirm.id } });
        this.modal.complete.open = true
        this.recordLogDelete(this.modal.confirm.id);
        this.$fetch()
      } catch (error) {
        this.modal.error.open = true
        this.modal.error.message ='ไม่สามารถลบข้อมูลได้เนื่องจากข้อมูลนี้ถูกใช้งานอยู่'
      }
    },
    gotoCreate() {
      this.$router.push('/admin/equipment/create')
    },
    openEditEquipmentDialog(data) {
      this.editData = data
      this.editDialog = true
    },
    openEditUploadDialog(data) {
      this.editUploadData = data
      this.editUploadDialog = true
    },
    isExpanded(id) {
      return this.currentExpanded === id
    },
    toggleExpansion(id) {
      this.currentExpanded = this.currentExpanded === id ? null : id
    },
    formatDate(date) {
      return moment(date).format('Do MMMM YYYY')
    },
    exportToExcel() {
      const worksheet = XLSX.utils.json_to_sheet(
        this.products.map((product) => {
          return {
            'ชื่ออุปกรณ์': product.name,
            'จำนวน': product.quantity,
            'ราคา': product.price,
            'หมายเลขครุภัณฑ์': product.asset_number,
            'เลขที่เอกสาร': product.document_number,
            'ผู้รับผิดชอบ': this.mapUser(product.user_id),
            'แผนก': this.mapDepartment(product.user_id),
            'ร้านที่ซื้อ': this.mapStore(product.store_id),
            'สถานที่': this.mapLocation(product.location_id),
            'สถานะ': this.mapStatus(product.status_id),
            'วันที่ลงทะเบียน': this.formatDate(product.date_in),
            'วันที่จัดส่ง': this.formatDate(product.date_out),
            'หมายเหตุ': product.note,
          }
        })
      )
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'รายการอุปกรณ์')
      XLSX.writeFile(workbook, 'รายการอุปกรณ์.xlsx')
      this.recordLogExport();
    },
    openFile(file) {
      const baseUrl = this.$axios.defaults.baseURL
      window.open(`${baseUrl}/${file}`, '_blank')
    },
      // window.open(`http://localhost:3001/${file}`, '_blank')
    toggleDisplay() {
      this.showQR = !this.showQR
    },
    colorCheck(status) {
      if (status === 1) {
        return 'success'
      } else if (status === 2) {
        return 'warning'
      } else if (status === 3) {
        return 'info'
      } else if (status === 4) {
        return 'error' 
      } else {
        return 'grey'
      }  
    },
    async recordLogDelete(id) {
      const product = this.products.find(product => product.id === id);
      const log = {
        user_id: this.$auth.user.id,
        product_id: id,
        action: 'ลบข้อมูล',
        description: this.$auth.user.email + ' ' + 'ลบข้อมูลอุปกรณ์' + ' ' + product.asset_number + ' ' + 'เวลา ' + moment(new Date()).format('HH:mm:ss'),
        time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      };
      console.log(log);
      this.$store.dispatch('api/log/postLogs', log);
    },
    recordLogExport() {
      const log = {
        user_id: this.$auth.user.id,
        action: 'ออกรายงาน',
        description: this.$auth.user.email + ' ' + 'ออกรายงานอุปกรณ์' + ' ' + 'เวลา ' + moment(new Date()).format('HH:mm:ss'),
        time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      };
      console.log(log);
      this.$store.dispatch('api/log/postLogs', log);
    },
    gotoProfile(id) {
      this.$router.push({ 
      path: '/admin/equipment/profile', 
      query: { id: id }
      });
      console.log(id);
    },
  },
}
</script>
