(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7681730c"],{"0283":function(e,t,a){},"097b":function(e,t,a){"use strict";a("0f18")},"0f18":function(e,t,a){},"333d":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[a("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,"page-sizes":e.pageSizes,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},l=[];a("c5f6");Math.easeInOutQuad=function(e,t,a,n){return e/=n/2,e<1?a/2*e*e+t:(e--,-a/2*(e*(e-2)-1)+t)};var r=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function s(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function i(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function o(e,t,a){var n=i(),l=e-n,o=20,c=0;t="undefined"===typeof t?500:t;var d=function e(){c+=o;var i=Math.easeInOutQuad(c,n,l,t);s(i),c<t?r(e):a&&"function"===typeof a&&a()};d()}var c={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,50,100]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&o(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&o(0,800)}}},d=c,u=(a("097b"),a("2877")),p=Object(u["a"])(d,n,l,!1,null,"8b5f5010",null);t["a"]=p.exports},"3de8":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"tree-select-item"},[a("el-select",{directives:[{name:"popover",rawName:"v-popover:tree-select-popover",arg:"tree-select-popover"}],staticClass:"tree-select",staticStyle:{width:"100%"},attrs:{placeholder:e.placeholder,disabled:e.disabled,clearable:e.clearable,"popper-class":"select-option","popper-append-to-body":!1},on:{clear:e.handleClear},model:{value:e.selectNodeLabel,callback:function(t){e.selectNodeLabel=t},expression:"selectNodeLabel"}}),e._v(" "),a("el-popover",{ref:"tree-select-popover",attrs:{disabled:e.disabled,placement:"bottom-start","popper-class":"tree-select-popper","visible-arrow":!1,trigger:"click"},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[e.showFilterInput?a("el-input",{staticClass:"tree-select-filter-input",attrs:{placeholder:"输入关键字进行过滤",clearable:""},model:{value:e.filterText,callback:function(t){e.filterText=t},expression:"filterText"}}):e._e(),e._v(" "),a("el-tree",{ref:"tree",attrs:{data:e.data,props:e.props,"node-key":e.nodeKey,"filter-node-method":e.filterNode,"highlight-current":"","default-checked-keys":e.checkedKeys,"expand-on-click-node":!1,"default-expand-all":""},on:{"current-change":e.handleChange},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.node,l=t.data;return a("span",{staticClass:"custom-tree-node"},[a("span",{staticStyle:{border:"0px solid red"}},[a("i",{class:l.icon}),e._v("\n        "+e._s(n.label)+"\n      ")])])}}])})],1)],1)},l=[],r=(a("7f7f"),a("c5f6"),{name:"TreeSelect",props:{data:{type:Array,default:null},props:{type:Object,default:function(){return{label:"name",children:"children"}}},showFilterInput:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1},selectKey:{type:Number,default:null},selectLabel:{type:String,default:null},placeholder:{type:String,default:"请选择"},clearable:{type:Boolean,default:!1}},data:function(){return{nodeKey:"id",valueId:null,filterText:"",checkedKeys:[1],visible:!1,selectNodeKey:null,selectNodeLabel:null,currentNode:null,currentData:null}},created:function(){},mounted:function(){},watch:{filterText:function(e){this.$refs.tree.filter(e)},selectKey:function(){this.selectNodeKey=this.selectKey},selectLabel:function(){this.selectNodeLabel=this.selectLabel},selectNode:function(){this.currentNode=this.selectNode},selectData:function(){this.currentData=this.selectData}},methods:{filterNode:function(e,t){return!e||-1!==t.name.indexOf(e)},handleChange:function(e,t){this.visible=!1,this.selectNodeKey=t.key,this.selectNodeLabel=t.label,this.currentNode=t,this.currentData=t.data,this.updateParentData(e,t)},handleClear:function(){this.visible=!1,this.selectNodeKey=null,this.selectNodeLabel=null,this.currentNode=null,this.currentData=null,this.filterText=null,this.updateParentData(null,null)},updateParentData:function(e,t){this.$emit("update:selectKey",this.selectNodeKey),this.$emit("update:selectLabel",this.selectNodeLabel),this.$emit("update:selectNode",this.currentNode),this.$emit("update:selectData",this.currentData),this.$emit("change",e,t)},setValue:function(e,t){this.selectNodeKey=e,this.selectNodeLabel=t},getNode:function(e){if(e){this.$refs.tree.setCurrentKey(e);var t=this.$refs.tree.getNode(e);this.selectNodeLabel=t.label,this.currentNode=t,this.currentData=t.data}}}}),s=r,i=(a("83ee"),a("2877")),o=Object(i["a"])(s,n,l,!1,null,null,null);t["a"]=o.exports},"41cd":function(e,t,a){},"528b":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container",attrs:{id:"sys-user-list"}},[a("div",{staticClass:"filter-container"},[a("tree-select",{attrs:{data:e.treeSelectData,placeholder:"部门名称",clearable:"","select-key":e.listQuery.departmentId},on:{"update:selectKey":function(t){return e.$set(e.listQuery,"departmentId",t)},"update:select-key":function(t){return e.$set(e.listQuery,"departmentId",t)},change:e.handleFilter}}),e._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"120px"},attrs:{placeholder:"角色名称",clearable:""},on:{change:e.handleFilter},model:{value:e.listQuery.roleId,callback:function(t){e.$set(e.listQuery,"roleId",t)},expression:"listQuery.roleId"}},e._l(e.roleOptions,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1),e._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"120px"},attrs:{placeholder:"状态",clearable:""},on:{change:e.handleFilter},model:{value:e.listQuery.state,callback:function(t){e.$set(e.listQuery,"state",t)},expression:"listQuery.state"}},e._l(e.stateOptions,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1),e._v(" "),a("date-picker-range",{attrs:{"date-range":e.createTimeRange,"start-date":e.listQuery.createTimeStart,"end-date":e.listQuery.createTimeEnd},on:{"update:dateRange":function(t){e.createTimeRange=t},"update:date-range":function(t){e.createTimeRange=t},"update:startDate":function(t){return e.$set(e.listQuery,"createTimeStart",t)},"update:start-date":function(t){return e.$set(e.listQuery,"createTimeStart",t)},"update:endDate":function(t){return e.$set(e.listQuery,"createTimeEnd",t)},"update:end-date":function(t){return e.$set(e.listQuery,"createTimeEnd",t)},change:e.handleCreateTimeFilter}}),e._v(" "),a("br"),e._v(" "),a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入关键字进行查询",clearable:""},on:{clear:e.handleClear},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter()}},model:{value:e.searchValue,callback:function(t){e.searchValue=t},expression:"searchValue"}},[a("el-select",{attrs:{slot:"prepend",placeholder:"请选择"},slot:"prepend",model:{value:e.searchColumn,callback:function(t){e.searchColumn=t},expression:"searchColumn"}},e._l(e.searchOptions,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticStyle:{width:"115px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v("搜索")]),e._v(" "),a("el-button",{staticStyle:{"margin-left":"10px",width:"92px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:e.handleAdd}},[e._v("添加")])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""},on:{"row-click":e.handleRowClick,"sort-change":e.sortChange}},[a("el-table-column",{attrs:{label:"编号",prop:"id",sortable:"custom",align:"center",width:"80px","class-name":e.getSortClass("id")},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.id))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"头像",width:"80px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(e){var t=e.row;return[a("img",{staticStyle:{width:"34px","max-height":"34px","vertical-align":"middle"},attrs:{src:t.head,alt:""}})]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"账号","min-width":"100px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.username))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"用户名称","min-width":"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.nickname))])]}}])}),e._v(" "),e.showReviewer?a("el-table-column",{attrs:{label:"手机号码","min-width":"115px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.phone))])]}}],null,!1,211110840)}):e._e(),e._v(" "),a("el-table-column",{attrs:{label:"部门名称","min-width":"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.departmentName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"角色名称",width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-tag",[e._v(e._s(n.roleName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"创建时间",prop:"createTime",sortable:"custom","min-width":"160px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.createTime))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"状态","class-name":"status-col",width:"100",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-tag",{attrs:{type:e._f("stateClassFilter")(n.state)}},[a("span",[e._v(e._s(e._f("stateFilter")(n.state)))])])]}}])}),e._v(" "),e.isPick?e._e():a("el-table-column",{attrs:{align:"center",width:"240","class-name":"operation"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-link",{attrs:{type:"primary"},on:{click:function(t){return e.handDetail(n.id)}}},[e._v("详情")]),e._v(" "),a("el-link",{attrs:{type:"primary"},on:{click:function(t){return e.handleHeadUpload(n.id,n.head)}}},[e._v("上传头像")]),e._v(" "),a("el-link",{attrs:{type:"primary"},on:{click:function(t){return e.handleRestPassword(n.id)}}},[e._v("重置密码")]),e._v(" "),a("el-link",{attrs:{type:"warning"},on:{click:function(t){return e.handUpdate(n.id)}}},[e._v("修改")]),e._v(" "),a("el-link",{attrs:{type:"danger"},on:{click:function(t){return e.handleDelete(n.id,n.username)}}},[e._v("删除")])]}}],null,!1,2797632202)},[a("template",{slot:"header"},[e._v("\n        操作\n        "),a("el-dropdown",{attrs:{trigger:"click"}},[a("el-link",{staticStyle:{"vertical-align":"baseline"},attrs:{type:"primary"}},[a("i",{staticClass:"el-icon-s-operation"})]),e._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",[a("el-checkbox",{model:{value:e.tableColumnChecked,callback:function(t){e.tableColumnChecked=t},expression:"tableColumnChecked"}},[e._v("账号")])],1),e._v(" "),a("el-dropdown-item",[a("el-checkbox",{model:{value:e.tableColumnChecked,callback:function(t){e.tableColumnChecked=t},expression:"tableColumnChecked"}},[e._v("用户名称")])],1),e._v(" "),a("el-dropdown-item",[a("el-checkbox",{model:{value:e.tableColumnChecked,callback:function(t){e.tableColumnChecked=t},expression:"tableColumnChecked"}},[e._v("电话号码")])],1),e._v(" "),a("el-dropdown-item",[a("el-checkbox",{model:{value:e.tableColumnChecked,callback:function(t){e.tableColumnChecked=t},expression:"tableColumnChecked"}},[e._v("性别")])],1)],1)],1),e._v(" "),a("el-link",{staticStyle:{"vertical-align":"baseline",margin:"0px 3px"},attrs:{type:"primary"}},[a("i",{staticClass:"el-icon-document"})]),e._v(" "),a("el-link",{staticStyle:{"vertical-align":"baseline"},attrs:{type:"primary"}},[a("i",{staticClass:"el-icon-printer"})])],1)],2)],1),e._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.pageIndex,limit:e.listQuery.pageSize},on:{"update:page":function(t){return e.$set(e.listQuery,"pageIndex",t)},"update:limit":function(t){return e.$set(e.listQuery,"pageSize",t)},pagination:e.getList}}),e._v(" "),a("sys-user",{ref:"detailPage",attrs:{"is-detail":""}}),e._v(" "),a("sys-user",{ref:"addPage",attrs:{"is-add":""},on:{change:e.handleFilter}}),e._v(" "),a("sys-user",{ref:"updatePage",attrs:{"is-update":""},on:{change:e.getList}}),e._v(" "),a("sys-user-head",{ref:"headUploadPage",on:{change:e.getList}}),e._v(" "),a("sys-user-password",{ref:"resetPasswordPage"})],1)},l=[],r=a("6724"),s=a("333d"),i=a("3de8"),o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-date-picker",{staticStyle:{"vertical-align":"top"},attrs:{type:e.type,"picker-options":e.pickerOptions,"range-separator":e.rangeSeparator,"start-placeholder":e.startPlaceholder,"end-placeholder":e.endPlaceholder,format:e.format,"value-format":e.format,align:e.align},on:{change:e.handleChange},model:{value:e.pickerRange,callback:function(t){e.pickerRange=t},expression:"pickerRange"}})},c=[],d={name:"DatePickerRange",props:{type:{type:String,default:"daterange"},rangeSeparator:{type:String,default:"至"},startPlaceholder:{type:String,default:"开始日期"},endPlaceholder:{type:String,default:"结束日期"},format:{type:String,default:"yyyy-MM-dd"},align:{type:String,default:"center"},pickerOptions:{type:Object,default:function(){return{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]}}},dateRange:{type:Array,default:function(){return[]}},startDate:{type:Date,default:null},endDate:{type:Date,default:null}},data:function(){return{pickerRange:[],startPicker:null,endPicker:null}},created:function(){},watch:{dateRange:function(){this.pickerRange=this.dateRange},startDate:function(){this.startPicker=this.startDate},endDate:function(){this.endPicker=this.endDate}},methods:{handleChange:function(){this.pickerRange?(this.startPicker=this.pickerRange[0],this.endPicker=this.pickerRange[1]):(this.startPicker=null,this.endPicker=null),this.$emit("update:dateRange",this.pickerRange),this.$emit("update:startDate",this.startPicker),this.$emit("update:endDate",this.endPicker),this.$emit("change")}}},u=d,p=a("2877"),m=Object(p["a"])(u,o,c,!1,null,"6de026c4",null),f=m.exports,h=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogVisible,"custom-class":"page-dialog sys-user-dialog"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{ref:"sysUserForm",staticClass:"page-form",staticStyle:{width:"100%"},attrs:{rules:e.rules,model:e.form,"label-position":"right","label-width":"80px"}},[a("el-form-item",{attrs:{label:"用户账号",prop:"username"}},[a("el-input",{attrs:{placeholder:"请输入用户账号",clearable:"",readonly:!e.isAdd},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"用户名称",prop:"nickname"}},[a("el-input",{attrs:{placeholder:"请输入用户名称",clearable:"",readonly:e.isDetail},model:{value:e.form.nickname,callback:function(t){e.$set(e.form,"nickname",t)},expression:"form.nickname"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"手机号码",prop:"phone"}},[a("el-input",{attrs:{placeholder:"请输入手机号码",clearable:"",readonly:e.isDetail},model:{value:e.form.phone,callback:function(t){e.$set(e.form,"phone",t)},expression:"form.phone"}})],1),e._v(" "),e.isAdd?a("el-form-item",{attrs:{label:"密码",prop:"password"}},[a("el-input",{attrs:{type:"password",placeholder:"请输入密码",clearable:"",autocomplete:"off","show-password":""},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"部门",prop:"departmentId"}},[a("tree-select",{attrs:{data:e.treeSelectData,disabled:e.isDetail,"select-key":e.form.departmentId,"select-label":e.departmentName},on:{"update:selectKey":function(t){return e.$set(e.form,"departmentId",t)},"update:select-key":function(t){return e.$set(e.form,"departmentId",t)},"update:selectLabel":function(t){e.departmentName=t},"update:select-label":function(t){e.departmentName=t}}})],1),e._v(" "),a("el-form-item",{attrs:{label:"角色",prop:"roleId"}},[a("el-select",{staticClass:"filter-item",staticStyle:{width:"100%"},attrs:{filterable:"",placeholder:"请选择",disabled:e.isDetail},model:{value:e.form.roleId,callback:function(t){e.$set(e.form,"roleId",t)},expression:"form.roleId"}},e._l(e.roleOptions,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"状态",prop:"state"}},[a("el-radio-group",{attrs:{disabled:e.isDetail},model:{value:e.form.state,callback:function(t){e.$set(e.form,"state",t)},expression:"form.state"}},[a("el-radio",{attrs:{label:1}},[e._v("启用")]),e._v(" "),a("el-radio",{attrs:{label:0}},[e._v("禁用")]),e._v(" "),a("el-radio",{attrs:{label:2}},[e._v("锁定")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"备注",prop:"remark"}},[a("el-input",{attrs:{autosize:{minRows:2,maxRows:4},type:"textarea",placeholder:"请输入备注",readonly:e.isDetail},model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e.isDetail?[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("关闭")])]:e.isAdd?[a("el-button",{on:{click:function(t){return e.restForm()}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitAddForm()}}},[e._v("保存")])]:e.isUpdate?[a("el-button",{on:{click:function(t){return e.restForm()}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitUpdateForm()}}},[e._v("修改")])]:e._e()],2)],1)},g=[],b=a("b775"),v={getPageList:function(e){return Object(b["a"])({url:"/sysUser/getPageList",method:"post",data:e})},detail:function(e){return Object(b["a"])({url:"/sysUser/info/"+e,method:"get"})},add:function(e){return Object(b["a"])({url:"/sysUser/add",method:"post",data:e})},update:function(e){return Object(b["a"])({url:"/sysUser/update",method:"post",data:e})},delete:function(e){return Object(b["a"])({url:"/sysUser/delete/"+e,method:"post"})},uploadHead:function(e){return Object(b["a"])({url:"/sysUser/uploadHead",method:"post",data:e})},resetPassword:function(e){return Object(b["a"])({url:"/sysUser/resetPassword",method:"post",data:e})}},y=v,k={getList:function(e){return Object(b["a"])({url:"/sysDepartment/getList",method:"post",data:e})},getDepartmentTree:function(e){return Object(b["a"])({url:"/sysDepartment/getDepartmentTree",method:"post",data:e})}},w=k,_=a("7f66"),x={name:"SysUser",components:{TreeSelect:i["a"]},props:{isDetail:{type:Boolean,default:!1},isAdd:{type:Boolean,default:!1},isUpdate:{type:Boolean,default:!1}},data:function(){return{dialogVisible:!1,dialogTitle:null,form:{id:null,username:null,nickname:null,phone:null,gender:null,head:null,remark:null,state:1,departmentId:null,roleId:null,deleted:null},departmentName:null,updateId:null,departmentOptions:null,roleOptions:null,treeSelectData:null,rules:{username:[{required:!0,message:"请输入用户账号",trigger:"blur"},{min:4,max:16,message:"长度在 4 到 16 个字符",trigger:"blur"}],nickname:[{required:!0,message:"请输入用户名称",trigger:"blur"},{min:2,max:10,message:"长度在 2 到 10 个字符",trigger:"blur"}],phone:[{required:!0,message:"请输入手机号码",trigger:"blur"},{min:11,max:11,message:"长度11个字符",trigger:"blur"}],departmentId:[{required:!0,message:"请选择部门",trigger:"change"}],roleId:[{required:!0,message:"请选择角色",trigger:"change"}],state:[{required:!0,message:"请选择状态",trigger:"change"}],remark:[{max:100,message:"长度100个字符",trigger:"blur"}]}}},computed:{},created:function(){},mounted:function(){},methods:{handle:function(e){this.isDetail?(this.rules=null,this.dialogTitle="系统用户详情",this.getUserDetail(e)):this.isAdd?(this.dialogTitle="新增系统用户",this.getDepartmentTree(),this.getRoleList()):this.isUpdate&&(this.dialogTitle="修改系统用户",this.updateId=e,this.getUserDetail(e),this.getDepartmentTree(),this.getRoleList()),this.dialogVisible=!0},getDepartmentTree:function(){var e=this;w.getDepartmentTree().then((function(t){e.treeSelectData=t.data}))},getRoleList:function(){var e=this;_["a"].getList().then((function(t){e.roleOptions=t.data,console.log(e.roleOptions)}))},submitAddForm:function(){var e=this;console.log("form..."),console.log(this.form.departmentId),console.log(this.departmentName),this.$refs.sysUserForm.validate((function(t){if(!t)return console.log("error submit!!"),!1;console.log("submit!"),e.addUser()}))},submitUpdateForm:function(){var e=this;this.$refs.sysUserForm.validate((function(t){if(!t)return console.log("error submit!!"),!1;console.log("submit!"),e.updateUser()}))},getUserDetail:function(e){var t=this;y.detail(e).then((function(e){200===e.code&&(t.form=e.data,t.isDetail&&(t.form.roleId=e.data.roleName),t.departmentName=e.data.departmentName)}))},addUser:function(){var e=this;console.log(this.form);var t={username:this.form.username,nickname:this.form.nickname,phone:this.form.phone,password:this.form.password,remark:this.form.remark,state:this.form.state,departmentId:this.form.departmentId,roleId:this.form.roleId};y.add(t).then((function(t){200===t.code&&(e.restForm(),e.$message({message:"保存系统用户成功",type:"success"}),e.$emit("change"))}))},updateUser:function(){var e=this,t={id:this.updateId,nickname:this.form.nickname,phone:this.form.phone,remark:this.form.remark,state:this.form.state,departmentId:this.form.departmentId,roleId:this.form.roleId};y.update(t).then((function(t){200===t.code&&(e.restForm(),e.$message({message:"修改系统用户成功",type:"success"}),e.$emit("change"))}))},restForm:function(){this.$refs.sysUserForm.resetFields(),this.dialogVisible=!1}}},C=x,S=(a("c02d"),Object(p["a"])(C,h,g,!1,null,"50b6637a",null)),$=S.exports,P=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-dialog",{attrs:{title:"上传头像",visible:e.dialogVisible,width:"500px"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("div",{staticClass:"upload-container"},[a("p",{staticClass:"img-container",attrs:{clearable:""}},[a("img",{staticClass:"head",attrs:{src:e.imageUrl,alt:""}})]),e._v(" "),a("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{name:"img",drag:"",action:"",multiple:!1,"auto-upload":!1,"file-list":e.uploadFileList,"show-file-list":!1,accept:"image/jpeg,image/png,image/jpg","http-request":e.handleUpload,"before-upload":e.handleBeforeUpload,"on-change":e.handleChange,"on-error":e.handleError}},[a("i",{staticClass:"el-icon-upload"}),e._v(" "),a("div",{staticClass:"el-upload__text"},[e._v("将文件拖到此处，或"),a("em",[e._v("点击上传")])]),e._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("只能上传jpg/png文件，且不超过2MB")])])],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.resetForm}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.submitForm}},[e._v("确定")])],1)])],1)},D=[],T={upload:function(e){return Object(b["a"])({url:"/upload",method:"post",data:e,headers:{"Content-Type":"multipart/form-data"}})}},F=T,L={name:"SysUserHead",data:function(){return{dialogVisible:!1,id:null,imageUrl:null,uploadFileList:[]}},created:function(){},watch:{dialogVisible:function(){this.dialogVisible||(this.uploadFileList=[])}},methods:{handle:function(e,t){this.id=e,this.imageUrl=t,console.log(this.id),console.log(this.imageUrl),this.dialogVisible=!0},handleChange:function(e,t){t&&t.length>1&&(t=[e]),this.uploadFileList=t,this.imageUrl=URL.createObjectURL(e.raw)},handleError:function(){this.$message({message:"上传错误",type:"error"})},handleBeforeUpload:function(e){var t=e.size/1024/1024<2;return t||this.$message.error("头像大小不能超过 2MB!"),t},submitForm:function(){var e=this;0===this.uploadFileList.length&&this.$message({message:"请选择文件",type:"error"}),this.$nextTick((function(){e.$refs.upload.submit()}))},resetForm:function(){var e=this;this.dialogVisible=!1,this.uploadFileList=[],this.$nextTick((function(){e.$refs.upload.clearFiles()}))},handleUpload:function(e){var t=this,a=new FormData;a.append("file",e.file),a.append("type","head"),F.upload(a).then((function(e){if(200!==e.code)throw e.message;t.imageUrl=e.data})).then((function(){y.uploadHead({id:t.id,head:t.imageUrl}).then((function(e){e&&200===e.code&&(t.$message({message:"上传头像成功",type:"success"}),t.resetForm(),t.$emit("change"))}))}))}}},N=L,U=(a("a80b"),Object(p["a"])(N,P,D,!1,null,"583d9e68",null)),O=U.exports,R=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:"重置密码",visible:e.dialogVisible,"custom-class":"page-dialog sys-user-password-dialog"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{ref:"sysUserPasswordForm",staticClass:"page-form",staticStyle:{width:"100%"},attrs:{rules:e.rules,model:e.form,"label-position":"right","label-width":"100px"}},[a("el-form-item",{attrs:{label:"新密码",prop:"newPassword"}},[a("el-input",{attrs:{placeholder:"请输入新密码",clearable:"",autocomplete:"off","show-password":""},model:{value:e.form.newPassword,callback:function(t){e.$set(e.form,"newPassword",t)},expression:"form.newPassword"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"确认新密码",prop:"confirmPassword"}},[a("el-input",{attrs:{placeholder:"请输入确认密码",clearable:"",autocomplete:"off","show-password":""},model:{value:e.form.confirmPassword,callback:function(t){e.$set(e.form,"confirmPassword",t)},expression:"form.confirmPassword"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){return e.restForm()}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm()}}},[e._v("修改")])],1)],1)},I=[],j={name:"SysUserPassword",data:function(){var e=this,t=function(e,t,a){var n=/^[0-9a-zA-Z_]{6,16}$/;n.test(t)?a():a(new Error("密码只能输入字母数字下划线"))},a=function(t,a,n){e.form.newPassword!==a?n(new Error("两次输入的密码不一致")):n()};return{dialogVisible:!1,form:{newPassword:null,confirmPassword:null},updateId:null,rules:{newPassword:[{required:!0,message:"请输入新密码",trigger:"blur"},{min:6,max:16,message:"长度在 6 到 16 个字符",trigger:"blur"},{validator:t,trigger:"blur"}],confirmPassword:[{required:!0,message:"请输入确认新密码",trigger:"blur"},{min:6,max:16,message:"长度在 6 到 16 个字符",trigger:"blur"},{validator:t,trigger:"blur"},{validator:a,trigger:"blur"}]}}},computed:{},created:function(){},methods:{handle:function(e){this.updateId=e,this.dialogVisible=!0},submitForm:function(){var e=this;this.$refs.sysUserPasswordForm.validate((function(t){if(!t)return console.log("error submit!!"),!1;console.log("submit!"),e.resetPassword()}))},resetPassword:function(){var e=this,t={userId:this.updateId,newPassword:this.form.newPassword,confirmPassword:this.form.confirmPassword};y.resetPassword(t).then((function(t){200===t.code&&(e.restForm(),e.$message({message:"重置密码成功",type:"success"}))}))},restForm:function(){this.$refs.sysUserPasswordForm.resetFields(),this.dialogVisible=!1}}},Q=j,V=(a("9091"),Object(p["a"])(Q,R,I,!1,null,null,null)),E=V.exports,z={0:"禁用",1:"启用",2:"锁定"},A={0:"info",1:"success",2:"warning"},K=[{label:"启用",value:1},{label:"禁用",value:0},{label:"锁定",value:2}],q=[{label:"全部",value:"keyword"},{label:"账号",value:"username"},{label:"用户名称",value:"nickname"}],B={name:"SysUserList",components:{DatePickerRange:f,TreeSelect:i["a"],SysUserPassword:E,SysUserHead:O,SysUser:$,Pagination:s["a"]},directives:{waves:r["a"]},filters:{stateClassFilter:function(e){return A[e]},stateFilter:function(e){return z[e]}},props:["isPick"],data:function(){return{tableKey:0,list:null,total:0,listLoading:!0,sortColumn:"id",sortAsc:!1,listQuery:{pageIndex:1,pageSize:10,keyword:null,username:null,nickname:null,departmentId:null,roleId:null,state:null,createTimeStart:null,createTimeEnd:null,pageSorts:[]},treeSelectData:null,roleOptions:[],stateOptions:K,tableColumnChecked:null,searchColumn:"keyword",searchValue:null,searchOptions:q,createTimeRange:null,showReviewer:!0,downloadLoading:!1}},created:function(){this.setDefaultSort(),this.getList(),this.getDepartmentTree(),this.getRoleList()},methods:{getList:function(){var e=this;this.listLoading=!0,y.getPageList(this.listQuery).then((function(t){e.list=t.data.records.filter((function(e){if("lsylqd"!==e.username||"lsylqd"!==e.nickname)return e})),e.total=t.data.total,e.listLoading=!1}))},getDepartmentTree:function(){var e=this;w.getDepartmentTree().then((function(t){e.treeSelectData=t.data}))},getRoleList:function(){var e=this;_["a"].getList().then((function(t){e.roleOptions=t.data}))},handleFilter:function(){this.listQuery.pageIndex=1,this.listQuery.keyword=null,this.listQuery.username=null,this.listQuery.nickname=null,this.listQuery[this.searchColumn]=this.searchValue,this.getList()},handleCreateTimeFilter:function(){this.handleFilter()},handleClear:function(){this.handleFilter()},setDefaultSort:function(){this.listQuery.pageSorts=[{column:this.sortColumn,asc:this.sortAsc}]},sortChange:function(e){var t=e.prop,a=e.order;this.sortColumn="createTime"===t?"create_time":t,this.sortAsc="ascending"===a,this.listQuery.pageSorts=[{column:this.sortColumn,asc:this.sortAsc}],this.handleFilter()},getSortClass:function(e){return this.sortColumn===e?this.sortAsc?"ascending":"descending":""},handleAdd:function(){var e=this;this.$nextTick((function(){e.$refs.addPage.handle()}))},handDetail:function(e){var t=this;this.$nextTick((function(){t.$refs.detailPage.handle(e)}))},handUpdate:function(e){var t=this;this.$nextTick((function(){t.$refs.updatePage.handle(e)}))},handleHeadUpload:function(e,t){var a=this;this.$nextTick((function(){a.$refs.headUploadPage.handle(e,t)}))},handleRestPassword:function(e){var t=this;this.$nextTick((function(){t.$refs.resetPasswordPage.handle(e)}))},handleDelete:function(e,t){var a=this;this.$confirm("您确定要删除 "+t+" ?","删除提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){y.delete(e).then((function(e){a.$message({type:"success",message:"删除成功!"}),a.handleFilter()}))}))},handleRowClick:function(e){this.$emit("save",e)}}},H=B,M=(a("f03e"),Object(p["a"])(H,n,l,!1,null,null,null));t["default"]=M.exports},"554e":function(e,t,a){},6724:function(e,t,a){"use strict";a("8d41");var n="@@wavesContext";function l(e,t){function a(a){var n=Object.assign({},t.value),l=Object.assign({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},n),r=l.ele;if(r){r.style.position="relative",r.style.overflow="hidden";var s=r.getBoundingClientRect(),i=r.querySelector(".waves-ripple");switch(i?i.className="waves-ripple":(i=document.createElement("span"),i.className="waves-ripple",i.style.height=i.style.width=Math.max(s.width,s.height)+"px",r.appendChild(i)),l.type){case"center":i.style.top=s.height/2-i.offsetHeight/2+"px",i.style.left=s.width/2-i.offsetWidth/2+"px";break;default:i.style.top=(a.pageY-s.top-i.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",i.style.left=(a.pageX-s.left-i.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return i.style.backgroundColor=l.color,i.className="waves-ripple z-active",!1}}return e[n]?e[n].removeHandle=a:e[n]={removeHandle:a},a}var r={bind:function(e,t){e.addEventListener("click",l(e,t),!1)},update:function(e,t){e.removeEventListener("click",e[n].removeHandle,!1),e.addEventListener("click",l(e,t),!1)},unbind:function(e){e.removeEventListener("click",e[n].removeHandle,!1),e[n]=null,delete e[n]}},s=function(e){e.directive("waves",r)};window.Vue&&(window.waves=r,Vue.use(s)),r.install=s;t["a"]=r},"7f66":function(e,t,a){"use strict";var n=a("b775"),l={getList:function(e){return Object(n["a"])({url:"/sysRole/getList",method:"post",data:e})},getPageList:function(e){return Object(n["a"])({url:"/sysRole/getPageList",method:"post",data:e})},detail:function(e){return Object(n["a"])({url:"/sysRole/info/"+e,method:"get"})},add:function(e){return Object(n["a"])({url:"/sysRole/add",method:"post",data:e})},update:function(e){return Object(n["a"])({url:"/sysRole/update",method:"post",data:e})},delete:function(e){return Object(n["a"])({url:"/sysRole/delete/"+e,method:"post"})},updateSysRolePermission:function(e){return Object(n["a"])({url:"/sysRole/updateSysRolePermission",method:"post",data:e})}};t["a"]=l},"83ee":function(e,t,a){"use strict";a("88dc")},"88dc":function(e,t,a){},"8aaa":function(e,t,a){},"8d41":function(e,t,a){},9091:function(e,t,a){"use strict";a("0283")},a80b:function(e,t,a){"use strict";a("41cd")},c02d:function(e,t,a){"use strict";a("554e")},f03e:function(e,t,a){"use strict";a("8aaa")}}]);