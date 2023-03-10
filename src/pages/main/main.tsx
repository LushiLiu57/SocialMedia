import { getDocs, collection, Timestamp, } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../config/firebase'
import { Post } from './post'

export interface Post {
    id: string
    title: string
    description: string
    userID: string
    username: string
    timePosted: string
    editTime: string
}

export const Main = () => {
    const [postPage, setPostPage] = useState<Post[] | null>(null)
    const postsRef = collection(db, 'posts')

    const getPosts = async () => {
        const data = await getDocs(postsRef)
        setPostPage(data.docs.map(
            (doc) => ({...doc.data(), id: doc.id})
        ) as Post[] )
    }

    useEffect(() => {
        getPosts()
    }, [])

    

    return (
        <div>{postPage?.slice(0).reverse().map((post) => <Post post={post}/>)}</div>
    ) 

}