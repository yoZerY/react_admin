import service from "../utils/request";

//添加部门
export function reqAddDepartment(data) {
    return service.request({
        url: "/department/add/",
        method: "post",
        data,
    });
}

//部门列表
export function reqDepartmentList(data) {
    return service.request({
        url: "/department/list/",
        method: "post",
        data,
    });
}

//部门删除
export function reqDelDepartment(data) {
    return service.request({
        url: "/department/delete/",
        method: "post",
        data,
    });
}


//部门禁用启用
export function reqDepartmentStatus(data) {
    return service.request({
        url: "/department/status/",
        method: "post",
        data,
    });
}

//部门详情
export function reqDepartmentDetails(data) {
    return service.request({
        url: "/department/detailed/",
        method: "post",
        data,
    });
}

//部门详编辑
export function reqDepartmentEdit(data) {
    return service.request({
        url: "/department/edit/",
        method: "post",
        data,
    });
}






