import { addDoc, collection, query, where, getDocs, doc, deleteDoc} from 'firebase/firestore'
import { SetStateAction, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../config/firebase'
import { Post as IntPost } from './main'

interface Props {
    post: IntPost
}

interface Likes {
    userID: string
    likeID: string
}

export const Post = (props: Props) => {

    const {post} = props
    const likesRef = collection(db, 'likes')
    const postRef = collection(db,'posts')
    const [user] = useAuthState(auth)
    const likesDoc = query(likesRef, where("postID", "==", post.id))
    const [likeCount, setLikeCount] = useState<Likes[] | null>(null)
    const likeToggle = likeCount?.find((like) => like.userID === user?.uid)
    const [editing, setEditing] = useState(false)
    const [afterEdit, setAfterEdit] = useState('')
    const [editTime, setEditTime] = useState('')

    const getLikes = async () => {
        const data = await getDocs(likesDoc)
        setLikeCount(data.docs.map((doc) => ({ userID: doc.data().userID, likeID: doc.id})))
    }

    const likePost = async () => {
        try {
            const newDoc = await addDoc(likesRef, {userID: user?.uid , postID: post.id})
            user && setLikeCount((p) => p ? [...p, { userID: user?.uid, likeID: newDoc.id }] : [{ userID: user?.uid, likeID: newDoc.id }])
        }
        catch (err) {
            console.log(err)
        }
        
    }

    const unlikePost = async () => {
        try {
            const unlikeQuery = query(likesRef, where("postID", "==", post.id), where("userID", "==", user?.uid))
            const unlikeData = await getDocs(unlikeQuery)
            const unlike = doc(db, 'likes', unlikeData.docs[0].id)
            console.log(unlike)
            console.log(unlikeQuery)
            await deleteDoc(unlike)
            setLikeCount((p) => p && p.filter((like) => like.likeID !== unlikeData.docs[0].id))
        }
        catch (err) {
            console.log(err)
        }
    }

    const editPost = (event: { target: { value: SetStateAction<string> } }) => {
        setAfterEdit(event.target.value)
    }

    const editPostSubmit = async () => {
        setEditing(false)
        post.description = afterEdit
        post.editTime = new Date(new Date().getTime()).toLocaleString()
    }

    const deletePost = async () => {
        try {
            await deleteDoc(doc(db,'posts',post.id))
            window.location.reload();
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getLikes()
    }, [])

    return (
        <div className='display-post'>
            <div className='display-form'>
                <div className='title'> <h1> {post.title} </h1> </div>
                <div className='description'> <p> {post.description} </p> </div>
                <div className='edit-time'>{(post.editTime!=='') && <p>(Edited at {post.editTime})</p>}</div>
                <div className='post-user'> <p>{post.username}  || &nbsp; Posted at {post.timePosted}</p> </div>
                <div>
                    <button style={{backgroundColor: likeToggle ? 'greenyellow' : 'grey'}} onClick={likeToggle ? unlikePost : likePost}> &#128077; </button>
                    <div className='like-count'> {likeCount && <p> {likeCount.length} </p>} </div>
                    <div className='edit-delete-post'>
                        {(user?.uid === post.userID && !editing) && (
                            <>
                                <button onClick={()=>{setEditing(true)}}>Edit Post</button>
                                <button onClick={deletePost}>Delete Post</button>
                            </>
                        )}
                        {editing && (
                            <>
                                <textarea onChange={editPost}>{post.description}</textarea>
                                <button onClick={()=>{setEditing(false)}}>Cancel</button>
                                <button onClick={editPostSubmit}>Save Change</button>
                            </>
                        )}
                        
                    </div>
                        
                </div>
            </div>
        </div>
    )
}