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
import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"
import { UPDATE_USERNAME_MUTATION, QUERY_ALL_USERS } from "@/schema/schema"

interface IEditUserDialog {
    userId: number
    username: string
}

export function     EditUserDialog (props: IEditUserDialog){

    const { refetch } = useQuery(QUERY_ALL_USERS)

    const [updateUserName] = useMutation(UPDATE_USERNAME_MUTATION)

    const [username, setUserName] = useState(props.username)

    console.log(username)
    return (
        <Dialog >
            <DialogTrigger style={{border: "1px solid mediumvioletred", color: "mediumvioletred", fontWeight: 'bold'}}>Editar nome de usuário</DialogTrigger>
            <DialogContent style={ { backgroundColor: "#242424"}}>
                <DialogHeader>
                <DialogTitle style={ { color: "white" } }>Alterar nome de usuário</DialogTitle>
                <div className='flex flex-col gap-2'>
                    <Label style={{ color: "white"}}>Nome de Usuário</Label>
                    <Input style={{ color: "white"}} onChange={(e) => {setUserName(e.target.value)}} value={username}></Input>
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