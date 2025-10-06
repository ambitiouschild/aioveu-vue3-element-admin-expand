import request from "@/utils/request";

const AIOVEULAUNDRYCLOTHINGTYPE_BASE_URL = "/api/v1/aioveu-laundry-clothing-type";

const AioveuLaundryClothingTypeAPI = {
    /** 获取衣物类型分页数据 */
    getPage(queryParams?: AioveuLaundryClothingTypePageQuery) {
        return request<any, PageResult<AioveuLaundryClothingTypePageVO[]>>({
            url: `${AIOVEULAUNDRYCLOTHINGTYPE_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取衣物类型表单数据
     *
     * @param id 衣物类型ID
     * @returns 衣物类型表单数据
     */
    getFormData(id: number) {
        return request<any, AioveuLaundryClothingTypeForm>({
            url: `${AIOVEULAUNDRYCLOTHINGTYPE_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加衣物类型
     *
     *  @param data 衣物类型表单数据
     */
    add(data: AioveuLaundryClothingTypeForm) {
        return request({
            url: `${AIOVEULAUNDRYCLOTHINGTYPE_BASE_URL}`,
            method: "post",
            data: data,
        });
    },

    /**
     * 更新衣物类型
     *
     * @param id 衣物类型ID
     * @param data 衣物类型表单数据
     */
     update(id: number, data: AioveuLaundryClothingTypeForm) {
        return request({
            url: `${AIOVEULAUNDRYCLOTHINGTYPE_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    },

    /**
     * 批量删除衣物类型，多个以英文逗号(,)分割
     *
     * @param ids 衣物类型ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${AIOVEULAUNDRYCLOTHINGTYPE_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default AioveuLaundryClothingTypeAPI;

/** 衣物类型分页查询参数 */
export interface AioveuLaundryClothingTypePageQuery extends PageQuery {
    /** 衣物类型ID */
    id?: number;
    /** 类型代码 */
    typeCode?: string;
    /** 类型名称 */
    typeName?: string;
    /** 衣物类别,0-上装-top,1-下装-bottom,2-外套-outerwear,3-内衣-underwear,4-配饰-accessories,5-家居用品-home,6-特殊衣物-special */
    category?: number;
    /** 特殊处理要求 */
    specialRequirements?: string;
    /** 是否精细衣物 */
    isDelicate?: number;
}

/** 衣物类型表单对象 */
export interface AioveuLaundryClothingTypeForm {
    /** 类型代码 */
    typeCode?:  string;
    /** 类型名称 */
    typeName?:  string;
    /** 衣物类别,0-上装-top,1-下装-bottom,2-外套-outerwear,3-内衣-underwear,4-配饰-accessories,5-家居用品-home,6-特殊衣物-special */
    category?:  number;
    /** 基础价格 */
    basePrice?:  number;
    /** 标准处理时间(分钟) */
    processingTime?:  number;
    /** 特殊处理要求 */
    specialRequirements?:  string;
    /** 是否精细衣物 */
    isDelicate?:  number;
    /** 状态(0-停用 1-启用) */
    status?:  number;
}

/** 衣物类型分页对象 */
export interface AioveuLaundryClothingTypePageVO {
    /** 衣物类型ID */
    id?: number;
    /** 类型代码 */
    typeCode?: string;
    /** 类型名称 */
    typeName?: string;
    /** 衣物类别,0-上装-top,1-下装-bottom,2-外套-outerwear,3-内衣-underwear,4-配饰-accessories,5-家居用品-home,6-特殊衣物-special */
    category?: number;
    /** 基础价格 */
    basePrice?: number;
    /** 标准处理时间(分钟) */
    processingTime?: number;
    /** 特殊处理要求 */
    specialRequirements?: string;
    /** 是否精细衣物 */
    isDelicate?: number;
    /** 状态(0-停用 1-启用) */
    status?: number;
    /** 创建时间 */
    createTime?: Date;
    /** 更新时间 */
    updateTime?: Date;
}
