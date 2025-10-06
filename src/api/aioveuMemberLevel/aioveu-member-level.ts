import request from "@/utils/request";

const AIOVEUMEMBERLEVEL_BASE_URL = "/api/v1/aioveu-member-level";

const AioveuMemberLevelAPI = {
    /** 获取会员等级分页数据 */
    getPage(queryParams?: AioveuMemberLevelPageQuery) {
        return request<any, PageResult<AioveuMemberLevelPageVO[]>>({
            url: `${AIOVEUMEMBERLEVEL_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取会员等级表单数据
     *
     * @param id 会员等级ID
     * @returns 会员等级表单数据
     */
    getFormData(id: number) {
        return request<any, AioveuMemberLevelForm>({
            url: `${AIOVEUMEMBERLEVEL_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加会员等级
     *
     *  @param data 会员等级表单数据
     */
    add(data: AioveuMemberLevelForm) {
        return request({
            url: `${AIOVEUMEMBERLEVEL_BASE_URL}`,
            method: "post",
            data: data,
        });
    },

    /**
     * 更新会员等级
     *
     * @param id 会员等级ID
     * @param data 会员等级表单数据
     */
     update(id: number, data: AioveuMemberLevelForm) {
        return request({
            url: `${AIOVEUMEMBERLEVEL_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    },

    /**
     * 批量删除会员等级，多个以英文逗号(,)分割
     *
     * @param ids 会员等级ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${AIOVEUMEMBERLEVEL_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default AioveuMemberLevelAPI;

/** 会员等级分页查询参数 */
export interface AioveuMemberLevelPageQuery extends PageQuery {
    /** 会员等级ID */
    id?: number;
    /** 等级名称 */
    levelName?: string;
    /** 状态(0-禁用 1-启用) */
    status?: number;
}

/** 会员等级表单对象 */
export interface AioveuMemberLevelForm {
    /** 会员等级ID */
    id?:  number;
    /** 等级名称 */
    levelName?:  string;
    /** 最低消费额 */
    minAmount?:  number;
    /** 折扣率 */
    discount?:  number;
    /** 权益描述 */
    benefits?:  string;
    /** 状态(0-禁用 1-启用) */
    status?:  number;
}

/** 会员等级分页对象 */
export interface AioveuMemberLevelPageVO {
    /** 会员等级ID */
    id?: number;
    /** 等级名称 */
    levelName?: string;
    /** 最低消费额 */
    minAmount?: number;
    /** 折扣率 */
    discount?: number;
    /** 权益描述 */
    benefits?: string;
    /** 状态(0-禁用 1-启用) */
    status?: number;
    /** 创建时间 */
    createTime?: Date;
    /** 更新时间 */
    updateTime?: Date;
}
