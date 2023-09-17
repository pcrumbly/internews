import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { auth, ui, uiConfig, firestore } from '../services/firebase.js';
import { collection, addDoc, serverTimestamp, getDocs, query, where, getDoc, doc, updateDoc } from 'firebase/firestore';

const GlobalStateContext = createContext();
const GlobalDispatchContext = createContext();






/**
 * Reduces the global state based on the given action.
 *
 * @param {Object} state - The current state object
 * @param {Object} action - The action object containing the type and payload
 * @return {Object} The updated state object
 */
const globalReducer = (state, action) => {
  switch (action.type) {

    case "SET_USER":
      return {
        ...state,
        user: action.payload
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload
      };

    case "SEND_PASSWORD_RESET_EMAIL":
      auth.sendPasswordResetEmail(action.payload.email)
        .then(() => {
          console.log("Password reset email sent!");
        })
        .catch((error) => {
          console.error("Error sending password reset email:", error);
          // Optionally, update the state with the error so that components can react to it.
        });
      return state;

    case "SET_LINKS":
      return {
        ...state,
        links: action.payload
      };

    case "ADD_COMMENT":
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.linkId]: [
            ...(state.comments[action.payload.linkId] || []),
            action.payload.comment
          ]
        }
      };

    case "SET_VOTE":
      return {
        ...state,
        votes: {
          ...state.votes,
          [action.payload.id]: action.payload.value
        }
      };  

    // ... other actions
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};


/**
 * Returns the value of the global state.
 *
 * @return {any} The value of the global state.
 */
export const useGlobalState = () => {
  return useContext(GlobalStateContext);
}

/**
 * Returns the global dispatch function from the global dispatch context.
 *
 * @return {function} The global dispatch function.
 */
export const useGlobalDispatch = () => {
  return useContext(GlobalDispatchContext);
}


const initialState = {
  user: null,
  notifications: [],
  error: null,    // Store any errors here
  links: [],      // List of all links
  comments: {},   // Mapping link IDs to an array of its comments
  votes: {}       // Store user votes, e.g., { linkId1: true, commentId1: false }
};

/**
 * Generates a function comment for the given function body in a markdown code block with the correct language syntax.
 *
 * @param {string} children - The children of the GlobalProvider component.
 * @return {ReactElement} - The rendered component.
 */
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch({ type: "SET_USER", payload: user });
    });

    return () => unsubscribe();
  }, [dispatch]);




  /**
   * Sign in the user using FirebaseUI's sign-in methods.
   *
   * @param {type} - No parameters required.
   * @return {type} - No return value.
   */
  const signIn = () => {
    // FirebaseUI's sign-in methods handle both registration and login
    ui.start('#firebaseui-auth-container', uiConfig);
  };
  



  
  /**
   * Sign out the user and update the user state accordingly.
   *
   * @return {Promise<void>} A promise that resolves when the user is signed out.
   */
  const signOut = async () => {
    try {
      await auth.signOut();
      dispatch({ type: "SET_USER", payload: null });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  /**
   * Adds a link to the 'links' collection in Firestore.
   *
   * @param {Object} link - The link object to be added.
   * @return {Promise} A promise that resolves when the link is successfully added.
   */
  const addLink = async (link) => {
    try {
      const linksCollection = collection(firestore, 'links');
      const newLinkRef = await addDoc(linksCollection, {
        ...link,
        createdAt: serverTimestamp(),
        points: 0
      });
      // If successful, dispatch action to update global state
      dispatch({ type: "SET_LINKS", payload: [...state.links, { id: newLinkRef.id, ...link }] });
    } catch (error) {
      console.error("Error adding link: ", error);
    }
  };
  
  
  /**
   * Adds a comment to the comments collection in the Firestore database.
   *
   * @param {string} linkId - The ID of the link to which the comment belongs.
   * @param {object} comment - The comment object containing the comment details.
   * @return {Promise<void>} - A Promise that resolves when the comment is added successfully.
   */
  const addComment = async (linkId, comment) => {
    try {
      const commentsCollection = collection(firestore, 'comments');
      const newCommentRef = await addDoc(commentsCollection, {
        ...comment,
        linkUID: linkId,  
        createdAt: serverTimestamp(),
        points: 0,
        votedOn: []  
      });
      const newComment = { id: newCommentRef.id, ...comment };
      console.log(newComment);
      console.log("Comment added successfully!"); 
      dispatch({
        type: "ADD_COMMENT",
        payload: { linkId: linkId, comment: newComment }
      });
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
};    

const voteOnItem = async (linkId) => {
  try {
    // Get the reference to the link document
    const linkDocRef = doc(firestore, 'links', linkId);
    
    // Get the current points value from Firestore
    const linkDocSnapshot = await getDoc(linkDocRef);
    const currentPoints = linkDocSnapshot.data().points || 0;

    // Increment the points by 1
    const newPoints = currentPoints + 1;

    // Update the points field in Firestore
    await updateDoc(linkDocRef, {
      points: newPoints,
    });

    console.log("Vote counted!");

  } catch (error) {
    console.error("Error setting vote: ", error);
  }
};

  const fetchLinks = async () => {
    try {
      const linksCollection = collection(firestore, 'links');
      const linksSnapshot = await getDocs(linksCollection);
      
      const links = [];
      linksSnapshot.forEach(doc => {
        links.push({ id: doc.id, ...doc.data() });
      });
  
      dispatch({
        type: "SET_LINKS",
        payload: links
      });
    } catch (error) {
      console.error("Error fetching links: ", error);
    }
  };
  
  const fetchComments = async (linkId) => {
    try {
      const commentsCollection = collection(firestore, 'comments');
      const q = query(commentsCollection, where("linkUID", "==", linkId));
      const commentsSnapshot = await getDocs(q);

      const comments = [];
      commentsSnapshot.forEach(doc => {
        comments.push({ id: doc.id, ...doc.data() });
      });

      // Ensuring the comments for a particular linkId are stored as an array
      const existingComments = state.comments[linkId] || [];
      dispatch({
        type: "ADD_COMMENT",
        payload: { linkId: linkId, comment: [...existingComments, ...comments] }
      });
    } catch (error) {
      console.error("Error fetching comments for link: ", error);
    }
};

const updateUserPoints = async (userId) => {
  try {
    // Fetch all links added by the user
    const linksCollection = collection(firestore, 'links');
    const q = query(linksCollection, where("createdBy", "==", userId));
    const linksSnapshot = await getDocs(q);

    let totalPoints = 0;

    // Calculate total points
    linksSnapshot.forEach(doc => {
      const link = doc.data();
      totalPoints += (link.points || 0);
    });

    // Check if a document for the user already exists in the points collection
    const pointsCollection = collection(firestore, 'points');
    const userPointsQuery = query(pointsCollection, where('uid', '==', userId));
    const userPointsSnapshot = await getDocs(userPointsQuery);

    if (userPointsSnapshot.empty) {
      // Create a new document if it doesn't exist
      await addDoc(pointsCollection, { uid: userId, points: totalPoints });
    } else {
      // Otherwise, update the existing document
      const userPointsDoc = userPointsSnapshot.docs[0];
      await updateDoc(userPointsDoc.ref, { points: totalPoints });
    }

    console.log("User points updated!");
  } catch (error) {
    console.error("Error updating user points: ", error);
  }
};


  

  return (
    <GlobalDispatchContext.Provider value={{ signIn, signOut, addLink, addComment, voteOnItem, fetchLinks, fetchComments, dispatch, updateUserPoints }}>
      <GlobalStateContext.Provider value={state}>
        {children}
      </GlobalStateContext.Provider>
    </GlobalDispatchContext.Provider>
  );  
};
