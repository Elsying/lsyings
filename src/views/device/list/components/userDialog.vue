<template>
  <el-dialog
    append-to-body
    width="80%"
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    custom-class="page-dialog sys-role-dialog"
  >
    <SysUserList :is-pick="true" @save="handleSave" />
    <div slot="footer" class="dialog-footer">
      <el-button @click="restForm()">取消</el-button>
      <el-button v-if="row.id" type="primary" @click="submitAddForm()">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import deviceApi from '@/api/device/device-list-api'
  import SysUserList from '@/views/system/sys-user/sys-user-list'

  export default {
    name: 'DeviceUserDialog',
    components: {
        SysUserList
    },
    props: {
      // detail: 详细页面，add: 添加页面，update：编辑页面
    },
    data() {
      return {
        dialogVisible: false,
        dialogTitle: null,
        row: {}
      }
    },
    computed: {},
    created() {
    },
    methods: {
      handle(id) {
        // alert(111)
        this.dialogVisible = true
      },
      submitAddForm() {
        this.$emit('save', this.row)
        this.dialogVisible = false
      },
      restForm() {
        this.dialogVisible = false
      },
      handleSave(row) {
          this.row = row;
      }
    }
  }
</script>

<style lang="scss">
  .sys-role-dialog{
    margin-top: 130px !important;
  }
</style>

<style lang="scss" scoped>

</style>
