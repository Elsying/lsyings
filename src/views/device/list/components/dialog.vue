<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    custom-class="page-dialog sys-role-dialog"
  >
    <el-form
      ref="DeviceDialogForm"
      :rules="rules"
      :model="form"
      label-position="right"
      label-width="80px"
      class="page-form"
      style="width: 100%;"
    >
      <el-form-item label="设备名称" prop="dname">
        <el-input v-model="form.dname" :readonly="isDetail" oninput="value=value.replace(/[^a-z0-9]+/gi, '')" />
      </el-form-item>
      <el-form-item label="设备编号" prop="did">
        <el-input v-model="form.did" :readonly="isDetail" />
      </el-form-item>
      <el-form-item v-if="isDetail" label="用户" prop="username">
        <!-- <el-button @click="handOpenUserDialog" v-if="isUpdate">增加用户</el-button> -->
        <el-input v-model="form.username" :readonly="isDetail" />
      </el-form-item>
      <!-- <el-form-item label="状态" prop="state">
        <el-radio-group v-model="form.state" :disabled="isDetail">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item label="备注" prop="remarks">
        <el-input v-model="form.remarks" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入备注" :readonly="isDetail" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <template v-if="isDetail">
        <el-button type="primary" @click="dialogVisible=false">关闭</el-button>
      </template>
      <template v-else-if="isAdd">
        <el-button @click="restForm()">取消</el-button>
        <el-button type="primary" @click="submitAddForm()">保存</el-button>
      </template>
      <template v-else-if="isUpdate">
        <el-button @click="restForm()">取消</el-button>
        <el-button type="primary" @click="submitUpdateForm()">修改</el-button>
      </template>
    </div>

    <UserDialog ref="userDialog" @save="handleSave" />
  </el-dialog>
</template>

<script>
  import deviceApi from '@/api/device/device-list-api'
  import UserDialog from './userDialog'

  export default {
    name: 'DeviceDialog',
    components: {
      UserDialog
    },
    props: {
      // detail: 详细页面，add: 添加页面，update：编辑页面
      isDetail: {
        type: Boolean,
        default: false
      },
      isAdd: {
        type: Boolean,
        default: false
      },
      isUpdate: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        dialogVisible: false,
        dialogTitle: null,
        form: {
          id: null,
          username: null,
          dname: null,
          did: null,
          remarks: null
          // state: 1
        },
        updateId: null,
        rules: {
          dname: [
            { required: true, message: '请输入设备名称', trigger: 'blur' }
            // { required: true, message: '请输入设备名称', trigger: 'blur' }
            // { min: 4, max: 16, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          did: [
            { required: true, message: '请输入设备编号', trigger: 'blur' }
          ]
          // state: [
          //   { required: true, message: '请选择状态', trigger: 'change' }
          // ]
        }

      }
    },
    computed: {},
    created() {
    },
    methods: {
      handle(id) {
        // alert(111)
        if (this.isDetail) {
          console.log('detail...' + id)
          this.rules = null;
          this.dialogTitle = '设备详情';
          this.getRoleDetail(id);
        } else if (this.isAdd) {
          console.log('add...')
          this.dialogTitle = '新增设备';
        } else if (this.isUpdate) {
          console.log('update...')
          this.dialogTitle = '修改设备';
          this.updateId = id;
          this.getRoleDetail(id);
        }
        this.dialogVisible = true
      },
      submitAddForm() {
        this.$refs.DeviceDialogForm.validate((valid) => {
          if (valid) {
            console.log('submit!')
            this.addRole()
            // this.$emit("getList")
          } else {
            console.log('error submit!!')
            return false
          }
        });
      },
      submitUpdateForm() {
        this.$refs.DeviceDialogForm.validate((valid) => {
          if (valid) {
            console.log('submit!')
            this.updateRole()
            // this.$emit("getList")
          } else {
            console.log('error submit!!')
            return false
          }
        });
      },
      getRoleDetail(id) {
        deviceApi.detail(id).then(response => {
          if (response.code === 200) {
            this.form = response.data;
          }
        });
      },
      addRole() {
        const addParam = {
          did: this.form.did,
          dname: this.form.dname,
          remarks: this.form.remarks
          // state: this.form.state
        }
        console.log(addParam)
        deviceApi.add(addParam).then(response => {
          if (response.code === 200) {
            this.restForm();
            this.$message({
              message: '保存设备成功',
              type: 'success'
            })
            this.$emit('change')
          }
        })
      },
      updateRole() {
        const updateParam = {
          id: this.updateId,
          did: this.form.did,
          // username: this.form.username,
          dname: this.form.dname,
          remarks: this.form.remarks
          // state: this.form.state
        }
        deviceApi.update(updateParam).then(response => {
          if (response.code === 200) {
            this.restForm();
            this.$message({
              message: '修改设备成功',
              type: 'success'
            })
            this.$emit('change')
          }
        })
      },
      restForm() {
        this.$refs.DeviceDialogForm.resetFields()
        this.dialogVisible = false
      },
      handOpenUserDialog() {
        this.$nextTick(() => {
          this.$refs.userDialog.handle()
        });
      },
      handleSave(row) {
        console.log(row, '-=-=-=-=-=-=')
      },
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
