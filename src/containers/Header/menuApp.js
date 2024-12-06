export const adminMenu = [
    { //Quản Lý người dùng
        name: 'menu.admin.manage-user',
            menus: [
                
                {
                    name: 'menu.admin.crud-redux',  link: '/system/user-redux'
                },
                {
                    name: 'menu.admin.manage-doctor',  link: '/system/manage-doctor'
                      
                },
                {
                    name: 'menu.doctor.manage-schedule', link : '/doctor/manage-schedule'
                }

        ]
    },
    { //Quản Lý chuyên khoa
        name: 'menu.admin.specialty',
            menus: [
                {
                    name: 'menu.admin.manage-specialty',  link: '/system/manage-specialty'
                },

        ]
    },
    { //Quản Lý cẩm nang
        name: 'menu.admin.handbook',
            menus: [
                {
                    name: 'menu.admin.manage-handbook',  link: '/system/manage-handbook'
                },
                
        ]
    },
];

export const doctorMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },
            {
                name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient'
            }
        ]
    }
]