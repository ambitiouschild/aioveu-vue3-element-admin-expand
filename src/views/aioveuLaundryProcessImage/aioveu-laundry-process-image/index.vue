<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
<!--                <el-form-item label="图片记录ID" prop="id">-->
<!--                      <el-input-->
<!--                          v-model="queryParams.id"-->
<!--                          placeholder="图片记录ID"-->
<!--                          clearable-->
<!--                          @keyup.enter="handleQuery()"-->
<!--                      />-->
<!--                </el-form-item>-->
                <el-form-item label="订单ID" prop="orderId">
                      <el-input
                          v-model="queryParams.orderId"
                          placeholder="订单ID"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="衣物明细ID" prop="itemId">
                      <el-input
                          v-model="queryParams.itemId"
                          placeholder="衣物明细ID"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="图片类型" prop="imageType">
                      <el-input
                          v-model="queryParams.imageType"
                          placeholder="图片类型"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="上传人ID" prop="uploadUser">
                      <el-input
                          v-model="queryParams.uploadUser"
                          placeholder="上传人ID"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">
            <template #icon><Search /></template>
            搜索
          </el-button>
          <el-button @click="handleResetQuery">
            <template #icon><Refresh /></template>
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card shadow="never">
      <div class="mb-10px">
        <el-button
            v-hasPerm="['aioveuLaundryProcessImage:aioveu-laundry-process-image:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuLaundryProcessImage:aioveu-laundry-process-image:delete']"
            type="danger"
            :disabled="removeIds.length === 0"
            @click="handleDelete()"
        >
          <template #icon><Delete /></template>
          删除
        </el-button>
      </div>

      <el-table
          ref="dataTableRef"
          v-loading="loading"
          :data="pageData"
          highlight-current-row
          border
          @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
<!--                    <el-table-column-->
<!--                        key="id"-->
<!--                        label="图片记录ID"-->
<!--                        prop="id"-->
<!--                        min-width="150"-->
<!--                        align="center"-->
<!--                    />-->
                    <el-table-column
                        key="orderId"
                        label="订单ID"
                        prop="orderId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="itemId"
                        label="衣物明细ID"
                        prop="itemId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="imageType"
                        label="图片类型"
                        prop="imageType"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="imageUrl"
                        label="图片路径"
                        prop="imageUrl"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="uploadUser"
                        label="上传人ID"
                        prop="uploadUser"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="description"
                        label="图片描述"
                        prop="description"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="createTime"
                        label="创建时间"
                        prop="createTime"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="updateTime"
                        label="更新时间"
                        prop="updateTime"
                        min-width="150"
                        align="center"
                    />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
                v-hasPerm="['aioveuLaundryProcessImage:aioveu-laundry-process-image:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuLaundryProcessImage:aioveu-laundry-process-image:delete']"
                type="danger"
                size="small"
                link
                @click="handleDelete(scope.row.id)"
            >
              <template #icon><Delete /></template>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
          v-if="total > 0"
          v-model:total="total"
          v-model:page="queryParams.pageNum"
          v-model:limit="queryParams.pageSize"
          @pagination="handleQuery()"
      />
    </el-card>

    <!-- 洗衣流程图片记录表单弹窗 -->
    <el-dialog
        v-model="dialog.visible"
        :title="dialog.title"
        width="500px"
        @close="handleCloseDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
                <el-form-item label="订单ID" prop="orderId">
                      <el-input
                          v-model="formData.orderId"
                          placeholder="订单ID"
                      />
                </el-form-item>

                <el-form-item label="衣物明细ID" prop="itemId">
                      <el-input
                          v-model="formData.itemId"
                          placeholder="衣物明细ID"
                      />
                </el-form-item>

                <el-form-item label="图片类型" prop="imageType">
                      <el-input
                          v-model="formData.imageType"
                          placeholder="图片类型"
                      />
                </el-form-item>

                <el-form-item label="图片路径" prop="imageUrl">
                      <el-input
                          v-model="formData.imageUrl"
                          placeholder="图片路径"
                      />
                </el-form-item>

                <el-form-item label="上传人ID" prop="uploadUser">
                      <el-input
                          v-model="formData.uploadUser"
                          placeholder="上传人ID"
                      />
                </el-form-item>

                <el-form-item label="图片描述" prop="description">
                      <el-input
                          v-model="formData.description"
                          placeholder="图片描述"
                      />
                </el-form-item>

      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit()">确定</el-button>
          <el-button @click="handleCloseDialog()">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  defineOptions({
    name: "AioveuLaundryProcessImage",
    inheritAttrs: false,
  });

  import AioveuLaundryProcessImageAPI, { AioveuLaundryProcessImagePageVO, AioveuLaundryProcessImageForm, AioveuLaundryProcessImagePageQuery } from "@/api/aioveuLaundryProcessImage/aioveu-laundry-process-image";

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<AioveuLaundryProcessImagePageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 洗衣流程图片记录表格数据
  const pageData = ref<AioveuLaundryProcessImagePageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 洗衣流程图片记录表单数据
  const formData = reactive<AioveuLaundryProcessImageForm>({});

  // 洗衣流程图片记录表单校验规则
  const rules = reactive({
                      orderId: [{ required: true, message: "请输入订单ID", trigger: "blur" }],
                      imageType: [{ required: true, message: "请输入图片类型 1-收衣时-receive,2-洗涤中-washing,3-烘干中-drying,4-熨烫中-ironing,5-完成时-finish,6-问题衣物-problem,7-质检时-quality_check,8-交付时-delivery", trigger: "blur" }],
  });

  /** 查询洗衣流程图片记录 */
  function handleQuery() {
    loading.value = true;
          AioveuLaundryProcessImageAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list;
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置洗衣流程图片记录查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: any) {
    removeIds.value = selection.map((item: any) => item.id);
  }

  /** 打开洗衣流程图片记录弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;
    if (id) {
      dialog.title = "修改洗衣流程图片记录";
            AioveuLaundryProcessImageAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增洗衣流程图片记录";
    }
  }

  /** 提交洗衣流程图片记录表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = formData.id;
        if (id) {
                AioveuLaundryProcessImageAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                AioveuLaundryProcessImageAPI.add(formData)
              .then(() => {
                ElMessage.success("新增成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        }
      }
    });
  }

  /** 关闭洗衣流程图片记录弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    formData.id = undefined;
  }

  /** 删除洗衣流程图片记录 */
  function handleDelete(id?: number) {
    const ids = [id || removeIds.value].join(",");
    if (!ids) {
      ElMessage.warning("请勾选删除项");
      return;
    }

    ElMessageBox.confirm("确认删除已选中的数据项?", "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(
        () => {
          loading.value = true;
                AioveuLaundryProcessImageAPI.deleteByIds(ids)
              .then(() => {
                ElMessage.success("删除成功");
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        },
        () => {
          ElMessage.info("已取消删除");
        }
    );
  }

  onMounted(() => {
    handleQuery();
  });
</script>
