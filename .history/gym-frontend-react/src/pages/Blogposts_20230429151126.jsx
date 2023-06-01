import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserBlogposts } from "../api/blogposts";
import { getUserByID } from "../api/user";
import Nav from "../components/Nav";
import Spinner from "../components/Spinner";

export default function Blogposts(userID) {
    const navigate = useNavigate()

   
    const [blogposts, setBlogposts] = useState([])

    useEffect(() => {
        getUserBlogposts(userID).then(async blogposts => {
         
            const blogpostsWithExtras = await Promise.all(blogposts.map(async blogpost => {
                const user_id = await getUserByID(blogpost.user_id)
               

                return Promise.resolve({
                    id: blogpost.id,
                    user_id,
                    datetime: new Date(booking.created_datetime).toLocaleDateString(),
                    title,
                    content
                  
                    
                })
            }))

            setBlogposts(blogpostsWithExtras)
        })
    }, [])

    return <>
        <Nav />
        <div className="container p-2 mx-auto">
            <div className="rounded border-2 border-primary p-2 w-full">
                {bookings.length == 0
                    ? <Spinner />
                    : <table className="table w-full">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User ID</th>
                                <th>Datetime</th>
                                <th>Title</th>
                                <th>Content</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(booking =>
                                <tr key={booking.id}>
                                    <td>{booking.id}</td>
                                    <td>{booking.user_id}</td>
                                    <td>{booking.class_id}</td>
                                    <td>{booking.created_datetime}</td>
                                    <td>
                                        <button
                                            onClick={() => navigate("/bookings/" + booking.id)}
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