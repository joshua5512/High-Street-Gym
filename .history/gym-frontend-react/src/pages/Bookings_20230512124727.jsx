// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getUserBookings } from "../api/bookings";
// import { getTop } from "../api/trainingClasses";
// import { getByUserID } from "../api/trainingClasses";
// import { getClassByID } from "../api/trainingClasses";
// import { getUserByID } from "../api/user";
// import Nav from "../components/Nav";
// import Spinner from "../components/Spinner";

// // export default function Bookings(props) {
// //     const navigate = useNavigate()
// //     const {userID} = props

   
// //     const [bookings, setBookings] = useState([])

// //     useEffect(() => {
// //       if (userID) {
// //           getUserBookings(userID).then(async bookings => {
// //               const bookingsWithExtras = await Promise.all(bookings.map(async booking => {
// //                   const user_id = await getUserByID(booking.user_id)
// //                   const class_id = await getClassByID(booking.class_id)
  
// //                   return Promise.resolve({
// //                       id: booking.id,
// //                       user_id,
// //                       class_id,
  
// //                       datetime: new Date(booking.created_datetime).toLocaleDateString(),
                      
// //                   })
// //               }))
  
// //               setBookings(bookingsWithExtras)
// //           })
// //       }
// //   }, [userID])

// //     return <>
// //         <Nav />
// //         <div className="container p-2 mx-auto">
// //             <div className="rounded border-2 border-primary p-2 w-full">
// //                 {bookings.length == 0
// //                     ? <Spinner />
// //                     : <table className="table w-full">
// //                         <thead>
// //                             <tr>
// //                                 <th>ID</th>
// //                                 <th>User ID</th>
// //                                 <th>Class ID</th>
// //                                 <th>Created Datetime</th>
                                
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {bookings.map(booking =>
// //                                 <tr key={booking.id}>
// //                                     <td>{booking.id}</td>
// //                                     <td>{booking.user_id}</td>
// //                                     <td>{booking.class_id}</td>
// //                                     <td>{booking.created_datetime}</td>
// //                                     <td>
// //                                         <button
// //                                             onClick={() => navigate("/bookings/" + booking.id)}
// //                                             className="btn btn-primary btn-sm">Details</button>
// //                                     </td>
// //                                 </tr>
// //                             )}
// //                         </tbody>
// //                     </table>
// //                 }
// //             </div>
// //         </div>
// //     </>
// // }

// export default function Bookings({userID, refreshDependency}) {
    
  
//     const [bookings, setBookings] = useState([])

//     useEffect(() => {
    
//           getByUserID(userID).then(async bookings => {
//               const bookingsWithExtras = await Promise.all(bookings.map(async booking => {
//                   const user_id = await getUserByID(booking.user_id)
//                   const class_id = await getClassByID(booking.class_id)
  
//                   return Promise.resolve({
//                       id: booking.id,
//                       user_id,
//                       class_id,
  
//                       datetime: new Date(booking.created_datetime).toLocaleDateString(),
                      
//                   })
//               }))
  
//               setBookings(bookingsWithExtras)
//           })
      
//   }, [userID])

//     return <>
//         <Nav />
//         <div className="container p-2 mx-auto">
//             <div className="rounded border-2 border-primary p-2 w-full">
//                 {bookings.length == 0
//                     ? <Spinner />
//                     : <table className="table w-full">
//                         <thead>
//                             <tr>
//                                 <th>ID</th>
//                                 <th>User ID</th>
//                                 <th>Class ID</th>
//                                 <th>Created Datetime</th>
                                
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {bookings.map(booking =>
//                                 <tr key={booking.id}>
//                                     <td>{booking.id}</td>
//                                     <td>{booking.user_id}</td>
//                                     <td>{booking.class_id}</td>
//                                     <td>{booking.created_datetime}</td>
//                                     <td>
//                                         <button
//                                             onClick={() => navigate("/bookings/" + booking.id)}
//                                             className="btn btn-primary btn-sm">Details</button>
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 }
//             </div>
//         </div>
//     </>
// }

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserBookings } from "../api/bookings";
import { getClassByID } from "../api/trainingClasses";
import { getUserByID } from "../api/user";
import Nav from "../components/Nav";
import Spinner from "../components/Spinner";
import { useAuthentication } from "../hooks/authentication";
import { Link } from "react-router-dom";
import { getAllBookings } from "../api/bookings";

export default function Bookings({ refreshDependency }) {
  const [bookings, setBookings] = useState([]);
  const [user] = useAuthentication();

  useEffect(() => {
    if (user && user.id) {
      getUserBookings(user.id).then(async (bookings) => {
        console.log(user.id);
        const bookingsWithExtras = await Promise.all(
          bookings.map(async (booking) => {
            const trainingClass = await getClassByID(booking.class_id);
            return Promise.resolve({
              id: booking.id,
              user,
              class: trainingClass,
              date: new Date(booking.created_datetime).toLocaleString(),
            });
          })
        );
        setBookings(bookingsWithExtras);
      });
    }
  }, [user, refreshDependency]);

  return (
    <>
      <Nav />
      <div className="container p-2 mx-auto">
        <div className="rounded border-2 border-primary p-2 w-full">
          {bookings.length === 0 ? (
            <Spinner />
          ) : (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Booking number</th>
                  <th>Member name</th>
                  <th>Training Class</th>
                  <th>Created Datetime</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>
                      {booking.user.firstname} {booking.user.lastname}
                    </td>
                    <td>{booking.class.activity_name}</td>
                    <td>{booking.date}</td>
                    <td>
                      <Link
                        to={`/bookings/${booking.id}`}
                        className="btn btn-primary btn-sm"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
