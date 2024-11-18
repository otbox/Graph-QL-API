import { gql } from "@apollo/client"

export const QUERY_ALL_USERS = gql`
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

export const QUERY_ALL_MOVIES = gql`
    query getAllMovies {
    movies {
        id
        isInTheathers
        name
        yearOfPublication
    }
}`

export const GET_MOVIE_BYNAME = gql`
    query GetMovieByName($name: String!){
        movie(name : $name) {
            name, 
            yearOfPublication
        }
    }
`

export const GET_USER_BYID = gql`
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

export const DELETE_USER_MUTATION = gql`
    mutation deleteUser ($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId) {
        id
    }
}`

export const UPDATE_USERNAME_MUTATION = gql`
mutation updateUsername( $input: UpdateUsernameInput!) {
    updateUsername(input: $input) {
        id,
        username
    }
}   
`

export const CREATE_USER_MUTATION = gql`
    mutation createUser($input: createUserInput!){
        createUser(input: $input) {
        id,
        name, 
        }
    }
`
