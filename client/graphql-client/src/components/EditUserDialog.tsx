import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { DialogClose } from '@radix-ui/react-dialog'
  import { Button } from './ui/button'
  import { Input } from './ui/input'
  import { Label } from '@radix-ui/react-label'
import { useMutation, gql, useQuery } from "@apollo/client"
import { useState } from "react"

interface IEditUserDialog {
    userId: number
    username: string
}

export function EditUserDialog (props: IEditUserDialog){
    const UPDATE_USERNAME_MUTATION = gql`
        mutation updateUsername( $input: UpdateUsernameInput!) {
            updateUsername(input: $input) {
                id,
                username
            }
    }   
    `

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
    const { refetch } = useQuery(QUERY_ALL_USERS)

    const [updateUserName] = useMutation(UPDATE_USERNAME_MUTATION)

    const [username, setUserName] = useState(props.username)

    console.log(username)
    return (
        <Dialog >
            <DialogTrigger>Editar nome de usuário</DialogTrigger>
            <DialogContent style={ { backgroundColor: "#242424"}}>
                <DialogHeader>
                <DialogTitle style={ { color: "white" } }>Alterar nome de usuário</DialogTitle>
                <div className='flex flex-col gap-2'>
                    <Label style={{ color: "white"}}>Nome de Usuário</Label>
                    <Input style={{ color: "black"}} onChange={(e) => {setUserName(e.target.value)}} value={username}></Input>
                </div>

                </DialogHeader>
                <DialogFooter>
                <Button type='submit' style={ { backgroundColor: "mediumvioletred"}} onClick={() => { 
                    updateUserName({ variables: { input : { id: props.userId, newUsername: username}}})
                    refetch()
                }}>
                    Alterar
                </Button>
                <DialogClose asChild>
                    <Button type="button">
                    Fechar
                    </Button>
                </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}