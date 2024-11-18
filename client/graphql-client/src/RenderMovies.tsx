// import { useQuery } from "@apollo/client"
// import { DeleteUserButton } from "./components/DeleteUserButton"
// import { EditUserDialog } from "./components/EditUserDialog"
// import { QUERY_ALL_MOVIES } from "./schema/schema"

// export function RenderMovies(){

//     const {loading, error, data} = useQuery(QUERY_ALL_MOVIES)

//     if (loading){
//         console.log("loading...")
//     } 

//     if (error){
//         console.log("erro ao buscar")
//     }

//     if (data){
//         console.log(data)
//     }

//     return (
//         <>
//             <div style={ { display: "flex", width: "100%", flexWrap: "wrap", justifyContent: "center"
//             } }>
//                 { data &&
//                     data.movies.map((movie) => {
//                         return <div key={movie.name} style={ { display: "flex", flexDirection: "column", width: "400px", margin: "10px", padding: "20px", border: "1px solid mediumvioletred", borderRadius: "5px" } }>
//                             {
//                                 Object.entries(movie).map(([key, value]) => {
//                                     console.log(key, value)
//                                     return <div 
//                                         style={ { display: "flex", justifyContent: "space-between" } }>
//                                             <p>{key}</p> <p>{String(value)}</p></div>
//                                 })
//                             }

//                             <DeleteUserButton></DeleteUserButton>
//                             <EditUserDialog></EditUserDialog>

//                         </div>
//                     })
//                 }
//             </div>
//         </>
//     )
// }