// 异步请求接口集合
import http from 'axios'
import {url} from '@/api/common'

/*******************************************  会员接口  *****************************************/
// 获取token接口
export function getTk() {
    return http.get(`${url.dev}/token`)
}
// 获取用户信息接口
export function login(token) {
    return http.get(`${url.dev}/login`,{token})
}
// 注销
export function logout(token) {
    return http.post(`${url.dev}/logout`,{token})
}
// 查询列表接口
export function getList() {
   return http.get(`${url.dev}/member/list`)
}
// 根据页码条数查询接口
export function getMemberList(page,size) {
   return http.get(`${url.dev}/member/list/${page}/${size}`)
}
// 条件查询
export function getConditionQuery(obj) {
   return http.post(`${url.dev}/member/list`,obj)
}
// 会员新增
export function addMember(obj) {
    return http.post(`${url.dev}/member/add`,obj)
}
// 根据会员id查询当前会员
export function queryMember(id) {
    return http.get(`${url.dev}/member/list/${id}`)
}
// 修改当前会员信息
export function updateMember(id,obj) {
    return http.put(`${url.dev}/member/${id}`,obj)
}
// 删除当前会员信息
export function deleteMember(id) {
    return http.delete(`${url.dev}/member/${id}`)
}

/*******************************************  供应商接口  *****************************************/
// 供应商列表查询
export function getSupplierList() {
    return http.get(`${url.dev}/supplier/list`)
}
// 供应商列表分页查询
export function getSupplierListByPage(page,size) {
    return http.get(`${url.dev}/supplier/list/${page}/${size}`)
}
// 根据供应商id查询
export function getSupplierById(id) {
    return http.get(`${url.dev}/supplier/list/${id}`)
}
// 条件查询
export function getSupplierConditionQuery(obj) {
    return http.post(`${url.dev}/supplier/list`,obj)
}
// 供应商新增
export function addSupplier(obj) {
    return http.post(`${url.dev}/supplier/add`,obj)
}
// 供应商修改
export function updateSupplier(id,obj) {
    return http.put(`${url.dev}/supplier/${id}`,obj)
}
// 删除当前会员信息
export function deleteSupplier(id) {
    return http.delete(`${url.dev}/supplier/${id}`)
}
/*******************************************  商品接口  *****************************************/
// 商品列表查询接口
export function getGoodList() {
    return http.get(`${url.dev}/goods/list`)
}
// 商品列表分页查询
export function getGoodsListByPage(page,size) {
    return http.get(`${url.dev}/goods/list/${page}/${size}`)
}
// 根据商品id查询
export function getGoodsById(id) {
    return http.get(`${url.dev}/goods/list/${id}`)
}
// 条件查询
export function getGoodsConditionQuery(obj) {
    return http.post(`${url.dev}/goods/list`,obj)
}
// 新增商品信息
export function addGoods(obj) {
    return http.post(`${url.dev}/goods/add`,obj)
}
// 修改商品信息
export function updateGoods(id,obj) {
    return http.put(`${url.dev}/goods/${id}`,obj)
}
// 删除当前商品信息
export function deleteGoods(id) {
    return http.delete(`${url.dev}/goods/${id}`)
}
/*******************************************  员工接口  *****************************************/
// 员工列表查询接口
export function getStaffList() {
    return http.get(`${url.dev}/staff/list`)
}
// 员工列表分页查询
export function getStaffListByPage(page,size) {
    return http.get(`${url.dev}/staff/list/${page}/${size}`)
}
// 根据员工id查询
export function getStaffById(id) {
    return http.get(`${url.dev}/staff/list/${id}`)
}
// 条件查询
export function getStaffConditionQuery(obj) {
    return http.post(`${url.dev}/staff/list`,obj)
}
// 新增员工信息
export function addStaff(obj) {
    return http.post(`${url.dev}/staff/add`,obj)
}
// 修改员工信息
export function updateStaff(id,obj) {
    return http.put(`${url.dev}/staff/${id}`,obj)
}
// 删除当前员工信息
export function deleteStaff(id) {
    return http.delete(`${url.dev}/staff/${id}`)
}
/*******************************************  密码的校验以及修改接口  *****************************************/
// 密码的校验
export function pwdVerify(pwd) {
    return http.post(`${url.dev}/user/pwd`,{password: pwd})
}
export function pwdAlter(obj) {
    return http.put(`${url.dev}/user/pwd`,obj)
}
