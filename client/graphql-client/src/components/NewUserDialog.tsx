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
import { CREATE_USER_MUTATION, QUERY_ALL_USERS } from "@/schema/schema"

export function NewUserDialog (){
    const [ createUser ] = useMutation(CREATE_USER_MUTATION)
    const { refetch } = useQuery(QUERY_ALL_USERS);
    const [name, setName] = useState("")
    const [username, setUserName] = useState("")
    const [age, setAge] = useState(0)
    const [nationality, setNationality] = useState("BRAZIL")
    
    return (
        <Dialog>
            <DialogTrigger style={{width: "500px"}}>Adicionar Usuário</DialogTrigger>
            <DialogContent style={ { backgroundColor: "#242424"}}>
                <DialogHeader>
                <DialogTitle style={ { color: "white" } }>Criar novo usuário</DialogTitle>
                <div className='flex flex-col gap-2'>
                    <Label style={{ color: "white"}}>Nome</Label>
                    <Input  style={{ color: "black"}} onChange={(e) => {setName(e.target.value)}} value={name}></Input>
                </div>

                <div className='flex flex-col gap-2'>
                    <Label style={{ color: "white"}}>Nome de Usuário</Label>
                    <Input  style={{ color: "black"}} onChange={(e) => {setUserName(e.target.value)}} value={username}></Input>
                </div>

                <div className='flex flex-col gap-2'>
                    <Label style={{ color: "white"}}>Idade</Label>
                    <Input  style={{ color: "black"}} type='number' onChange={(e) => {setAge(Number(e.target.value))}} value={age}></Input>
                </div>

                <div className='flex flex-col gap-2'>
                    <Label style={{ color: "white"}}>Nacionalidade</Label>
                    <select name='nationality' style={{backgroundColor: "#777", padding: "5px"}} value={nationality} onChange={(e) => {setNationality(e.target.value)}}>
                    <option>BRAZIL</option>
                    <option>CANADA</option>
                    <option>INDIA</option>
                    <option>GERMANY</option>
                    <option>CHILE</option>
                    </select>
                </div>

                </DialogHeader>
                <DialogFooter>
                <Button type='submit' style={ { backgroundColor: "mediumvioletred"}} onClick={() => {
                    createUser({variables : {input: {name : name, username: username, age: age, nationality: nationality}}});
                    refetch()
                    setAge(0)
                    setName("")
                    setNationality("BRAZIL")
                    setUserName("")
                } }>
                    Criar
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