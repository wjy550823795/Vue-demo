<template>
  <div>
    <div>
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="部门id" prop="department_id">
            <el-input v-model="ruleForm.department_id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="部门" prop="department">
            <el-input v-model="ruleForm.department" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="大学">
            <el-input v-model="ruleForm.college" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm(ruleForm,'ruleForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="container">
      <el-button type="success" class="save" @click="editFrom('save')" plain>新增</el-button>
      <el-table :data="tableData" stripe border max-height="400">
        <el-table-column prop="id" label="id" width="150"></el-table-column>
        <el-table-column prop="department_id" label="部门id" width="400"></el-table-column>
        <el-table-column prop="department" label="部门" width="250"></el-table-column>
        <el-table-column prop="college" label="大学" width="250"></el-table-column>
        <el-table-column prop="address" label="地址" width="350"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              @click="editFrom(scope.row)"
              type="primary"
              size="small"
              icon="el-icon-edit"
              circle
              title="编辑"
            ></el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.row)"
              type="danger"
              size="small"
              icon="el-icon-delete"
              circle
              title="删除"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      tableData: [],
      ruleForm: {},
      rules: {
        department_id: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        department: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
    this.websocket();
  },
  methods: {
    websocket() {
      this.websocket = new WebSocket(
        "ws://10.88.54.225:8080/cqc-academy/websocket"
      );
      this.initWebSocket();
    },

    initWebSocket() {
      //连接错误
      this.websocket.onerror = this.setErrorMessage;

      // //连接成功
      this.websocket.onopen = this.setOnopenMessage;

      //收到消息的回调
      this.websocket.onmessage = this.setOnmessageMessage;

      //连接关闭的回调
      this.websocket.onclose = this.setOncloseMessage;

      //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = this.onbeforeunload;
    },

    setErrorMessage() {
      console.log("bababababa");

      // this.data = "WebSocket连接发生错误" + '   状态码：' + this.websocket.readyState;
    },
    setOnopenMessage() {
      let obj = {
        cid: 10,
        user_id :"wangjunyu",
        state: 1
      };
      this.send(obj);
      // this.data = "WebSocket连接成功" + '   状态码：' + this.websocket.readyState;
    },
    setOnmessageMessage(event) {
      // this.data = '服务端返回：' + event.data;
    },
    setOncloseMessage() {
      // this.data = "WebSocket连接关闭" + '   状态码：' + this.websocket.readyState;
    },
    onbeforeunload() {
      this.closeWebSocket();
    },
    //websocket发送消息
    send(message) {
      this.websocket.send(JSON.stringify(message));
      // this.text = ''
    },
    closeWebSocket() {
      let obj = {
        cid: 10,
        user_id :"wangjunyu",
        state: 2
      }
      this.send(obj);
      this.websocket.close();
    },

    async getList() {
      let res = await this.$http.selectCollege({ college_id: 1 });
      this.tableData = res.data;
      console.log(res);
      if (res.status === 200) {
        this.$message({
          message: "恭喜你，加载成功",
          type: "success"
        });
      }
    },
    submitForm(value, formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveOReidt(value);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async saveOReidt(value) {
      let res = null;
      if (value.id == undefined) {
        res = await this.$http.insertCollege(value);
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "添加成功!"
          });
        }
      } else {
        res = await this.$http.updateCollege(value);
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "修改成功!"
          });
        }
      }
      console.log(res);
      if (res.status === 200) {
        this.dialogFormVisible = false;
      }
    },
    editFrom(row) {
      if (row == "save") {
        this.ruleForm = {};
      } else {
        this.ruleForm = row;
      }
      this.dialogFormVisible = true;
    },
    deleteRow(row) {
      console.log(row);
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let res = await this.$http.deleteCollege({ id: row.id });
        if (res.status === 200) {
          this.getList();
          // rows.splice(index, 1);//假删除
        }
      });
    }
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
.container {
  width: 100%;
  /* height: 400px;
  margin: 0 auto;  */
}
.save {
  float: right;
  margin-bottom: 25px;
}
</style>