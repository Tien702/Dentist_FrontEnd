import actionTypes from './actionTypes';
import { getAllcodeService, createNewUserService,
        getAllUsers,deleteUserService, editUserService,
        getTopDoctorHomeService, getAllDoctors, saveDetailDoctor,
        getAllSpecialty, getAllClinic
} from '../../services/userService';
import {toast} from 'react-toastify';
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch,getState) =>{
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllcodeService("GENDER");
            if(res && res.errCode === 0){
                dispatch(fetchGenderSuccess(res.data))
            }else{
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
                dispatch(fetchGenderFailed());
        }
    }
  
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionStart = () => {
    return async (dispatch,getState) =>{
        try {
            let res = await getAllcodeService("POSITION");
            if(res && res.errCode === 0){
                dispatch(fetchPositionSuccess(res.data))
            }else{
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
                dispatch(fetchPositionFailed());
        }
    }
  
}

export const fetchPositionSuccess = (positonData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positonData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleStart = () => {
    return async (dispatch,getState) =>{
        try {
            let res = await getAllcodeService("ROLE");
            if(res && res.errCode === 0){
                dispatch(fetchRoleSuccess(res.data))
            }else{
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
                dispatch(fetchRoleFailed());
        }
    }
  
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (data) =>{
    return async (dispatch,getState) =>{
        try {
            let res = await createNewUserService(data) ;

            if(res && res.errCode === 0){
                toast.success("Create a new User succeed!!!")
                dispatch(saveUserSuccess())
                dispatch(fetchAllUsersStart())
            }else{
                dispatch(saveUserFailed());
            }
        } catch (e) {
                dispatch(saveUserFailed());
                console.log('check save user: ', e);
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUsersStart = () =>{
    return async (dispatch,getState) =>{
        try {
            let res = await getAllUsers("ALL") ;
            if(res && res.errCode === 0){
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            }else{
                toast.error("Fetch all user error")
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
                dispatch(fetchAllUsersFailed());
                console.log('check save user: ', e);
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

export const deleteAUser = (userId) =>{
    return async (dispatch,getState) =>{
        try {
            let res = await deleteUserService(userId) ;
            if(res && res.errCode === 0){
                toast.success("Delete User succeed!!!")
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUsersStart())
            }else{
                toast.error("Delete user error")
                dispatch(deleteUsersFailed());
            }
        } catch (e) {
                toast.error("Delete user error")
                dispatch(deleteUsersFailed());
                console.log('check save user: ', e);
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUsersFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editAUser = (data) =>{
    return async (dispatch,getState) =>{
        try {
            let res = await editUserService(data) ;
            if(res && res.errCode === 0){
                toast.success("Update User succeed!!!")
                dispatch(editUserSuccess())
                dispatch(fetchAllUsersStart())
            }else{
                toast.error("Update user error")
                dispatch(editUsersFailed());
            }
        } catch (e) {
                toast.error("Update user error")
                dispatch(editUsersFailed());
                console.log('check save user: ', e);
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUsersFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const fetchTopDoctor = () =>{
    return async (dispatch,getState) =>{
        try {
            let res = await getTopDoctorHomeService('') ;
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctors: res.data
                })
            }else{
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILED
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED
            })
                console.log('check save user: ', e);
        }
    }
}

export const fetchAllDoctors = () =>{
    return async (dispatch, getState) =>{
        try {
            let res = await getAllDoctors();
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataDr: res.data
                })
            }else{
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILED
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAILED
            })
                console.log('check save user: ', e);
        }
    }
}

export const saveDetailDoctorAct = (data) =>{
    return async (dispatch, getState) =>{
        try {
            let res = await saveDetailDoctor(data);
            if(res && res.errCode === 0){
                toast.success("Save Info Detail Doctor succeed!!!")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            }else{
                console.log('save error: ', res)
                toast.error("Save Info Detail Doctor failed!!!")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
                })
            }
        } catch (e) {
            toast.error("Save Info Detail Doctor failed!!!")
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
            })
                console.log('check save user: ', e);
        }
    }
}

export const fetchAllScheduleTime = () =>{
    return async (dispatch, getState) =>{
        try {
            let res = await getAllcodeService("TIME");
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            }else{
                toast.error("Save Info Detail Doctor failed!!!")
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
            })
                console.log('check save user: ', e);
        }
    }
}

export const getRequiredDoctorInfo = () =>{
    return async (dispatch, getState) =>{
        try {

            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START})
            
            let resPrice = await getAllcodeService("PRICE");
            let resPayment = await getAllcodeService("PAYMENT");
            let resProvince = await getAllcodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();
            if(resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0
                && resClinic && resClinic.errCode === 0){
                    let data = {
                            resPrice: resPrice.data,
                            resPayment: resPayment.data,
                            resProvince: resProvince.data,
                            resSpecialty: resSpecialty.data,
                            resClinic: resClinic.data
                    }
                    dispatch(fetchRequiredDoctorInfoSuccess(data))
            }else{
                dispatch(fetchRequiredDoctorInfoFailed());
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInfoFailed());
            console.log('check save user: ', e);
        }
    }
}
export const getAllSeclectSpec =() =>{
    return async (dispatch, getState) =>{
        try {
            let resSelectSpec = await getAllcodeService("SELECTSPEC");
            if(resSelectSpec && resSelectSpec.errCode === 0){
                    let data = {
                        resSelectSpec: resSelectSpec.data,
                    }
                    dispatch( dispatch({
                        type: actionTypes.FETCH_REQUIRED_ALL_CODE_SUCCESS,
                        dataSpec: resSelectSpec.data
                    }))
            }else{
                dispatch({type: actionTypes.FETCH_REQUIRED_ALL_CODE_FAILED});
            }
        } catch (e) {
            dispatch({type: actionTypes.FETCH_REQUIRED_ALL_CODE_FAILED});
        }
    }
}
export const fetchRequiredDoctorInfoSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
    data: allRequiredData
})
export const fetchRequiredDoctorInfoFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED
})