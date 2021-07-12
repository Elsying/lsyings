<template>
  <div id="device-list" class="app-container">
    <div class="filter-container">
      <!-- 设备选择 -->
      <el-select
        v-model="deviceId"
        filterable
        remote
        reserve-keyword
        clearable
        :remote-method="getDeviceList"
        placeholder="请选择设备"
        @change="handleDeviceChange"
      >
        <el-option
          v-for="item in deviceList"
          :key="item.id"
          :label="item.username + '：' + item.did"
          :value="item.id"
        />
      </el-select>
      <!-- 关键字查询 -->
      <!-- <el-input
        v-if="false"
        v-model="searchValue"
        placeholder="请输入关键字进行查询"
        clearable
        class="input-with-select"
        @keyup.enter.native="getList()"
      >
        <el-select slot="prepend" v-model="searchColumn" placeholder="请选择">
          <el-option
            v-for="item in searchOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-input> -->
      <!--      <el-button-->
      <!--        v-waves-->
      <!--        type="primary"-->
      <!--        icon="el-icon-search"-->
      <!--        style="width: 115px"-->
      <!--        @click="handleFilter"-->
      <!--      >搜索</el-button>-->
      <el-button
        v-if="isGetAllList"
        type="primary"
        @click="getList"
      >获取所有商品</el-button>
      <el-button
        v-if="deviceId"
        type="primary"
        icon="el-icon-edit"
        style="margin-left: 10px; width: 92px"
        @click="handleAdd"
      >添加
      </el-button>
      <!-- device tag -->
      <el-tag
        v-for="(tag, index) in tags"
        :key="tag.name"
        style="cursor: pointer"
        closable
        :type="selectTag.id === tag.id ? '' : 'info'"
        @close="handleClose(tag)"
        @click="handleTagClick(tag, index)"
      >
        {{ tag.name }}
      </el-tag>
      <!-- copy -->
      {{
        Object.keys(copyObj).length > 0 ? "[已复制" + copyObj.name + "]" : ""
      }}
      <el-button
        v-if="Object.keys(copyObj).length > 0"
        type="text"
        @click="handleCancelCopy"
      >[取消]</el-button>
      <el-button
        v-if="deviceId && Object.keys(copyObj).length > 0"
        type="text"
        @click="handCopy(copyObj.id)"
      >[修改]</el-button>
      <el-button
        v-if="deviceId && Object.keys(copyObj).length > 0"
        type="text"
        @click="handleDoCopy(copyObj)"
      >[粘贴]</el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChange"
    >
      <el-table-column
        label="编号"
        prop="id"
        sortable="custom"
        align="center"
        width="80px"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户" min-width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品图片" min-width="130px" align="center">
        <template slot-scope="{ row }">
          <span v-if="row.piclist">
            <!--              v-for="item in row.piclist.split(';')"-->
            <!--              :key="item"-->
            <img
              class="deviceoperate-img"
              :src="origin + '/api/resource/' + row.piclist.split(';')[0]"
              width="60px"
            >
            <!-- :src="'http://116.62.196.62:8888/api/resource/' + item" -->
          </span>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" min-width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所在目录" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.firstCategory }} / {{ row.secondaryCategory }} /
            {{ row.threeCategory }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发货地址" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发货方式" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.deliveryMethod }}</span>
        </template>
      </el-table-column>
      <el-table-column label="品牌" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.brand }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上下架" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <el-tag :type="row.shelfStatus | stateClassFilter">
            <span>{{ row.shelfStatus | stateFilter }}</span>
          </el-tag>
          <!--          <span>{{-->
          <!--            row.shelfStatus === 0 ? "下架" : row.shelfStatus === 1 ? "上架" : ""-->
          <!--          }}</span>-->
        </template>
      </el-table-column>
      <!-- <el-table-column label="deleted" class-name="status-col" width="100" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.deleted.toString()">
            <span v-if="row.deleted===0">未删除</span>
            <span v-else-if="row.deleted===1">已删除</span>
          </el-tag>
        </template>
      </el-table-column> -->
      <el-table-column align="center" width="240" class-name="operation">
        <template slot="header"> 操作 </template>
        <template slot-scope="{ row }">
          <el-link type="primary" @click="handDetail(row.id)">详情</el-link>
          <el-link type="warning" @click="handUpdate(row.id)">修改</el-link>
          <el-link
            type="danger"
            @click="handleDelete(row.id, row.name)"
          >删除</el-link>
          <el-link type="danger" @click="handleCopy(row)">拷贝</el-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.pageIndex"
      :limit.sync="listQuery.pageSize"
      @pagination="handlePageChange"
    />

    <device-dialog ref="detailPage" is-detail />
    <device-dialog ref="addPage" is-add @change="handlePageChange(deviceId)" />
    <device-dialog
      ref="updatePage"
      is-update
      @change="handlePageChange(deviceId)"
    />
    <device-dialog ref="copyPage" is-copy @copy="handleCopyedit" />
  </div>
</template>

<script>
import waves from "@/directive/waves";
import Pagination from "@/components/Pagination";

import DeviceDialog from "./components/dialog";

import deviceApi from "@/api/device/device-list-api";
import productApi from "@/api/product/product-api";
const stateEnum = { 0: "已下架", 1: "已上架" };
const stateClassEnum = { 0: "danger", 1: "success" };

export default {
  name: "DeviceList",
  components: { DeviceDialog, Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      if (status === 0) {
        return "info";
      } else if (status === 1) {
        return "success";
      } else if (status === 2) {
        return "warning";
      }
    },
    stateClassFilter(state) {
      return stateClassEnum[state];
    },
    stateFilter(state) {
      return stateEnum[state];
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      deviceList: null, // 设备列表
      total: 0,
      listLoading: false,
      sortColumn: "id",
      sortAsc: false,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        keyword: null,
        name: null,
        code: null,
        state: null,
        pageSorts: []
      },
      stateOptions: [
        { label: "已删除", value: 1 },
        { label: "未删除", value: 0 }
      ],
      tableColumnChecked: null,
      searchColumn: "keyword",
      searchValue: null,
      searchOptions: [
        { label: "全部", value: "keyword" },
        { label: "角色名称", value: "name" },
        { label: "角色编码", value: "code" }
      ],
      createTimeRange: null,
      showReviewer: true,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create"
      },
      dialogPvVisible: false,
      pvData: [],
      downloadLoading: false,
      deviceId: "", // 设备id
      copyObj: {}, // 拷贝对象
      origin:
        window.location.protocol + "//" + window.location.hostname + ":8888",
      // 获取所有商品
      isGetAllList: false,

      // device tag
      tags: [],
      selectTag: {}
    };
  },
  created() {
    this.setDefaultSort();
    // this.getPageListBydid();
    this.getDeviceList();
    this.isGetAllList = JSON.parse(
      sessionStorage.userInfo
    ).loginSysUserVo.permissionCodes.includes("admin:commodity:page");
  },
  methods: {
    getList() {
      this.deviceId = "";
      this.listLoading = true;
      productApi.getPageList(this.listQuery).then((response) => {
        this.list = response.data.records;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    getPageListBydid(deviceId) {
      if (!deviceId) {
        this.$message.warning("请选择设备后在操作");
        return;
      }
      this.listLoading = true;
      productApi.getPageListBydid(this.listQuery, deviceId).then((response) => {
        this.list = response.data.records;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    getDeviceList(str) {
      const listQuery = {
        pageIndex: 1,
        pageSize: 999,
        keyword: str,
        name: str,
        code: null,
        state: null,
        pageSorts: []
      };
      const isAdmin = JSON.parse(
        sessionStorage.userInfo
      ).loginSysUserVo.permissionCodes.includes("admin:device:page");
      deviceApi.getPageList(listQuery, isAdmin).then((response) => {
        this.deviceList = response.data.records;
      });
    },
    handleFilter() {
      this.listQuery.pageIndex = 1;
      this.listQuery.keyword = null;
      this.listQuery.name = null;
      this.listQuery.code = null;
      this.listQuery[this.searchColumn] = this.searchValue;
      this.getPageListBydid(this.deviceId);
    },
    setDefaultSort() {
      // 设置默认排序
      this.listQuery.pageSorts = [
        {
          column: this.sortColumn,
          asc: this.sortAsc
        }
      ];
    },
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "createTime") {
        this.sortColumn = "create_time";
      } else {
        this.sortColumn = prop;
      }
      this.sortAsc = order === "ascending";
      this.listQuery.pageSorts = [
        {
          column: this.sortColumn,
          asc: this.sortAsc
        }
      ];
      this.handleFilter();
    },
    getSortClass: function(key) {
      if (this.sortColumn === key) {
        return this.sortAsc ? "ascending" : "descending";
      } else {
        return "";
      }
    },
    handleAdd() {
      this.dialogStatus = "create";
      this.$nextTick(() => {
        this.$refs.addPage.handle();
      });
    },
    handDetail(id) {
      this.$nextTick(() => {
        this.$refs.detailPage.handle(id);
      });
    },
    handUpdate(id) {
      this.$nextTick(() => {
        this.$refs.updatePage.handle(id);
      });
    },
    handCopy(id) {
      this.$nextTick(() => {
        this.$refs.copyPage.handle(id);
      });
    },
    handleDelete(id, name) {
      this.$confirm("您确定要删除 " + name + " ?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        productApi.delete(id).then((response) => {
          if (response.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.handleFilter();
          }
        });
      });
    },
    // 选择设备
    handleDeviceChange(deviceId) {
      if (deviceId) {
        // get product
        this.deviceId = deviceId;
        this.getPageListBydid(deviceId);
        // tag
        this.deviceList.find((item) => {
          if (item.id === deviceId) {
            const ids = this.tags.map(idItem => idItem.id)
            if (ids.indexOf(deviceId) < 0) {
              this.tags.push({
                name: `${item.username} : ${item.dname}`,
                type: "info",
                id: item.id
              });
            }
          }
        });
      } else {
        // this.getPageListBydid();
        this.list = [];
      }
    },
    // tag click
    handleTagClick(tag, index) {
      this.deviceId = tag.id;
      this.getPageListBydid(tag.id);
      this.selectTag = {
        ...tag,
        index
      }
    },
    // tag close
    handleClose(tag) {
      if (tag.id === this.selectTag.id) {
        this.deviceId = ""
      }
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    // 拷贝
    handleCopy(row) {
      this.copyObj = row;
    },
    handleCancelCopy() {
      this.copyObj = {};
    },
    handleDoCopy(copyObj) {
      productApi.copy(this.deviceId, copyObj).then((res) => {
        this.copyObj = {};
        this.getPageListBydid(this.deviceId);
      });
      // .catch((err) => {
      // });
    },
    handleCopyedit(copyObj) {
      this.handleDoCopy(copyObj);
    },
    // page change
    handlePageChange() {
      this.deviceId ? this.getPageListBydid(this.deviceId) : this.getList();
    }
  }
};
</script>

<style lang="scss">
#device-list {
}

#device-list .el-table th {
  padding: 6px 0px;
}

#device-list .el-table td {
  padding: 8px 0px;
  /*border: 1px solid red;*/
}

#device-list .filter-container {
  /*border: 1px solid red;*/
  /*padding-bottom: 10px;*/
}

#device-list .input-with-select {
  /*border: 1px solid red;*/
  /*vertical-align: top;*/
  width: 505px;
  margin-right: 4px;
}

#device-list .input-with-select .el-select .el-input {
  width: 120px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

#device-list .filter-item {
  margin-right: 4px;
  /*border: 1px solid red;*/
  vertical-align: baseline;
}

#device-list .el-table__body .operation .cell {
  /*border: 1px solid blue;*/
  text-align: center;
}
</style>
