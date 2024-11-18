import { gql, useMutation, useQuery } from "@apollo/client"

interface IDeleteUserButtonProps {
    userId: number
}

export function DeleteUserButton ({ userId }: IDeleteUserButtonProps){
    const DELETE_USER_MUTATION = gql`
        mutation deleteUser ($deleteUserId: ID!) {
        deleteUser(id: $deleteUserId) {
            id
        }
    }`

    const QUERY_ALL_USERS = gql`
        query getAllUser {
        users {
            id,
            name,
            age,
            username,
            nationality,
            }
        }
    `


    const [ deleteUser ] = useMutation(DELETE_USER_MUTATION)
    const { refetch } = useQuery(QUERY_ALL_USERS);

    return (
        <button className="Button" onClick={() => {
            deleteUser({variables : {deleteUserId : userId}})
            refetch()
        }}>Excluir</button>
    )
}