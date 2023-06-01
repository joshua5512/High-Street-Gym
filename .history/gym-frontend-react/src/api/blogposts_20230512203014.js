import { API_URL } from "./api.js"

export async function getAll() {
    const response = await fetch(
        API_URL + "/blogposts",
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.blogposts
}

export async function getBlogpostByID(blogpostID) {

    const response = await fetch(
        API_URL + "/blogposts/" + blogpostID,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.blogpost
}

export async function getUserBlogposts(userID) {

  const response = await fetch(
      API_URL + "/blogposts/user-id/" + userID,
      {
          method: "GET",
          headers: {
              'Content-Type': "application/json"
          },
      }
  )

  const APIResponseObject = await response.json()

  return APIResponseObject.blogposts
}

export async function createBlogpost(blogpost) {
    const response = await fetch(
        API_URL + "/blogposts",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(blogpost)
        }
    )

    const postCreateBlogpostResponse = await response.json()

    return postCreateBlogpostResponse.blogpost
}

export async function updateBlogpost(blogpostID) {
    const response = await fetch(
        `${API_URL}/blogposts/${blogpostID}`,
        {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(blogpostID)
        }
    )

    const patchBlogpostResponse = await response.json()

    return patchBlogpostResponse.blogpost
}

export async function deleteByID(blogpostID) {
    const response = await fetch(`${API_URL}/blogposts/${blogpostID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const deleteBlogpostResponse = await response.json();
  
    return deleteBlogpostResponse;
  }
  