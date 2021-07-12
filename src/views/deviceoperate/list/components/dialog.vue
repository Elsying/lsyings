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
      label-width="100px"
      class="page-form"
      style="width: 100%"
      size="mini"
    >
      <el-form-item label="商品名" prop="name">
        <el-input v-model="form.name" :readonly="isDetail" autocomplete="off" :class="form.name.length > 37 ? 'deviceoperate-limit' : ''" />
        {{ form.name.length }}/37
      </el-form-item>
      <!-- <el-form-item label="随机字符" prop="state">
        <el-radio-group
          v-model="form.state"
          :disabled="isDetail"
          @change="handleRamdenChange"
        >
          <el-radio :label="1">前2随机</el-radio>
          <el-radio :label="2">后2随机</el-radio>
          <el-radio :label="3">无</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item label="上架状态" prop="shelfStatus">
        <el-radio-group v-model="form.shelfStatus" :disabled="isDetail">
          <el-radio :label="1">上架</el-radio>
          <el-radio :label="0">下架</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <!-- <el-input v-model="form.price" :readonly="isDetail" oninput="if(value<300)value=300;if(value>9999999)value=9999999; value=value.replace(/\D/g,'');value=value.replace('.','')" /> -->
        <el-input-number v-model="form.price" :readonly="isDetail" controls-position="right" :min="300" :max="9999999" />
      </el-form-item>
      <el-form-item label="一级类目" prop="firstCategory">
        <el-select
          v-model="form.firstCategory"
          filterable
          allow-create
          default-first-option
          placeholder="一级类目"
        >
          <el-option
            v-for="item in firstCategoryList"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-popconfirm
          title="确认清空一级类目缓存吗？"
          @onConfirm="clearCategory('firstCategoryList')"
        >
          <el-button slot="reference" size="mini">清空缓存</el-button>
        </el-popconfirm>
      </el-form-item>
      <el-form-item label="二级类目" prop="secondaryCategory">
        <el-select
          v-model="form.secondaryCategory"
          filterable
          allow-create
          default-first-option
          placeholder="二级类目"
        >
          <el-option
            v-for="item in secondaryCategoryList"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-popconfirm
          title="确认清空二级类目缓存吗？"
          @onConfirm="clearCategory('secondaryCategoryList')"
        >
          <el-button slot="reference" size="mini">清空缓存</el-button>
        </el-popconfirm>
      </el-form-item>
      <el-form-item label="三级类目" prop="threeCategory">
        <el-select
          v-model="form.threeCategory"
          filterable
          allow-create
          default-first-option
          placeholder="三级类目"
        >
          <el-option
            v-for="item in threeCategoryList"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-popconfirm
          title="确认清空三级类目缓存吗？"
          @onConfirm="clearCategory('threeCategoryList')"
        >
          <el-button slot="reference" size="mini">清空缓存</el-button>
        </el-popconfirm>
      </el-form-item>
      <el-form-item label="品牌" prop="brand">
        <el-input v-model="form.brand" :readonly="isDetail" />
      </el-form-item>
      <el-form-item label="发货地址" prop="address">
        <el-select v-model="form.address" placeholder="请选择" style="width: 100%">
          <el-option
            v-for="item in addressList"
            :key="item.label"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="发货方式" prop="deliveryMethod">
        <el-select v-model="form.deliveryMethod" :readonly="isDetail" placeholder="请选择" style="width: 100%">
          <el-option value="普通郵便（定形、定形外）" label="普通郵便（定形、定形外）" />
          <el-option value="レターパック" label="レターパック" />
          <el-option value="ゆうゆうメルカリ便" label="ゆうゆうメルカリ便" />
          <el-option value="未定" label="未定" />
        </el-select>
      </el-form-item>
      <el-form-item label="运费承担人" prop="freightPayer">
        <el-select v-model="form.freightPayer" :readonly="isDetail" placeholder="请选择" style="width: 100%">
          <el-option value="送料込み（出品者負担）" label="送料込み（出品者負担）" />
          <el-option value="着払い（購入者負担）" label="着払い（購入者負担）" />
        </el-select>
      </el-form-item>
      <el-form-item label="发货日期" prop="deliveryDate">
        <el-select v-model="form.deliveryDate" :readonly="isDetail" placeholder="请选择" style="width: 100%">
          <el-option value="1～2日で発送" label="1～2日で発送" />
          <el-option value="2～3日で発送" label="2～3日で発送" />
          <el-option value="4～7日で発送" label="4～7日で発送" />
        </el-select>
      </el-form-item>
      <!-- todo -->
      <el-form-item label="新旧程度" prop="onstate">
        <el-select v-model="form.onstate" :readonly="isDetail" placeholder="请选择" style="width: 100%">
          <el-option value="新品、未使用" label="新品、未使用" />
          <el-option value="未使用に近い" label="未使用に近い" />
          <el-option value="目立った傷や汚れなし" label="目立った傷や汚れなし" />
        </el-select>
      </el-form-item>
      <!-- todo -->
      <el-form-item label="商品描述" prop="description">
        <el-input
          :id="form.description.length > 1000 ? 'deviceoperate-description' : ''"
          v-model="form.description"
          type="textarea"
          :rows="30"
          :readonly="isDetail"
          placeholder="请输入内容"
        />
        {{ form.description.length }}/1000
        <!-- deviceoperate-description -->
      </el-form-item>
      <el-form-item label="截图范围 距左侧随机数开始">
        <el-input v-model="form.leftstart" placeholder="距左侧随机数开始" :readonly="isDetail" />
      </el-form-item>
      <el-form-item label="截图范围 距左侧随机数结束">
        <el-input v-model="form.leftend" placeholder="距左侧随机数结束" prop="leftend" :readonly="isDetail" />
      </el-form-item>
      <el-form-item label="截图范围 距上侧随机数开始">
        <el-input v-model="form.upstart" placeholder="距上侧随机数开始" prop="upstart" :readonly="isDetail" />
      </el-form-item>
      <el-form-item label="截图范围 距上侧随机数结束">
        <el-input v-model="form.upend" placeholder="距上侧随机数结束" prop="upend" :readonly="isDetail" />
      </el-form-item>
      <el-form-item label="展示图" prop="piclist">
        <!--  -->
        <el-upload
          ref="upload"
          multiple
          action=""
          :on-change="fileChange"
          :on-remove="removeFile"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button
            slot="trigger"
            size="small"
            type="primary"
          >选取文件（最少一张）</el-button>
          <el-button
            v-if="fileList.length > 0"
            icon="el-icon-upload"
            type="primary"
            @click="saveFile"
          >开始上传</el-button>
        </el-upload>
        <div v-if="form.piclist && form.piclist.length > 0">
          <div
            v-for="(item, index) in form.piclist.split(';')"
            :key="item"
            class="deviceoperate-img-con"
            draggable="true"
            @dragstart="handleDragStart($event, index, item)"
            @dragover="handleDragOver($event, index, item)"
            @drop="handleDrop($event, index, item)"
          >
            <img
              class="deviceoperate-img"
              :src="origin + '/api/resource/' + item"
              width="120px"
            >
            <div class="deviceoperate-img-delete" @click="handleDeleteImg(item, index)">删除</div>
            <!-- :src="'http://116.62.196.62:8888/api/resource/' + item" -->

            <!-- <i
              class="el-icon-delete deviceoperate-delete"
              @click="handleDeleteImg(item, index)"
            ></i> -->
          </div>
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <template v-if="isDetail">
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >关闭</el-button>
      </template>
      <template v-else-if="isAdd">
        <el-button @click="restForm()">取消</el-button>
        <el-button type="primary" @click="submitAddForm()">保存</el-button>
      </template>
      <template v-else-if="isUpdate">
        <el-button @click="restForm()">取消</el-button>
        <el-button type="primary" @click="submitUpdateForm()">修改</el-button>
      </template>
      <template v-else-if="isCopy">
        <el-button @click="restForm()">取消</el-button>
        <el-button type="primary" @click="submitCopyForm()">拷贝</el-button>
      </template>
    </div>
    <UserDialog ref="userDialog" @save="handleSave" />
  </el-dialog>
</template>

<script>
import productApi from "@/api/product/product-api";
import UserDialog from "./userDialog";

import axios from "axios";

export default {
  name: "DeviceDialog",
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
    },
    isCopy: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogTitle: null,
      form: {
        id: 0,
        did: 0,
        name: "",
        code: "",
        price: "",
        firstCategory: "",
        secondaryCategory: "",
        threeCategory: "",
        brand: "",
        address: "",
        deliveryMethod: "",
        freightPayer: "",
        deliveryDate: "",
        onstate: "",
        shelfStatus: 0,
        piclist: "",
        description: "",
        createTime: "",
        updateTime: "",
        deleted: 0,
        commoditynum: 0,
        upend: '30',
        upstart: '10',
        leftend: '30',
        leftstart: '10'
      },
      updateId: null,
      rules: {
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
          // { min: 4, max: 16, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请选择随机字符', trigger: 'change' }
        ],
        shelfStatus: [
          { required: true, message: '请选择上下架状态', trigger: 'change' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'change' }
        ],
        firstCategory: [
          { required: true, message: '请输入一级类目', trigger: 'change' }
        ],
        secondaryCategory: [
          { required: true, message: '请输入二级类目', trigger: 'change' }
        ],
        threeCategory: [
          { required: true, message: '请输入三级类目', trigger: 'change' }
        ],
        // brand: [
        //   { required: true, message: '请输入品牌', trigger: 'change' }
        // ],
        address: [
          { required: true, message: '请输入发货地址', trigger: 'change' }
        ],
        deliveryMethod: [
          { required: true, message: '请选择发货方式', trigger: 'change' }
        ],
        freightPayer: [
          { required: true, message: '请选择运费承担人', trigger: 'change' }
        ],
        deliveryDate: [
          { required: true, message: '请选择发货日期', trigger: 'change' }
        ],
        onstate: [
          { required: true, message: '请选择新旧程度', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请输入商品描述', trigger: 'change' }
        ],
        leftstart: [
          { required: true, message: '请输入距左侧随机数开始', trigger: 'change' }
        ],
        leftend: [
          { required: true, message: '请输入距左侧随机数结束', trigger: 'change' }
        ],
        upstart: [
          { required: true, message: '请输入距上侧随机数开始', trigger: 'change' }
        ],
        upend: [
          { required: true, message: '请输入距上侧随机数结束', trigger: 'change' }
        ],
        piclist: [
          { required: true, message: '请上传图片', trigger: 'change' }
        ]
      },
      addressList: [
        { value: 1, label: "東京都" },
        { value: 2, label: "埼玉県" },
        { value: 3, label: "千葉県" },
        { value: 4, label: "神奈川県" },
        { value: 5, label: "群馬県" },
        { value: 6, label: "大阪府" },
        { value: 7, label: "未定" }
      ],
      // img
      fileList: [],
      formData: {},
      origin: window.location.protocol + "//" + window.location.hostname + ':8888',
      // 拖拽
      dragObj: { index: 0, item: {}},
      dropObj: { index: 0, item: {}},
      // 目录list
      firstCategoryList: [],
      secondaryCategoryList: [],
      threeCategoryList: []
    };
  },
  computed: {},
  created() {},
  methods: {
    handle(id) {
      this.flushCategoryList()
      // alert(111)
      if (this.isDetail) {
        console.log("detail..." + id);
        this.rules = null;
        this.dialogTitle = "商品详情";
        this.getRoleDetail(id);
      } else if (this.isAdd) {
        console.log("add...");
        this.dialogTitle = "新增商品";
      } else if (this.isUpdate) {
        console.log("update...");
        this.dialogTitle = "修改商品";
        this.updateId = id;
        this.getRoleDetail(id);
      } else if (this.isCopy) {
        console.log("copy...");
        this.dialogTitle = "修改商品";
        this.updateId = id;
        this.getRoleDetail(id);
      }
      this.dialogVisible = true;
    },
    submitAddForm() {
      this.$refs.DeviceDialogForm.validate((valid) => {
        if (Number(this.form.leftstart) > Number(this.form.leftend) || Number(this.form.upstart) > Number(this.form.upend)) {
          this.$message({
            type: 'error',
            message: `添加失败，截图范围开始数必须大于结束数`
          });
          return
        }
        if (this.form.name.length > 37) {
          this.$message({
            type: 'error',
            message: `修改失败，商品名超出字数`
          });
          return
        }
        if (this.form.description.length > 1000) {
          this.$message({
            type: 'error',
            message: `修改失败，商品描述超出字数`
          });
          return
        }
        if (valid) {
          console.log("submit!");
          this.addRole();
          // this.$emit("getList")
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitUpdateForm() {
      this.$refs.DeviceDialogForm.validate((valid) => {
        if (Number(this.form.leftstart) > Number(this.form.leftend) || Number(this.form.upstart) > Number(this.form.upend)) {
          this.$message({
            type: 'error',
            message: `修改失败，截图范围开始数必须大于结束数`
          });
          return
        }
        if (this.form.name.length > 37) {
          this.$message({
            type: 'error',
            message: `修改失败，商品名超出字数`
          });
          return
        }
        if (this.form.description.length > 1000) {
          this.$message({
            type: 'error',
            message: `修改失败，商品描述超出字数`
          });
          return
        }
        if (valid) {
          console.log("submit!");
          this.updateRole();
          // this.$emit("getList")
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitCopyForm() {
      this.$refs.DeviceDialogForm.validate((valid) => {
        if (valid) {
          const tempForm = JSON.parse(JSON.stringify(this.form))
          this.$emit("copy", tempForm)
          this.restForm()
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getRoleDetail(id) {
      productApi.detail(id).then((response) => {
        if (response.code === 200) {
          this.form = response.data;
          // this.$set(this.form, 'upend', 30)
          // this.$set(this.form, 'upstart', 10)
          // this.$set(this.form, 'leftend', 30)
          // this.$set(this.form, 'leftstart', 10)
          if (this.form.piclist) {
            this.fileList = this.form.piclist.split(';')
          }
        }
      });
    },
    addRole() {
      this.form.deviceId = this.$parent.deviceId;
      this.form.did = this.$parent.deviceId;
      const addParam = this.form;
      productApi.add(addParam).then((response) => {
        if (response.code === 200) {
          this.saveCategory();
          this.restForm();
          this.$message({
            message: "保存商品成功",
            type: "success"
          });
          this.$emit("change");
        }
      });
    },
    updateRole() {
      productApi.update(this.form).then((response) => {
        if (response.code === 200) {
          this.saveCategory();
          this.restForm();
          this.$message({
            message: "修改商品成功",
            type: "success"
          });
          this.$emit("change");
        }
      });
    },
    restForm() {
      this.$refs.DeviceDialogForm.resetFields();
      this.dialogVisible = false;
    },
    handOpenUserDialog() {
      this.$nextTick(() => {
        this.$refs.userDialog.handle();
      });
    },
    handleSave(row) {},
    // handle随机字符串
    handleRamdenChange(v) {
      function randomString(e) {
        e = e || 2;
        var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678!@#$%^&*<>/*-+()=~.;|[]{}";
        var a = t.length;
        var n = "";
        for (var i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
        return n
      }
      if (v === 1) {
        do {
          var rstr = randomString(2)
        } while (!isNaN(rstr));
        this.form.name = rstr + this.form.name;
      }
      if (v === 2) {
        do {
          var rstrs = randomString(2)
        } while (!isNaN(rstrs));
        this.form.name = this.form.name + rstrs;
      }
      // if (v === 3) {
      //   this.form.name = "";
      // }
    },
    // 上传图片成功
    // on-change：文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    fileChange(file, fileList) {
      this.fileList = fileList;
      const existFile = fileList
        .slice(0, fileList.length - 1)
        .find((f) => f.name === file.name); // 如果文件名重复
      if (existFile) {
        this.$message.error("当前文件已经存在!");
        fileList.pop();
      }
    },
    // on-remove：文件列表移除文件时的钩子
    removeFile(file, fileList) {
      this.fileList = fileList; // 此处fileList为删除文件后，剩余的文件
    },
    // 保存上传
    saveFile() {
      const { uploadFiles } = this.$refs.upload;
      const formData = new FormData();
      formData.append("token", JSON.parse(sessionStorage.userInfo).token);
      formData.append("deviceid", this.$parent.deviceId);
      formData.append("did", this.$parent.deviceId);
      formData.append("leftend", this.form.leftend);
      formData.append("leftstart", this.form.leftstart);
      formData.append("upend", this.form.upend);
      formData.append("upstart", this.form.upstart);
      uploadFiles.forEach((item) => {
        formData.append("files", item.raw);
      });
      // 此时所有的钩子已经执行完了fileData 中存的是通过校验的数据
      productApi
        .upload(formData)
        .then((res) => {
          const temp = res.data.data.map((item) => {
            return item.split("/resource/")[1];
          });
          if (this.form.piclist !== "") {
            if (temp.join(";") !== "") {
              this.form.piclist = this.form.piclist + ";" + temp.join(";");
            }
          } else {
            this.form.piclist =  temp.join(";");
          }


          this.$refs.upload.clearFiles()
        })
        .catch((err) => {
          console.log(err, "---------");
        });
      // this.subFile(formData).then(res => {
      //   // this.diaFile = false
      //   // -----可写保存成功后执行的操作，此处省略
      //   this.fileList = []// 清空
      // }).catch((res) => {
      // // -----可写保存失败后执行的操作，此处省略
      //   // this.diaFile = false
      // })
    },
    // 取消
    cancelUploadFile() {
      // this.diaFile = false//关闭弹窗
      this.importList = {
        // 清空表单其他项
        sysName: "", // 系统名称
        resName: "", // 资源名称
        resItemName: "", // 资源项名称
        fileList: "" // 文件名列表
      };
      this.fileList = [];
    },
    subFile(data) {
      return axios({
        // todo 换成相对ip地址
        url: "http://116.62.196.62:8888/api/commodity/upload",
        method: "post",
        data,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
    },
    // 删除图片
    handleDeleteImg(item, index) {
      this.fileList.splice(index, 1);
      const arr = this.form.piclist.split(';')
      arr.splice(index, 1)
      this.form.piclist = arr.join(';')
      // this.form.piclist.split(';').splice(index, 1).join(';')
      // this.form.piclist = this.fileList.join(";");
    },
    // 拖拽
    handleDragStart($event, index, item) {
      this.dragObj = { index, item }
    },
    handleDragOver($event, index, item) {
      $event.preventDefault();
      // console.log('handleDragOver', $event, index, item)
    },
    handleDrop($event, index, item) {
      this.dropObj = { index, item }

      const arr = this.form.piclist.split(';')
      arr[this.dragObj.index] = this.dropObj.item
      arr[this.dropObj.index] = this.dragObj.item
      this.form.piclist = arr.join(';')
    },
    // 三级目录缓存功能
    saveCategory() {
      // 1
      if (!localStorage.firstCategoryList) {
          localStorage.firstCategoryList = []
      }

      const arr1 = localStorage.firstCategoryList.split(',')
      arr1.push(this.form.firstCategory)
      localStorage.firstCategoryList = Array.from(new Set(arr1))
      // 2
      if (!localStorage.secondaryCategoryList) {
          localStorage.secondaryCategoryList = []
      }
      const arr2 = localStorage.secondaryCategoryList.split(',')
      arr2.push(this.form.secondaryCategory)
      localStorage.secondaryCategoryList = Array.from(new Set(arr2))
      console.log(arr2)
      // 3
      if (!localStorage.threeCategoryList) {
          localStorage.threeCategoryList = []
      }
      const arr3 = localStorage.threeCategoryList.split(',')
      arr3.push(this.form.threeCategory)
      localStorage.threeCategoryList = Array.from(new Set(arr3))
      console.log(arr3)
    },
    // 清空三级目录缓存
    clearCategory(category) {
      localStorage.removeItem(category)
      this.flushCategoryList()
      this.$message.success('缓存清除成功')
    },
    // 刷新三级List
    flushCategoryList() {
      if (localStorage.firstCategoryList) {
        this.firstCategoryList = localStorage.firstCategoryList.split(',').filter(item => {
          if (item) return item
        })
      } else {
        this.firstCategoryList =  []
      }
      if (localStorage.secondaryCategoryList) {
        this.secondaryCategoryList = localStorage.secondaryCategoryList.split(',').filter(item => {
          if (item) return item
        })
      } else {
        this.secondaryCategoryList =  []
      }
      if (localStorage.threeCategoryList) {
        this.threeCategoryList = localStorage.threeCategoryList.split(',').filter(item => {
          if (item) return item
        })
      } else {
        this.threeCategoryList =  []
      }
    }
  }
};
</script>

<style lang="scss">
.sys-role-dialog {
  margin-top: 10px !important;

}
#deviceoperate-description > textarea {
  color: red!important;
}
.deviceoperate-limit > input {
  color: red!important;
}
.deviceoperate-limit {
  color: red!important;
}
#deviceoperate-description {
  color: red!important;
}
</style>

<style lang="scss" scoped>
.deviceoperate-img {
  position: relative;
}
.deviceoperate-delete {
  position: relative;
  bottom: 80px;
  right: 45px;
  background-color: #f0f0f0;
  border-radius: 15px;
  font-size: 30px;
  padding: 2px;
}
.deviceoperate-delete:hover {
  color: red;
  cursor: pointer;
}
.deviceoperate-img-con {
  display: inline-block;
  margin: 0 5px 5px 0 ;
}
.deviceoperate-img-delete {
  background-color: red;
  color: #fff;
  text-align: center;
  border-radius: 3px;
  margin: -10px 0 0;
}
.deviceoperate-img-delete:hover {
  cursor: pointer;
  background-color: rgb(253, 83, 83);
}
</style>
