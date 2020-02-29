const hasRole = ( user, roles )  => {
    let roleExists = false;
    user.roles.map(role => {
        if (roles.includes(role.name))
            roleExists = true; 
        return role;
     });
    return roleExists;
}

export default hasRole;