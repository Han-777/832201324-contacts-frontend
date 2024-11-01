<template>
  <el-container style="height: 100vh; background-color: #f5f5f7">
    <!-- 左侧侧边栏 -->
    <el-aside
      width="250px"
      style="
        background-color: #ffffff;
        padding: 10px;
        align-items: center;
        border-right: 1px solid #dcdcdc;
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
      "
    >
      <div class="sidebar-title">Navigation</div>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @select="handleSelect"
        style="border-right: none"
      >
        <el-menu-item index="1">
          <router-link to="/" class="menu-link">Home</router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <a
            href="https://github.com/Han-777"
            target="_blank"
            rel="noopener noreferrer"
            class="menu-link"
            >832201324 黄涵</a
          >
        </el-menu-item>
        <el-menu-item index="3">
          <a
            href="https://bbs.csdn.net/topics/619338880"
            target="_blank"
            class="menu-link"
            >Objectives of This Assignment</a
          >
        </el-menu-item>
        <el-menu-item index="4">
          <router-link to="/about" class="menu-link">About</router-link>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 右侧内容区域 -->
    <el-container>
      <el-header
        style="
          background-color: #ffffff;
          padding: 20px 40px;
          box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <div class="header-title">Dashboard</div>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addEntry"
          style="background-color: #16a085; border-color: #007aff; color: white"
          >Add Entry</el-button
        >
      </el-header>

      <el-main style="padding: 20px 40px">
        <!-- dialog 对话框 -->
        <el-dialog
          v-model="dialogVisible"
          title="Tips"
          width="500"
          :before-close="handleClose"
        >
          <span>
            <!-- Form 表单 -->
            <el-form
              :label-position="labelPosition"
              label-width="100px"
              :model="form"
              style="max-width: 460px"
            >
              <el-form-item label="Name">
                <el-input v-model="form.userName"></el-input>
              </el-form-item>
              <el-form-item label="Address">
                <el-input v-model="form.userEmail"></el-input>
              </el-form-item>
              <el-form-item label="Phone">
                <el-input v-model="form.userPhone"></el-input>
              </el-form-item> </el-form
          ></span>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="dialogVisible = false">Cancel</el-button>
              <el-button type="primary" @click="save"> Confirm </el-button>
            </div>
          </template>
        </el-dialog>

        <!-- 表格 -->
        <el-table
          :data="tableData"
          stripe
          style="
            width: 100%;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
          "
        >
          <el-table-column
            prop="userName"
            label="Name"
            width="300"
            align="center"
          />
          <el-table-column
            prop="userEmail"
            label="Email"
            width="250"
            align="center"
          />
          <el-table-column prop="userPhone" label="Phone" align="center" />
          <el-table-column
            fixed="right"
            label="Operations"
            min-width="200"
            align="center"
          >
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click="handleDetail(scope.row)"
                style="color: #007aff"
                >Detail</el-button
              >
              <el-button
                link
                type="primary"
                size="small"
                @click="handleEdit(scope.row)"
                style="color: #007aff"
                >Edit</el-button
              >
              <el-popconfirm
                title="Are you sure to delete this?"
                @confirm="handleDelete(scope.row)"
              >
                <template #reference>
                  <el-button
                    link
                    type="primary"
                    size="small"
                    style="color: #007aff"
                    >Delete</el-button
                  >
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "HomeView",
  data() {
    return {
      form: {},
      dialogVisible: false,
      tableData: [],
    };
  },
  created() {
    this.load();
  },
  methods: {
    addEntry() {
      this.form = {}; // Reset the form for new entry
      this.dialogVisible = true;
    },
    load() {
      const url = "http://localhost:8080/user";
      request
        .get(url)
        .then((res) => {
          console.log("Full Response:", res); // 查看完整响应
          console.log("Response Code Type:", typeof res.code); // 查看 code 的类型
          if (res.code == 200) {
            // 使用非严格相等
            this.tableData = res.data;
            console.log("Table Data:", this.tableData); // 确认数据
          } else {
            this.$message.error(res.message || "Failed to load data");
          }
        })
        .catch((error) => {
          console.error("API request failed:", error);
          this.$message.error("Failed to load data");
        });
    },

    save() {
      // 前端简单校验
      if (!this.form.userName) {
        this.$message.error("用户名不能为空");
        return;
      }
      if (!this.form.userEmail) {
        this.$message.error("邮箱不能为空");
        return;
      }
      if (!this.form.userPhone) {
        this.$message.error("手机号不能为空");
        return;
      }

      request
        .post("http://localhost:8080/user", this.form)
        .then((res) => {
          // 检查响应的 code 是否为 200
          if (res.code === 200) {
            // 显示成功消息
            this.$message({
              message: "Save successfully",
              type: "success",
            });
            // 重新加载数据
            this.load();
            // 关闭对话框
            this.dialogVisible = false;
            // 重置表单
            this.form = {
              userName: "",
              userEmail: "",
              userPhone: "",
            };
          } else {
            // 显示保存失败的错误消息
            this.$message.error(res.data.message || "Save failed");
          }
        })
        .catch((error) => {
          // 捕获请求失败的异常并显示错误消息
          console.error("Request failed:", error);
          this.$message.error("Network error or server error");
        });
    },

    handleDetail(row) {
      // Implement detail view logic if needed
    },

    handleEdit(row) {
      this.form = {
        userId: row.userId,
        userName: row.userName,
        userEmail: row.userEmail,
        userPhone: row.userPhone,
      };
      this.dialogVisible = true;
    },

    handleDelete(row) {
      request
        .delete(`http://localhost:8080/user/${row.userId}`)
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              message: "Delete successfully",
              type: "success",
            });
            this.load(); // 重新加载数据
          } else {
            this.$message.error(res.data.message || "Delete failed");
          }
        })
        .catch((error) => {
          console.error("API request failed:", error);
          this.$message.error("Failed to delete data");
        });
    },

    handleClose() {
      this.dialogVisible = false;
    },

    handleSelect(index) {
      // Handle menu item selection if needed
    },
  },
};
</script>
