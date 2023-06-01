import { db } from "../database/mysql.js";

export function Blogpost(id, datetime, user_id, title, content) {
  return {
      id,
      datetime,
      user_id,
      title,
      content
  }
}



export async function getAll() {
    // Get the collection of all blogposts
    const [allBlogpostsResults] = await db.query("SELECT * FROM blog_posts")
    // Convert the collection of results into a list of blogpost objects
    return await allBlogpostsResults.map((blogpostResult) =>
        Blogpost(blogpostResult.id, blogpostResult.datetime,blogpostResult.user_id, blogpostResult.title, blogpostResult.content))
}

export async function getByID(blogpostID) {
    // Get the collection of all blogposts
    const [blogpostsResults] = await db.query(
        "SELECT * FROM blog_posts WHERE id = ?", blogpostID
    )
    // Convert the result into a blogpost object
    if (blogpostsResults.length > 0) {
        const blogpostResult = blogpostsResults[0];
        return Promise.resolve(
            Blogpost(blogpostResult.id, blogpostResult.name)
        )
    } else {
        return Promise.reject("no results found")
    }
}



export async function create(blogpost) {
    delete blogpost.id
    return db.query(
        "INSERT INTO blog_posts (datetime, user_id, title, content) VALUES (?,?,?,?)",
        [blogpost.datetime,blogpost.user_id, blogpost.title, blogpost.content]
    ).then(([result]) => {
        // Inject the inserted ID into the blogpost object and return
        return { ...blogpost, id: result.insertId }
    })
}

export async function update(blogpost) {
    return db.query(
        "UPDATE blog_posts SET datetime = ? title=? content=?  WHERE id = ?",
        [blogpost.datetime, blogpost.title, blogpost.content, blogpost.id]
    )
}

export async function deleteByID(blogpostID) {
    return db.query("DELETE FROM blog_posts WHERE id = ?", blogpostID)
}