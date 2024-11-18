import './App.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import { NewUserDialog } from './components/NewUserDialog'
import { RenderUsers } from './RenderUsers'
import { SearchUser } from './components/SearchUser'
// import { RenderMovies } from './RenderMovies'

export interface IUser {
  __typename: string
  id: number
  name: string
  age: number
  username: string
  nationality: string
  filter(): Array<IUser>
}

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache() ,
    uri: "http://localhost:4000/graphql"
  })

  return (
    <ApolloProvider client={client}>
      <h1 className='mb-10'>Welcome GraphQL client</h1>
      <div style={ { display: "flex"} }>
        <aside style={ {width: "30%", marginTop: "10rem"} }>
          <h2 className='mb-5 text-xl'>Buscar usuário por ID</h2>
        <SearchUser/> 
        </aside>
        <section style={ {display: "flex", flexDirection: "column", width: "70%", marginTop: "4rem", gap: "20px"} }>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", alignItems: "center", flexDirection: "column"}}>
            <NewUserDialog/>
          </div>
          <h2>Todos usuários</h2>
          <RenderUsers></RenderUsers>
        </section>
      </div>
      {/* <h2>Todos os filmes</h2>
      <RenderMovies></RenderMovies> */}
    </ApolloProvider>
  )
}

export default App
