import { useMutation, useQuery } from "@apollo/client"
import { DELETE_USER_MUTATION, QUERY_ALL_USERS } from "@/schema/schema"

interface IDeleteUserButtonProps {
    userId: number
}

export function DeleteUserButton ({ userId }: IDeleteUserButtonProps){

    const [ deleteUser ] = useMutation(DELETE_USER_MUTATION)
    const { refetch } = useQuery(QUERY_ALL_USERS);

    return (
        <button className="Button" onClick={() => {
            deleteUser({variables : {deleteUserId : userId}})
            refetch()
        }}>Excluir</button>
    )
}