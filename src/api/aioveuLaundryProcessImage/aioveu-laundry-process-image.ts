import request from "@/utils/request";

const AIOVEULAUNDRYPROCESSIMAGE_BASE_URL = "/api/v1/aioveu-laundry-process-image";

const AioveuLaundryProcessImageAPI = {
    /** 获取洗衣流程图片记录分页数据 */
    getPage(queryParams?: AioveuLaundryProcessImagePageQuery) {
        return request<any, PageResult<AioveuLaundryProcessImagePageVO[]>>({
            url: `${AIOVEULAUNDRYPROCESSIMAGE_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取洗衣流程图片记录表单数据
     *
     * @param id 洗衣流程图片记录ID
     * @returns 洗衣流程图片记录表单数据
     */
    getFormData(id: number) {
        return request<any, AioveuLaundryProcessImageForm>({
            url: `${AIOVEULAUNDRYPROCESSIMAGE_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加洗衣流程图片记录
     *
     *  @param data 洗衣流程图片记录表单数据
     */
    add(data: AioveuLaundryProcessImageForm) {
        return request({
            url: `${AIOVEULAUNDRYPROCESSIMAGE_BASE_URL}`,
            method: "post",
            data: data,
        });
    },

    /**
     * 更新洗衣流程图片记录
     *
     * @param id 洗衣流程图片记录ID
     * @param data 洗衣流程图片记录表单数据
     */
     update(id: number, data: AioveuLaundryProcessImageForm) {
        return request({
            url: `${AIOVEULAUNDRYPROCESSIMAGE_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    },

    /**
     * 批量删除洗衣流程图片记录，多个以英文逗号(,)分割
     *
     * @param ids 洗衣流程图片记录ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${AIOVEULAUNDRYPROCESSIMAGE_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default AioveuLaundryProcessImageAPI;

/** 洗衣流程图片记录分页查询参数 */
export interface AioveuLaundryProcessImagePageQuery extends PageQuery {
    /** 图片记录ID */
    id?: number;
    /** 订单ID */
    orderId?: number;
    /** 衣物明细ID */
    itemId?: number;
    /** 图片类型 1-收衣时-receive,2-洗涤中-washing,3-烘干中-drying,4-熨烫中-ironing,5-完成时-finish,6-问题衣物-problem,7-质检时-quality_check,8-交付时-delivery */
    imageType?: number;
    /** 上传人ID */
    uploadUser?: number;
}

/** 洗衣流程图片记录表单对象 */
export interface AioveuLaundryProcessImageForm {
    /** 订单ID */
    orderId?:  number;
    /** 衣物明细ID */
    itemId?:  number;
    /** 图片类型 1-收衣时-receive,2-洗涤中-washing,3-烘干中-drying,4-熨烫中-ironing,5-完成时-finish,6-问题衣物-problem,7-质检时-quality_check,8-交付时-delivery */
    imageType?:  number;
    /** 图片路径 */
    imageUrl?:  string;
    /** 上传人ID */
    uploadUser?:  number;
    /** 图片描述 */
    description?:  string;
}

/** 洗衣流程图片记录分页对象 */
export interface AioveuLaundryProcessImagePageVO {
    /** 图片记录ID */
    id?: number;
    /** 订单ID */
    orderId?: number;
    /** 衣物明细ID */
    itemId?: number;
    /** 图片类型 1-收衣时-receive,2-洗涤中-washing,3-烘干中-drying,4-熨烫中-ironing,5-完成时-finish,6-问题衣物-problem,7-质检时-quality_check,8-交付时-delivery */
    imageType?: number;
    /** 图片路径 */
    imageUrl?: string;
    /** 上传人ID */
    uploadUser?: number;
    /** 图片描述 */
    description?: string;
    /** 创建时间 */
    createTime?: Date;
    /** 更新时间 */
    updateTime?: Date;
}
