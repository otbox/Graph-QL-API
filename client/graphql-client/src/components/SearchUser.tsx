import { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useLazyQuery, gql } from "@apollo/client"
import { EditUserDialog } from "./EditUserDialog"
import { DeleteUserButton } from "./DeleteUserButton"

export function SearchUser(){

    const [userId, setUserId] = useState("")
    
    const GET_USER_BYID = gql`
    query getUsers($userId: ID!) {
        user(id: $userId) {
            id,
        name,
        age,
        username,
        nationality,
    }
    }
    `
    const [getUserById, { data, error }] = useLazyQuery(GET_USER_BYID);

    if (error){
        console.log("error", error)
    }

    function clearSearch(){
        setUserId("")
        getUserById({ variables: { userId: 83459}})
    }

    if (data){
        console.log(data.user)
    }

    return (
        <>
        <div style={{marginBottom: "1rem", width: "", display: "flex", gap: "20px", justifyContent: "space-between"}}>
            <Input style={ { color: "black"} } onChange={(e) => { setUserId(e.target.value)}} value={userId.toString()}></Input>
            <Button onClick={() => getUserById({ variables: { userId: userId}})}>Pesquisar</Button>
        </div>

        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                { data && <div><h2 className="mb-5">Resultados da busca</h2> <Button onClick={clearSearch}>Limpar busca</Button></div>}
                { data && data.user && <div key={data.user.username} style={ { display: "flex", flexDirection: "column", width: "400px", margin: "10px", padding: "20px", border: "1px solid mediumvioletred", borderRadius: "5px" } }>
                    {
                        Object.entries(data.user).map(([key, value]) => {
                            console.log(key, value)
                            return <div 
                                style={ { display: "flex", justifyContent: "space-between" } }>
                                    <p>{key}</p> <p>{String(value)}</p>
                            </div>
                        })
                    }

                    <DeleteUserButton userId={Number(data.user.id)}></DeleteUserButton>
                    <EditUserDialog username={data.user.username} userId={Number(data.user.id)}></EditUserDialog>
                    </div>
                }
        </div>
        </>
    )
}