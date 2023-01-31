export type MenuType = {
    id : number,
    menu : string,
    url : string,
    icon : JSX.Element,
}

export type TodoType = {
    id : number,
    title : string,
    description : string,
    isChecked : boolean,
    createdAt : string,
    updatedAt : string,
    deadline : string,
    user : number,
}

export type userType = {
    pk: number,
    email : string,
    first_name:  string,
    last_name: string
}