const Role = {
    MANAGER : 'manager',
    CREATOR : 'creator'
}

module.exports = {
    Role : Role,

    users : [
        {id: 1, name: 'spandex', role : Role.MANAGER},
        {id: 2, name: 'JBoy', role : Role.CREATOR},
        {id: 3, name: 'Demi', role : Role.CREATOR},
    ]

}

