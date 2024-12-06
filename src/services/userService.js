/**
 * It's a function that returns a promise that resolves to an object with a data property that is an
 * array of objects.
 * @param userEmail - userEmail,
 * @param userPassword - "123456"
 * @returns The return value of the function is the return value of the axios.post() function.
 */
import axios  from "../axios";

const handleLoginApi = (userEmail, userPassword) =>{
    return axios.post('/api/login', {email: userEmail, password: userPassword});
}

const getAllUsers = (inputId) =>{
    return axios.get(`/api/get-api-all-users?id=${inputId}`);
}

const createNewUserService = (data) =>{
    console.log('check data: ', data)
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) =>{
    return axios.delete('/api/delete-user',
    {data:{
        id: userId
    }
        
    });
}

const editUserService = (inputType) =>{
    return axios.put('api/edit-user',inputType);
}
const getAllcodeService = (inputData) =>{
    return axios.get(`/api/allcodes?type=${inputData}`);

}
const getTopDoctorHomeService = (limit) =>{
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctors = () =>{
    return axios.get(`/api/get-all-doctors`)
}

const saveDetailDoctor = (data) =>{
    return axios.post(`/api/save-info-doctors`, data)
}
const getDetailInfoDoctor = (inputId) =>{
    return axios.get(`/api/get-all-detail-doctor-by-id?id=${inputId}`)
}
const saveBulkScheduleDoctor = (data) =>{
    return axios.post(`/api/bulk-create-schedule`, data)
}
const getScheduleDoctorByDate = (doctorId, date) =>{
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}
const getExtraInfoDoctorById = (doctorId) =>{
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`)

}
const getProfileDoctorById = (doctorId) =>{
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)

}

const postPatientBookAppointment = (data) =>{
    return axios.post(`/api/patient-book-appointment`, data)

}

const postVerifyBookAppointment = (data) =>{
    return axios.post(`/api/verify-book-appointment`, data)

}

const createNewSpecialty = (data) =>{
    return axios.post(`/api/create-new-specialty`, data)

}
const getAllSpecialty = () =>{
    return axios.get(`/api/get-specialty`)

}

const getAllDetailSpecialtyById = (data) =>{
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}

const getAllDetailClinicById = (data) =>{
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}
const createNewClinic = (data) =>{
    return axios.post('/api/create-new-clinic',data)
}

const getAllClinic = () =>{
    return axios.get('/api/get-clinic')
}

const getAllPatientForDoctor = (data) =>{
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}

const postSendRemedy = (data) =>{
    return axios.post('/api/send-remedy',data)
}

export{
    handleLoginApi, getAllUsers, 
    createNewUserService,  deleteUserService, 
    editUserService,getAllcodeService,
    getTopDoctorHomeService,getAllDoctors,
    saveDetailDoctor,getDetailInfoDoctor,
    saveBulkScheduleDoctor,getScheduleDoctorByDate,
    getExtraInfoDoctorById,getProfileDoctorById,
    postPatientBookAppointment,postVerifyBookAppointment,
    createNewSpecialty,getAllSpecialty,
    getAllDetailSpecialtyById,createNewClinic,
    getAllClinic,getAllPatientForDoctor,
    postSendRemedy, getAllDetailClinicById
    
}