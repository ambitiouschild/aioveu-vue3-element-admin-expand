import request from "@/utils/request";

const AIOVEULAUNDRYGARMENTIDENTITY_BASE_URL = "/api/v1/aioveu-laundry-garment-identity";

const AioveuLaundryGarmentIdentityAPI = {
    /** 获取衣物唯一编码分页数据 */
    getPage(queryParams?: AioveuLaundryGarmentIdentityPageQuery) {
        return request<any, PageResult<AioveuLaundryGarmentIdentityPageVO[]>>({
            url: `${AIOVEULAUNDRYGARMENTIDENTITY_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取衣物唯一编码表单数据
     *
     * @param id 衣物唯一编码ID
     * @returns 衣物唯一编码表单数据
     */
    getFormData(id: number) {
        return request<any, AioveuLaundryGarmentIdentityForm>({
            url: `${AIOVEULAUNDRYGARMENTIDENTITY_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加衣物唯一编码
     *
     *  @param data 衣物唯一编码表单数据
     */
    add(data: AioveuLaundryGarmentIdentityForm) {
        return request({
            url: `${AIOVEULAUNDRYGARMENTIDENTITY_BASE_URL}`,
            method: "post",
            data,
        });
    },

    /**
     * 更新衣物唯一编码
     *
     * @param id 衣物唯一编码ID
     * @param data 衣物唯一编码表单数据
     */
     update(id: number, data: AioveuLaundryGarmentIdentityForm) {
        return request({
            url: `${AIOVEULAUNDRYGARMENTIDENTITY_BASE_URL}/${id}`,
            method: "put",
            data,
        });
    },

    /**
     * 批量删除衣物唯一编码，多个以英文逗号(,)分割
     *
     * @param ids 衣物唯一编码ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${AIOVEULAUNDRYGARMENTIDENTITY_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default AioveuLaundryGarmentIdentityAPI;

/** 衣物唯一编码分页查询参数 */
export interface AioveuLaundryGarmentIdentityPageQuery extends PageQuery {
    /** 衣物唯一编码ID */
    id?: number;
    /** 衣物唯一编码(UUID格式) */
    garmentCode?: string;
    /** 关联订单明细 */
    garmentOrderDetailId?: number;
    /** 编码状态 1-已存在-ACTIVE 2-已收回-RETIRED 3-已丢失-LOST */
    status?: number;
}

/** 衣物唯一编码表单对象 */
export interface AioveuLaundryGarmentIdentityForm {
    /** 衣物唯一编码ID */
    id?:  number;
    /** 衣物唯一编码(UUID格式) */
    garmentCode?:  string;
    /** 关联订单明细 */
    garmentOrderDetailId?:  number;
    /** 二维码存储路径 */
    qrCodePath?:  string;
    /** 编码状态 1-已存在-ACTIVE 2-已收回-RETIRED 3-已丢失-LOST */
    status?:  number;
    /** 创建时间 */
    createTime?:  Date;
    /** 更新时间 */
    updateTime?:  Date;
}

/** 衣物唯一编码分页对象 */
export interface AioveuLaundryGarmentIdentityPageVO {
  /** 衣物唯一编码ID */
  id?: number;
    /** 衣物唯一编码(UUID格式) */
    garmentCode?: string;
    /** 关联订单明细 */
    garmentOrderDetailId?: number;
    /** 二维码存储路径 */
    qrCodePath?: string;
    /** 编码状态 1-已存在-ACTIVE 2-已收回-RETIRED 3-已丢失-LOST */
    status?: number;
    /** 创建时间 */
    createTime?: Date;
    /** 更新时间 */
    updateTime?: Date;
}
