import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAll, getUserBlogposts } from "../api/blogposts";
import { getUserByID } from "../api/user";
import Nav from "../components/Nav";
import Spinner from "../components/Spinner";
import { useAuthentication } from "../hooks/authentication";

export default function Blogposts({refreshDependency}) {
    // const navigate = useNavigate()
    // const [user] = useAuthentication()
    // const userID = user.id
    // // const {userID} = props
   
    // // const [loading, setLoading]=useState(true)

    // const [blogposts, setBlogposts] = useState([])

    // useEffect(() => {
    //     getUserBlogposts(userID).then(async (blogposts) => {
    //       console.log(userID)
         
    //         const blogpostsWithExtras = await Promise.all(blogposts.map(async blogpost => {
    //             const user_id = await getUserByID(blogpost.user_id)
               

    //             return Promise.resolve({
    //                 id: blogpost.id,
    //                 user_id,
    //                 datetime: new Date(blogpost.created_datetime).toLocaleDateString(),
    //                 title: blogpost.title,
    //                 content: blogpost.content
                  
                    
    //             })
    //         }))

    //         setBlogposts(blogpostsWithExtras)
    //         // setLoading(false)
    //     })
    // }, [refreshDependency])

    const navigate = useNavigate()

    const [blogposts, setBlogposts] = useState([])

    useEffect(() => {
        getAll().then(async blogposts => {

            const blogpostsWithExtras = await Promise.all(blogposts.map(async blogpost => {
                
                const userID = await getUserByID(blogpost.user_id)
              

                return Promise.resolve({
                    id: blogpost.id,
                    date: new Date(blogpost.datetime).toLocaleString(),
                    user: userID,
                    title: blogpost.title,
                    content: blogpost.content
                })
            
            }))

            setBlogposts(blogpostsWithExtras)
        })
    }, [])

    return <>
        <Nav />
        <div className="container p-2 mx-auto">
            <div className="rounded border-2 border-primary p-2 w-full">
                {blogposts.length == 0
                    ? <Spinner />
                    : <table className="table w-full">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User</th>
                                <th>Datetime</th>
                                <th>Title</th>
                                <th>Content</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {blogposts.map(blogpost =>
                                <tr key={blogpost.id}>
                                    <td>{blogpost.id}</td>
                                    <td>{blogpost.user.firstname + " " + blogpost.user.lastname}</td>
                                    <td>{blogpost.date}</td>
                                    <td>{blogpost.title}</td>
                                    <td>{blogpost.content}</td>
                                    <td>
                                        <button
                                            onClick={() => navigate("/blogposts/" + blogpost.id)}
                                            className="btn btn-primary btn-sm">Details</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    </>
}