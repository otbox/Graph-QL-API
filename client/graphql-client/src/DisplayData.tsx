import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client"
import { useState } from "react";

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
const QUERY_ALL_MOVIES = gql`
query getAllMovies {
  movies {
    id
    isInTheathers
    name
    yearOfPublication
  }
}`

type user = {
    id: string,
    name: string,
    age: number,
    username: string,
    nationality: string,
}
const GET_MOVIE_BYNAME = gql`
    query GetMovieByName($name: String!){
        movie(name : $name) {
            name, 
            yearOfPublication
        }
    }
`

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

type ButtonProps = {
    value: string
}
const ButtonExclude = ({ value }: ButtonProps) => {
    const MUTATION_DELETE_SOMETHING = gql`
        mutation deleteUser ($deleteUserId: ID!) {
        deleteUser(id: $deleteUserId) {
            id
        }
    }
    `
    const [ deleteUser ] = useMutation(MUTATION_DELETE_SOMETHING)

    return (
        <button className="Button" onClick={() => deleteUser({variables : {deleteUserId : Number(value)}})}>Excluir</button>
    )
}

const ButtonUpdate = () => {
    const MUTATION_UPDATE_SOMETHING = gql`
        mutation updateUsername( $updateUsernameInput2: UpdateUsernameInput!) {
        updateUsername(input: $updateUsernameInput2) {
            id,
            username
        }
    }   
    `

    return (
        <button className="ButtonAlt">Update</button>
    )

}

type ComponentCreateUserProps = {
    refresh : () => void
}

const ComponentCreateUser = ({refresh} : ComponentCreateUserProps) => {
    const [newUser, setnewUser] = useState<user>({
        id: '',
        name: '',
        age: 0,
        username: '',
        nationality: ''
    });

    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        name === "age" ?
        setnewUser((prevUser) => ({
                ...prevUser,
                [name]: Number(value)
            }))
        : setnewUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }))
        console.log(value)
    }
    
    const MUTATION_CREATE_USER = gql`
    mutation createUser($input: createUserInput!){
        createUser(input: $input) {
          id,
          name, 
        }
    } `


const [ createUser ] = useMutation(MUTATION_CREATE_USER);


return (
    <>
        <div style={{ display: "flex", width: "100%", flexDirection: "column", alignItems: "center"}}>
            <h2>Criar Novo Usuário</h2>
            <p>Name:</p>
            <input className="TextInput" type="text" placeholder="Name..." name="name" value={newUser.name} onChange={handleChange}/>
            <p>Username:</p>
            <input className="TextInput" type="text" placeholder="Username..." name="username" value={newUser.username} onChange={handleChange}/>
            <div style={{display: "flex", width: "350px"}}>
                <div>
                    <p>Age:</p>
                    <input style={{width:"170px", marginRight: "20px"}} className="TextInput" type="number" placeholder="Age..." name="age" value={newUser.age} onChange={handleChange}/>
                </div>
                {/* <input className="TextInput" type="text" placeholder="Nationality..." name="nationality" value={newUser.nationality} onChange={(e) => {e.target.value = e.target.value.toUpperCase(); handleChange(e)}}/> */}
                <div>
                    <p>Nationality</p>
                    <select className="TextInput" name="nationality" value={newUser.nationality} onChange={handleChange}>
                        <option>BRAZIL</option>
                        <option>CANADA</option>
                        <option>INDIA</option>
                        <option>GERMANY</option>
                        <option>CHILE</option>
                    </select>
                </div>
            </div> 
            <button className="Button" onClick={() => {createUser({variables : {input: {name : newUser.name, username: newUser.username, age: newUser.age, nationality: newUser.nationality}}}); refresh()}}>Criar novo usuário</button>
        </div>
    </>)
}

type DisplayObjectProps = {
    object: any;
};
const DisplayObject : React.FC<DisplayObjectProps> = ({ object }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", width: "400px", margin: "10px", padding: "20px", border: "1px solid mediumvioletred", borderRadius: "5px" }}>
            {Object.entries(object).map(([key, value]) => (
                <div key={key} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0" }}>
                    <p style={{ fontWeight: "bold" }}>{key}:</p>
                    <p>{String(value)}</p>
                </div>

            ))}
            <ButtonUpdate />
            <ButtonExclude value={object.id}/>
        </div>
    );
};



export default function DisplayData() {
    const { data, loading, refetch, error } = useQuery(QUERY_ALL_USERS);
    const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
    const [searchMovie, setSearchMovie] = useState<String>();
    const [fetchMovie, { data: userSearched, error: MovieError }] = useLazyQuery(GET_USER_BYID);
    if (loading) {
        return <p> Wait data Loading...</p>
    }

    // if (data) {
    //     console.log(data)
    //     // setUserList(data)
    // }

    if (userSearched) {
        console.log(userSearched)
    }

    // if (movieData) {
    //     console.log(movieData)
    // }

    if (MovieError) {
        console.log(MovieError)
    }
    if (error) {
        console.log("Error");
    }

    return (
        <>
            <div className="Home">
                <div>
                    <ComponentCreateUser refresh={refetch}/>
                <div style={{ display: "flex", width: "100%", flexWrap: "wrap", flexDirection: "column", alignItems: "center" }}>
                    <h2>Pesquisar Usuário por ID</h2>
                    <div>
                        <input className="TextInput" type="text" placeholder="Pesquisar..." onChange={(e) => { setSearchMovie(e.target.value) }} />
                        <button className="Button" style={{marginLeft:"10px"}} onClick={() => { fetchMovie({ variables: { userId: searchMovie } }) }}>Pesquisar</button>
                    </div>
                    {userSearched ? (
                        <DisplayObject key={"Pesquisa"} object={userSearched.user} />
                    ) : MovieError ? (
                        <h2>Error on fetching {MovieError?.message}</h2>
                    ) : (<></>)}

                </div>
                </div>
                <div style={{ display: "flex", width: "100%", flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
                    <h2 style={{width: "100%"}}>All Users</h2>
                    {data && data.users.map((item: any, index: any) => {
                        return (
                            <DisplayObject key={index} object={item} />
                        )
                    })}
                    <h2 style={{width: "100%"}}>All Movies</h2>
                    {movieData && movieData.movies.map((item: any, index: any) => {
                        return (
                            <DisplayObject key={index} object={item} />
                        )
                    })}
                </div>
            </div>
        </>
    )
};
