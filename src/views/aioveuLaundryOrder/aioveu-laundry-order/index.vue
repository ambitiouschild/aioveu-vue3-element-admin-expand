<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
<!--                <el-form-item label="订单ID" prop="id">-->
<!--                      <el-input-->
<!--                          v-model="queryParams.id"-->
<!--                          placeholder="订单ID"-->
<!--                          clearable-->
<!--                          @keyup.enter="handleQuery()"-->
<!--                      />-->
<!--                </el-form-item>-->
                <el-form-item label="订单号" prop="orderNo">
                      <el-input
                          v-model="queryParams.orderNo"
                          placeholder="订单号"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
<!--                <el-form-item label="会员ID" prop="memberId">-->
<!--                      <el-input-->
<!--                          v-model="queryParams.memberId"-->
<!--                          placeholder="会员ID"-->
<!--                          clearable-->
<!--                          @keyup.enter="handleQuery()"-->
<!--                      />-->
<!--                </el-form-item>-->

                    <el-form-item label="会员卡号" prop="memberId">
                      <el-select
                        v-model="queryParams.memberId"
                        placeholder="请选择会员卡号"
                        clearable
                        filterable
                        @keyup.enter="handleQuery()"
                      >
                        <el-option
                          v-for="memberOption in aioveuMemberOption"
                          :key="memberOption.memberId"
                          :label="memberOption.memberNo"
                          :value="memberOption.memberId"
                        />
                      </el-select>
                    </el-form-item>

                <el-form-item label="非会员客户姓名" prop="customerName">
                      <el-input
                          v-model="queryParams.customerName"
                          placeholder="非会员客户姓名"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
<!--                <el-form-item label="订单状态" prop="status">-->
<!--                      <el-input-->
<!--                          v-model="queryParams.status"-->
<!--                          placeholder="订单状态"-->
<!--                          clearable-->
<!--                          @keyup.enter="handleQuery()"-->
<!--                      />-->
<!--                </el-form-item>-->

                    <el-form-item label="订单状态" prop="status">
                      <el-select
                        v-model="queryParams.status"
                        placeholder="订单状态"
                        clearable
                        filterable
                        @keyup.enter="handleQuery()"
                      >
                        <el-option
                          v-for="item in laundry_order_status_Options"
                          :key="Number(item.value)"
                          :label="item.label"
                          :value="Number(item.value)"
                        />
                      </el-select>
                    </el-form-item>

<!--                <el-form-item label="支付状态" prop="paymentStatus">-->
<!--                      <el-input-->
<!--                          v-model="queryParams.paymentStatus"-->
<!--                          placeholder="支付状态"-->
<!--                          clearable-->
<!--                          @keyup.enter="handleQuery()"-->
<!--                      />-->
<!--                </el-form-item>-->

                    <el-form-item label="支付状态" prop="paymentStatus">
                      <el-select
                        v-model="queryParams.paymentStatus"
                        placeholder="支付状态"
                        clearable
                        filterable
                        @keyup.enter="handleQuery()"
                      >
                        <el-option
                          v-for="item in laundry_order_payment_status_Options"
                          :key="Number(item.value)"
                          :label="item.label"
                          :value="Number(item.value)"
                        />
                      </el-select>
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
            v-hasPerm="['aioveuLaundryOrder:aioveu-laundry-order:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuLaundryOrder:aioveu-laundry-order:delete']"
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
<!--                        label="订单ID"-->
<!--                        prop="id"-->
<!--                        min-width="150"-->
<!--                        align="center"-->
<!--                    />-->
                    <el-table-column
                        key="orderNo"
                        label="订单号"
                        prop="orderNo"
                        min-width="150"
                        align="center"
                    />
<!--                    <el-table-column-->
<!--                        key="memberId"-->
<!--                        label="会员ID"-->
<!--                        prop="memberId"-->
<!--                        min-width="150"-->
<!--                        align="center"-->
<!--                    />-->

                    <el-table-column
                      key="memberNo"
                      label="会员卡号"
                      prop="memberNo"
                      min-width="150"
                      align="center"
                    />

                    <el-table-column
                        key="customerName"
                        label="客户姓名"
                        prop="customerName"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="customerPhone"
                        label="客户电话"
                        prop="customerPhone"
                        min-width="150"
                        align="center"
                    />
<!--                    <el-table-column-->
<!--                        key="status"-->
<!--                        label="订单状态"-->
<!--                        prop="status"-->
<!--                        min-width="150"-->
<!--                        align="center"-->
<!--                    />-->

                    <el-table-column
                      label="订单状态"
                      min-width="150"
                      align="center"
                    >
                      <template #default="scope">
                        <DictLabel v-model="scope.row.status" code="laundry_order_status" />
                      </template>
                    </el-table-column>

                    <el-table-column
                        key="totalAmount"
                        label="订单总额"
                        prop="totalAmount"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="discountAmount"
                        label="折扣金额"
                        prop="discountAmount"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="actualAmount"
                        label="实付金额"
                        prop="actualAmount"
                        min-width="150"
                        align="center"
                    />
<!--                    <el-table-column-->
<!--                        key="paymentStatus"-->
<!--                        label="支付状态"-->
<!--                        prop="paymentStatus"-->
<!--                        min-width="150"-->
<!--                        align="center"-->
<!--                    />-->
                    <el-table-column
                      label="支付状态"
                      min-width="150"
                      align="center"
                    >
                      <template #default="scope">
                        <DictLabel v-model="scope.row.paymentStatus" code="laundry_order_payment_status" />
                      </template>
                    </el-table-column>

<!--                    <el-table-column-->
<!--                        key="paymentMethodId"-->
<!--                        label="支付方式ID"-->
<!--                        prop="paymentMethodId"-->
<!--                        min-width="150"-->
<!--                        align="center"-->
<!--                    />-->

                    <el-table-column
                        key="createTime"
                        label="创建时间"
                        prop="createTime"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="receiveTime"
                        label="收衣时间"
                        prop="receiveTime"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="finishTime"
                        label="完成时间"
                        prop="finishTime"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="deliveryTime"
                        label="交付时间"
                        prop="deliveryTime"
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
                    <el-table-column
                        key="remark"
                        label="备注"
                        prop="remark"
                        min-width="150"
                        align="center"
                    />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
                v-hasPerm="['aioveuLaundryOrder:aioveu-laundry-order:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuLaundryOrder:aioveu-laundry-order:delete']"
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

    <!-- 洗衣订单表单弹窗 -->
    <el-dialog
        v-model="dialog.visible"
        :title="dialog.title"
        width="500px"
        @close="handleCloseDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
<!--                <el-form-item label="订单号" prop="orderNo">-->
<!--                      <el-input-->
<!--                          v-model="formData.orderNo"-->
<!--                          placeholder="订单号"-->
<!--                      />-->
<!--                </el-form-item>-->

<!--                <el-form-item label="会员ID" prop="memberId">-->
<!--                      <el-input-->
<!--                          v-model="formData.memberId"-->
<!--                          placeholder="会员ID"-->
<!--                      />-->
<!--                </el-form-item>-->
        <template v-if="dialog.type === 'edit'">

                    <el-form-item label="订单号" prop="orderNo">
                          <el-input
                              v-model="formData.orderNo"
                              placeholder="订单号"
                              disabled
                          >
                            <template #prefix>
                              <el-icon><lock /></el-icon>
                            </template>
                          </el-input>
                    </el-form-item>

                    <el-form-item label="会员卡号" prop="memberId">
                      <el-select
                        v-model="formData.memberId"
                        placeholder="非会员"
                        clearable
                        filterable
                        disabled
                      >
                        <template #prefix>
                          <el-icon><lock /></el-icon>
                        </template>
                        <el-option
                          v-for="item in aioveuMemberOption"
                          :key="item .memberId"
                          :label="item .memberNo"
                          :value="item .memberId"
                        />
                      </el-select>
                    </el-form-item>
        </template>
        <!-- 新增操作字段 -->
        <template v-else>
          <el-form-item label="会员卡号" prop="memberId">
            <el-select
              v-model="formData.memberId"
              placeholder="请选择会员卡号"
              clearable
              filterable
            >
              <el-option
                v-for="item in aioveuMemberOption"
                :key="item .memberId"
                :label="item .memberNo"
                :value="item .memberId"
              />
            </el-select>
          </el-form-item>

        </template>

                    <el-form-item label="客户姓名" prop="customerName">
                      <el-input
                        v-model="formData.customerName"
                        placeholder="客户姓名"
                      />
                    </el-form-item>

                    <el-form-item label="客户电话" prop="customerPhone">
                      <el-input
                        v-model="formData.customerPhone"
                        placeholder="客户电话"
                      />
                    </el-form-item>
<!--                <el-form-item label="订单状态" prop="status">-->
<!--                      <el-input-->
<!--                          v-model="formData.status"-->
<!--                          placeholder="订单状态"-->
<!--                      />-->
<!--                </el-form-item>-->

                    <el-form-item label="订单状态" prop="status">
                      <el-select
                        v-model="formData.status"
                        placeholder="订单状态"
                        clearable
                      >
                        <el-option
                          v-for="item in laundry_order_status_Options"
                          :key="Number(item.value)"
                          :label="item.label"
                          :value="Number(item.value)"
                        />
                      </el-select>
                    </el-form-item>


                <el-form-item label="订单总额" prop="totalAmount">
                      <el-input
                          v-model="formData.totalAmount"
                          placeholder="订单总额"
                      />
                </el-form-item>

                <el-form-item label="折扣金额" prop="discountAmount">
                      <el-input
                          v-model="formData.discountAmount"
                          placeholder="折扣金额"
                      />
                </el-form-item>

                <el-form-item label="实付金额" prop="actualAmount">
                      <el-input
                          v-model="formData.actualAmount"
                          placeholder="实付金额"
                      />
                </el-form-item>

<!--                <el-form-item label="支付状态">-->
<!--                      <el-input-->
<!--                          v-model="formData.paymentStatus"-->
<!--                          placeholder="支付状态"-->
<!--                      />-->
<!--                </el-form-item>-->

                <el-form-item label="支付状态" prop="paymentStatus">
                  <el-select
                    v-model="formData.paymentStatus"
                    placeholder="支付状态"
                    clearable
                  >
                    <el-option
                      v-for="item in laundry_order_payment_status_Options"
                      :key="Number(item.value)"
                      :label="item.label"
                      :value="Number(item.value)"
                    />
                  </el-select>
                </el-form-item>

<!--                <el-form-item label="支付方式ID" prop="paymentMethodId">-->
<!--                      <el-input-->
<!--                          v-model="formData.paymentMethodId"-->
<!--                          placeholder="支付方式ID"-->
<!--                      />-->
<!--                </el-form-item>-->

                <el-form-item label="收衣时间" prop="receiveTime">
                      <el-date-picker
                          v-model="formData.receiveTime"
                          type="datetime"
                          placeholder="收衣时间"
                          value-format="YYYY-MM-DD HH:mm:ss"
                      />
                </el-form-item>

                <el-form-item label="完成时间" prop="finishTime">
                      <el-date-picker
                          v-model="formData.finishTime"
                          type="datetime"
                          placeholder="完成时间"
                          value-format="YYYY-MM-DD HH:mm:ss"
                      />
                </el-form-item>

                <el-form-item label="交付时间" prop="deliveryTime">
                      <el-date-picker
                          v-model="formData.deliveryTime"
                          type="datetime"
                          placeholder="交付时间"
                          value-format="YYYY-MM-DD HH:mm:ss"
                      />
                </el-form-item>

                <el-form-item label="备注" prop="remark">
                      <el-input
                          v-model="formData.remark"
                          placeholder="备注"
                          type="textarea"
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
    name: "AioveuLaundryOrder",
    inheritAttrs: false,
  });

  import AioveuLaundryOrderAPI, { AioveuLaundryOrderPageVO, AioveuLaundryOrderForm, AioveuLaundryOrderPageQuery } from "@/api/aioveuLaundryOrder/aioveu-laundry-order";
  import AioveuMemberAPI, { AioveuMemberOptionVO } from "@/api/aioveuMember/aioveu-member";

  // 导入字典值
  import DictAPI,{ DictItemOption } from '@/api/system/dict.api'
  // 新增：选项
  const aioveuMemberOption = ref<AioveuMemberOptionVO[]>([]);
  // 状态选项
  const laundry_order_status_Options = ref<DictItemOption[]>([])

  const laundry_order_payment_status_Options = ref<DictItemOption[]>([])


  // 状态字典
  function load_laundry_order_status_Options() {
    DictAPI.getDictItems('laundry_order_status').then(response => {
      laundry_order_status_Options.value = response
    })
  }

  function load_laundry_order_payment_status_Options() {
    DictAPI.getDictItems('laundry_order_payment_status').then(response => {
      laundry_order_payment_status_Options.value = response
    })
  }



  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<AioveuLaundryOrderPageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 洗衣订单表格数据
  const pageData = ref<AioveuLaundryOrderPageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    type: " ",// 'recharge', 'add', 'edit'
    visible: false,
  });

  // 洗衣订单表单数据
  const formData = reactive<AioveuLaundryOrderForm>({});

  // 洗衣订单表单校验规则
  const rules = reactive({
                      // orderNo: [{ required: true, message: "请输入订单号", trigger: "blur" }],
                      // memberId: [{ required: true, message: "请输入会员ID", trigger: "blur" }],
                      status: [{ required: true, message: "请输入订单状态", trigger: "blur" }],
                      totalAmount: [{ required: true, message: "请输入订单总额", trigger: "blur" }],
                      discountAmount: [{ required: true, message: "请输入折扣金额", trigger: "blur" }],
                      actualAmount: [{ required: true, message: "请输入实付金额", trigger: "blur" }],
                      paymentStatus: [{ required: true, message: "请输入支付状态", trigger: "blur" }],
                      // paymentMethodId: [{ required: true, message: "请输入支付方式ID", trigger: "blur" }],
  });

  /** 查询洗衣订单 */
  function handleQuery() {
    loading.value = true;
          AioveuLaundryOrderAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list;
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置洗衣订单查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: any) {
    removeIds.value = selection.map((item: any) => item.id);
  }

  /** 打开洗衣订单弹窗 */
  function handleOpenDialog(id?: number) {
    // dialog.visible = true;
    if (id) {
      dialog.title = "修改洗衣订单";
      dialog.type = 'edit'; // 标记为编辑操作
            AioveuLaundryOrderAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
              //先准备数据，再显示弹窗
              dialog.visible = true;
      });
    } else {
      dialog.title = "新增洗衣订单";
      dialog.type = 'add'; // 标记为新增操作
      //直接打开弹窗
      dialog.visible = true;
      // 新增操作重置清空表单
      dataFormRef.value.resetFields();
    }
  }

  /** 提交洗衣订单表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = formData.id;
        if (id) {
                AioveuLaundryOrderAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                AioveuLaundryOrderAPI.add(formData)
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

  /** 关闭洗衣订单弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    formData.id = undefined;
  }

  /** 删除洗衣订单 */
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
                AioveuLaundryOrderAPI.deleteByIds(ids)
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
  // 主要修改点：选项加载方法
  function loadAioveuMemberOptionVO() {
    AioveuMemberAPI.getAllMemberNoOptions().then(response => {
      aioveuMemberOption.value = response
    })
  }
  onMounted(() => {
    handleQuery();
    load_laundry_order_status_Options()
    load_laundry_order_payment_status_Options()
    //在 onMounted钩子中调用了 loadAioveuMemberOptionVO()函数,确保函数被正确使用
    loadAioveuMemberOptionVO();
  });
</script>
