import { db } from "../database/mysql.js"

export function User(id, email, password, role, phone, firstname, lastname, address, authenticationKey) {
  return {
    id, email, password, role, phone, firstname, lastname, address, authenticationKey
  }
}

export async function getAll() {
  const [allUserResults] = await db.query("SELECT * FROM users");

  return await allUserResults.map(
    (userResult)=>User(
      userResult.id,
      userResult.email,
      userResult.password,
      userResult.role,
      userResult.phone,
      userResult.firstname,
      userResult.lastname,
      userResult.address,
      userResult.authentication_key
    )
  )
}

export async function getByID(userID) {
  const [userResults] = await db.query("SELECT * FROM users WHERE id=?", userID)


if(userResults.length > 0) {
    const userResult = userResults[0];
    return Promise.resolve(
      User(
          userResult.id,
          userResult.email,
          userResult.password,
          userResult.role,
          userResult.phone,
          userResult.firstname,
          userResult.lastname,
          userResult.address,
          userResult.authentication_key
      )
    )

  } else {
    return Promise.reject("no result found")

  }

}

export async function getByAuthenticationKey(authenticationKey) {
  const [userResults] = await db.query(
      "SELECT * FROM users WHERE authentication_key = ?", authenticationKey
  )

  if (userResults.length > 0) {
      const userResult = userResults[0]
      return Promise.resolve(
          User(
              userResult.id,
              userResult.email,
              userResult.password,
              userResult.role,
              userResult.phone,
              userResult.firstname,
              userResult.lastname,
              userResult.address,
              userResult.authentication_key,
          )
      )
  } else {
      return Promise.reject("no results found")
  }
}

export async function getByEmail(email) {
  const [userResults] = await db.query(
      "SELECT * FROM users WHERE email = ?", email
  )

  if (userResults.length > 0) {
      const userResult = userResults[0]
      return Promise.resolve(
          User(
              userResult.id,
              userResult.email,
              userResult.password,
              userResult.role,
              userResult.phone,
              userResult.firstname,
              userResult.lastname,
              userResult.address,
              userResult.authentication_key,
          )
      )
  } else {
      return Promise.reject("no results found")
  }
}


export async function getTrainerByRole(role) {
  const [userResults] = await db.query("SELECT * FROM users WHERE role=trainer", role)


if(userResults.length > 0) {
    const userResult = userResults[0];
    return Promise.resolve(
      User(
          userResult.id,
          userResult.email,
          userResult.password,
          userResult.role,
          userResult.phone,
          userResult.firstname,
          userResult.lastname,
          userResult.address,
          userResult.authentication_key
      )
    )

  } else {
    return Promise.reject("no result found")

  }

}

export async function create(user) {
  delete user.id
  return db.query("INSERT INTO users(email, password, role, phone, firstname, lastname, address) VALUES (?,?,?,?,?,?,?)", [user.email, user.password, user.role, user.phone, user.firstname, user.lastname, user.address]
  ).then(([result])=>{
    return {...user, id:result.insertId}
  })
}

export async function update(user) {
  return db.query(
    "UPDATE users SET ( 
    + "email=?, " 
    + "password=?, "
    + "role=?, "
    + "phone=?, "
    + "firstname=?, "
    + "lastname=?, "
    + "address=?, "
    + "authentication_key = ? )
    + "WHERE id=?", [
        user.email,
        user.password,
        user.role,
        user.phone,
        user.firstname,
        user.lastname,
        user.address,
        user.authenticationKey,
        user.id
    ]
  ).then(([result]) => {
    return { ...user, id: result.insertId }
  })
}

export async function deleteByID(userID) {
  return db.query("DELETE FROM users WHERE id=?", [userID]);
}