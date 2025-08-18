
import { collection, addDoc, doc, Timestamp, query, orderBy, getDocs, onSnapshot, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export const createConversation = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User Not Found');
    }

    const conversationData = {
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(), 
      title: "New Conversation",
      userId: user.uid
    };
    
    const docRef = await addDoc(
      collection(db, 'users', user.uid, 'conversations'),
      conversationData
    );

    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const listenToMessages = (conversationId: string, callback: (messages: any[]) => void) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User Not Found');
    }

    const messagesRef = collection(
      db, 
      'users', 
      user.uid, 
      'conversations', 
      conversationId, 
      'messages'
    );

    const q = query(messagesRef, orderBy('createdAt', 'asc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      callback(messages);
    });

    return unsubscribe;
  } catch (error) {
    throw error;
  }
};

export const listenToConversations = (callback: (conversations: any[]) => void) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User Not Found');
    }
    
    const conversationsRef = collection(db, 'users', user.uid, 'conversations');
    const q = query(conversationsRef, orderBy('updatedAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const conversations = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(conversations);
    });
    
    return unsubscribe;
    
  } catch (error) {
    throw error;
  }
};

export const saveMessage = async (conversationId: string, content: string, role: 'user' | 'ai') => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User Not Found');
    }
    
    const messageData = {
      content: content,
      role: role,
      createdAt: Timestamp.now(),
      userId: user.uid
    };
    
    const docRef = await addDoc(
      collection(db, 'users', user.uid, 'conversations', conversationId, 'messages'),
      messageData
    );
    
    await updateDoc(
      doc(db, 'users', user.uid, 'conversations', conversationId),
      {
        updatedAt: Timestamp.now()
      }
    );
    
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const deleteMessage = async (conversationId: string, messageId: string) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User Not Found');
    }
    
    await deleteDoc(
      doc(db, 'users', user.uid, 'conversations', conversationId, 'messages', messageId)
    );
    
  } catch (error) {
    throw error;
  }
};

export const getConversation = async (conversationId: string) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User Not Found');
    }
    
    const conversationDoc = await getDoc(
      doc(db, 'users', user.uid, 'conversations', conversationId)
    );
        console.log('Document exists:', conversationDoc.exists());
        console.log('Document data:', conversationDoc.data());
    
    if (conversationDoc.exists()) {
      return { id: conversationDoc.id, ...conversationDoc.data() };
    } else {
      throw new Error('Conversation Not Found');
    }
    
  } catch (error) {
    throw error;
  }
};

export const deleteConversation = async (conversationId: string) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User Not Found');
    }
    
    const messagesRef = collection(
      db, 'users', user.uid, 'conversations', conversationId, 'messages'
    );
    
    const messagesSnapshot = await getDocs(messagesRef);
    
    const deletePromises = messagesSnapshot.docs.map(doc => 
        deleteDoc(doc.ref)
    )
    await Promise.all(deletePromises);
    
    await deleteDoc(
      doc(db, 'users', user.uid, 'conversations', conversationId)
    );
  } catch (error) {
    throw error;
  }
};

export const renameConversation = async (conversationId: string, newTitle: string) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User Not Found');
    }

    if (!newTitle || newTitle.trim() === '') {
      throw new Error('Title Cannot Be Empty');
    }

    await updateDoc(
      doc(db, 'users', user.uid, 'conversations', conversationId),
      {
        title: newTitle.trim()
      }
    );
    
  } catch (error) {
    throw error;
  }
};